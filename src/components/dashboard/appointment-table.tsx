"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, Car, List } from "lucide-react";
import { useBorusanData } from "@/hooks/use-borusan-data";
import { AppointmentModal } from "./appointment-modal";
import type { Appointment } from "@/types";

const durumConfig: Record<
  string,
  { label: string; className: string }
> = {
  bekliyor: {
    label: "Bekliyor",
    className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/60",
  },
  tamamlandi: {
    label: "Tamamlandı",
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60",
  },
  iptal: {
    label: "İptal",
    className: "bg-rose-50 text-rose-700 ring-1 ring-rose-200/60",
  },
};

const lokasyonColors: Record<string, string> = {
  "Kağıthane": "bg-blue-50 text-blue-700 ring-1 ring-blue-200/50",
  "İstinye": "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50",
  "Vadi": "bg-violet-50 text-violet-700 ring-1 ring-violet-200/50",
  "Florya": "bg-amber-50 text-amber-700 ring-1 ring-amber-200/50",
  "Avcılar E-5": "bg-rose-50 text-rose-700 ring-1 ring-rose-200/50",
  "Samandıra": "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200/50",
  "Ankara Balgat": "bg-orange-50 text-orange-700 ring-1 ring-orange-200/50",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
  });
}

export function AppointmentTable() {
  const { appointments } = useBorusanData();
  const [selected, setSelected] = useState<Appointment | null>(null);

  const sorted = [...appointments].sort(
    (a, b) => new Date(a.tarih).getTime() - new Date(b.tarih).getTime()
  );

  return (
    <>
      <div className="animate-fade-in-up overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-black/[0.04] backdrop-blur-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/10">
              <List className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Ekspertiz Randevuları</h3>
              <p className="text-xs text-slate-400">Planlanan ve tamamlanan randevular</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-100 bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="pl-6 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Müşteri</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Araç</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Tarih / Saat</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Lokasyon</TableHead>
                <TableHead className="pr-6 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((apt) => {
                const durum = durumConfig[apt.durum];
                const lokColor = lokasyonColors[apt.lokasyon] || "bg-gray-50 text-gray-700 ring-1 ring-gray-200/50";
                return (
                  <TableRow
                    key={apt.id}
                    className="group cursor-pointer border-b border-slate-50 transition-colors hover:bg-blue-50/40"
                    onClick={() => setSelected(apt)}
                  >
                    <TableCell className="pl-6">
                      <div>
                        <p className="text-[13px] font-medium text-slate-800">{apt.musteri_adi}</p>
                        <p className="text-[11px] text-slate-400">
                          {apt.musteri_telefon}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-[13px] font-medium text-slate-700">{apt.arac_model}</span>
                        <span className="text-[11px] text-slate-400">
                          {apt.arac_yil}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 text-[13px]">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <CalendarDays className="h-3 w-3 text-blue-500" />
                          {formatDate(apt.tarih)}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="h-3 w-3" />
                          {apt.saat}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`border-0 text-[11px] font-medium ${lokColor}`}>
                        <MapPin className="mr-1 h-3 w-3" />
                        {apt.lokasyon}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <Badge variant="outline" className={`border-0 text-[11px] font-medium ${durum.className}`}>
                        {durum.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <AppointmentModal
        appointment={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </>
  );
}
