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
  CalendarCheck,
  CalendarX,
  PhoneCall,
  PhoneOff,
  Phone,
  UserX,
  ShieldOff,
  Clock,
  User,
  FileText,
  AlertCircle,
  CalendarDays,
} from "lucide-react";
import { sonucKoduLabels, redNedeniLabels } from "@/lib/mock-data";
import type { Disposition, SonucKodu } from "@/types";

const iconMap: Record<string, typeof Phone> = {
  RANDEVU_ALINDI: CalendarCheck,
  RANDEVU_ALMADI: CalendarX,
  CALLBACK_ISTEDI: PhoneCall,
  MESGUL_TEKRAR_ARA: Phone,
  YANLIS_KISI: UserX,
  OPT_OUT: ShieldOff,
  ULASILAMADI: PhoneOff,
};

const badgeStyles: Record<string, string> = {
  RANDEVU_ALINDI: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60",
  RANDEVU_ALMADI: "bg-rose-50 text-rose-700 ring-1 ring-rose-200/60",
  CALLBACK_ISTEDI: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/60",
  MESGUL_TEKRAR_ARA: "bg-violet-50 text-violet-700 ring-1 ring-violet-200/60",
  YANLIS_KISI: "bg-slate-50 text-slate-600 ring-1 ring-slate-200/60",
  OPT_OUT: "bg-pink-50 text-pink-700 ring-1 ring-pink-200/60",
  ULASILAMADI: "bg-slate-50 text-slate-500 ring-1 ring-slate-200/60",
};

const iconBgStyles: Record<string, string> = {
  RANDEVU_ALINDI: "bg-emerald-500/10 text-emerald-600",
  RANDEVU_ALMADI: "bg-rose-500/10 text-rose-600",
  CALLBACK_ISTEDI: "bg-amber-500/10 text-amber-600",
  MESGUL_TEKRAR_ARA: "bg-violet-500/10 text-violet-600",
  YANLIS_KISI: "bg-slate-500/10 text-slate-500",
  OPT_OUT: "bg-pink-500/10 text-pink-600",
  ULASILAMADI: "bg-slate-500/10 text-slate-400",
};

function formatDateTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface DispositionModalProps {
  disposition: Disposition | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DispositionModal({ disposition: d, open, onOpenChange }: DispositionModalProps) {
  if (!d) return null;

  const Icon = iconMap[d.sonuc_kodu] || Phone;
  const badge = badgeStyles[d.sonuc_kodu] || "bg-slate-50 text-slate-600";
  const iconBg = iconBgStyles[d.sonuc_kodu] || "bg-slate-500/10 text-slate-500";
  const label = sonucKoduLabels[d.sonuc_kodu as SonucKodu] || d.sonuc_kodu;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <DialogTitle>Arama Sonucu Detayı</DialogTitle>
              <DialogDescription className="font-mono text-[11px]">{d.id}</DialogDescription>
            </div>
            <Badge variant="outline" className={`border-0 text-[11px] font-medium ${badge}`}>
              {label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="divide-y divide-slate-100">
          {/* Müşteri */}
          <div className="flex items-center gap-3 py-3">
            <User className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-[11px] font-medium text-slate-400">Müşteri</p>
              <p className="text-sm font-medium text-slate-800">{d.musteri_adi}</p>
              <p className="text-[11px] text-slate-500">{d.musteri_telefon}</p>
            </div>
          </div>

          {/* Tarih */}
          <div className="flex items-center gap-3 py-3">
            <Clock className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-[11px] font-medium text-slate-400">Arama Zamanı</p>
              <p className="text-sm font-medium text-slate-800">{formatDateTime(d.created_at)}</p>
            </div>
          </div>

          {/* Notlar */}
          {d.notlar && (
            <div className="flex items-start gap-3 py-3">
              <FileText className="mt-0.5 h-4 w-4 text-slate-400" />
              <div>
                <p className="text-[11px] font-medium text-slate-400">Notlar</p>
                <p className="text-sm text-slate-700">{d.notlar}</p>
              </div>
            </div>
          )}

          {/* Red nedeni */}
          {d.sonuc_kodu === "RANDEVU_ALMADI" && d.red_nedeni && (
            <div className="flex items-start gap-3 py-3">
              <AlertCircle className="mt-0.5 h-4 w-4 text-rose-400" />
              <div>
                <p className="text-[11px] font-medium text-slate-400">Red Nedeni</p>
                <p className="text-sm font-semibold text-rose-700">
                  {redNedeniLabels[d.red_nedeni] || d.red_nedeni}
                </p>
                {d.red_detay && (
                  <p className="mt-1 text-sm text-slate-600">{d.red_detay}</p>
                )}
              </div>
            </div>
          )}

          {/* Callback bilgisi */}
          {d.sonuc_kodu === "CALLBACK_ISTEDI" && d.callback_tarihi && (
            <div className="flex items-start gap-3 py-3">
              <CalendarDays className="mt-0.5 h-4 w-4 text-amber-500" />
              <div>
                <p className="text-[11px] font-medium text-slate-400">Callback Planı</p>
                <p className="text-sm font-medium text-slate-800">
                  {new Date(d.callback_tarihi).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                {d.callback_saat_araligi && (
                  <p className="text-[11px] text-slate-500">Saat: {d.callback_saat_araligi}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
