"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Car,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import type { Appointment } from "@/types";

const durumConfig: Record<string, { label: string; className: string }> = {
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
  Kağıthane: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/50",
  İstinye: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50",
  Vadi: "bg-violet-50 text-violet-700 ring-1 ring-violet-200/50",
  Florya: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/50",
  "Avcılar E-5": "bg-rose-50 text-rose-700 ring-1 ring-rose-200/50",
  Samandıra: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200/50",
  "Ankara Balgat": "bg-orange-50 text-orange-700 ring-1 ring-orange-200/50",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface AppointmentModalProps {
  appointment: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentModal({ appointment: apt, open, onOpenChange }: AppointmentModalProps) {
  if (!apt) return null;

  const durum = durumConfig[apt.durum] || durumConfig.bekliyor;
  const lokColor = lokasyonColors[apt.lokasyon] || "bg-gray-50 text-gray-700 ring-1 ring-gray-200/50";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <CalendarDays className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <DialogTitle>Randevu Detayı</DialogTitle>
              <DialogDescription className="font-mono text-[11px]">{apt.id}</DialogDescription>
            </div>
            <Badge variant="outline" className={`border-0 text-[11px] font-medium ${durum.className}`}>
              {durum.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="divide-y divide-slate-100">
          {/* Müşteri */}
          <div className="flex items-center gap-3 py-3">
            <User className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-[11px] font-medium text-slate-400">Müşteri</p>
              <p className="text-sm font-medium text-slate-800">{apt.musteri_adi}</p>
              <p className="text-[11px] text-slate-500">{apt.musteri_telefon}</p>
            </div>
          </div>

          {/* Araç */}
          <div className="flex items-center gap-3 py-3">
            <Car className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-[11px] font-medium text-slate-400">Araç</p>
              <p className="text-sm font-medium text-slate-800">{apt.arac_model}</p>
              {apt.arac_yil > 0 && (
                <p className="text-[11px] text-slate-500">{apt.arac_yil} Model</p>
              )}
            </div>
          </div>

          {/* Randevu Tarihi */}
          <div className="flex items-center gap-3 py-3">
            <CalendarDays className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-[11px] font-medium text-slate-400">Randevu Tarihi</p>
              <p className="text-sm font-medium text-slate-800">{formatDate(apt.tarih)}</p>
            </div>
          </div>

          {/* Saat */}
          <div className="flex items-center gap-3 py-3">
            <Clock className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-[11px] font-medium text-slate-400">Saat</p>
              <p className="text-sm font-medium text-slate-800">{apt.saat}</p>
            </div>
          </div>

          {/* Lokasyon */}
          <div className="flex items-center gap-3 py-3">
            <MapPin className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-[11px] font-medium text-slate-400">Lokasyon</p>
              <Badge variant="outline" className={`mt-1 border-0 text-[11px] font-medium ${lokColor}`}>
                <MapPin className="mr-1 h-3 w-3" />
                {apt.lokasyon}
              </Badge>
            </div>
          </div>

          {/* Oluşturulma Tarihi */}
          <div className="flex items-center gap-3 py-3">
            <Clock className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-[11px] font-medium text-slate-400">Kayıt Tarihi</p>
              <p className="text-sm text-slate-600">{formatDateTime(apt.olusturma_tarihi)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
