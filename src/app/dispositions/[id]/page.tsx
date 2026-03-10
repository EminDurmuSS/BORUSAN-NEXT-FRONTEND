"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
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
import { Badge } from "@/components/ui/badge";
import { useBorusanData } from "@/hooks/use-borusan-data";
import { sonucKoduLabels, redNedeniLabels } from "@/lib/mock-data";
import type { SonucKodu } from "@/types";

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

export default function DispositionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { dispositions } = useBorusanData();
  const d = dispositions.find((item) => item.id === id);

  if (!d) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-4 px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <AlertCircle className="h-8 w-8 text-slate-400" />
        </div>
        <h1 className="text-lg font-semibold text-slate-800">Kayıt Bulunamadı</h1>
        <p className="text-sm text-slate-500">Bu ID ile eşleşen bir arama sonucu bulunamadı.</p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard&apos;a Dön
        </Link>
      </div>
    );
  }

  const Icon = iconMap[d.sonuc_kodu] || Phone;
  const badge = badgeStyles[d.sonuc_kodu] || "bg-slate-50 text-slate-600";
  const iconBg = iconBgStyles[d.sonuc_kodu] || "bg-slate-500/10 text-slate-500";
  const label = sonucKoduLabels[d.sonuc_kodu as SonucKodu] || d.sonuc_kodu;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Back button */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Dashboard&apos;a Dön
      </Link>

      {/* Main card */}
      <div className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-black/[0.04] backdrop-blur-sm">
        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-6">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-slate-900">Arama Sonucu Detayı</h1>
              <p className="mt-0.5 text-xs font-mono text-slate-400">{d.id}</p>
            </div>
            <Badge variant="outline" className={`border-0 text-xs font-medium ${badge}`}>
              {label}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="divide-y divide-slate-50 px-6">
          {/* Müşteri */}
          <div className="flex items-center gap-3 py-4">
            <User className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs font-medium text-slate-400">Müşteri</p>
              <p className="text-sm font-medium text-slate-800">{d.musteri_adi}</p>
              <p className="text-xs text-slate-500">{d.musteri_telefon}</p>
            </div>
          </div>

          {/* Tarih */}
          <div className="flex items-center gap-3 py-4">
            <Clock className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs font-medium text-slate-400">Arama Zamanı</p>
              <p className="text-sm font-medium text-slate-800">{formatDateTime(d.created_at)}</p>
            </div>
          </div>

          {/* Notlar */}
          {d.notlar && (
            <div className="flex items-start gap-3 py-4">
              <FileText className="mt-0.5 h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs font-medium text-slate-400">Notlar</p>
                <p className="text-sm text-slate-700">{d.notlar}</p>
              </div>
            </div>
          )}

          {/* Red nedeni — sadece RANDEVU_ALMADI */}
          {d.sonuc_kodu === "RANDEVU_ALMADI" && d.red_nedeni && (
            <div className="flex items-start gap-3 py-4">
              <AlertCircle className="mt-0.5 h-4 w-4 text-rose-400" />
              <div>
                <p className="text-xs font-medium text-slate-400">Red Nedeni</p>
                <p className="text-sm font-semibold text-rose-700">
                  {redNedeniLabels[d.red_nedeni] || d.red_nedeni}
                </p>
                {d.red_detay && (
                  <p className="mt-1 text-sm text-slate-600">{d.red_detay}</p>
                )}
              </div>
            </div>
          )}

          {/* Callback bilgisi — sadece CALLBACK_ISTEDI */}
          {d.sonuc_kodu === "CALLBACK_ISTEDI" && d.callback_tarihi && (
            <div className="flex items-start gap-3 py-4">
              <CalendarDays className="mt-0.5 h-4 w-4 text-amber-500" />
              <div>
                <p className="text-xs font-medium text-slate-400">Callback Planı</p>
                <p className="text-sm font-medium text-slate-800">
                  {new Date(d.callback_tarihi).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                {d.callback_saat_araligi && (
                  <p className="text-xs text-slate-500">Saat: {d.callback_saat_araligi}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
