"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  AlertCircle,
  User,
  Car,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBorusanData } from "@/hooks/use-borusan-data";

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

export default function AppointmentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { appointments } = useBorusanData();
  const apt = appointments.find((item) => item.id === id);

  if (!apt) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-4 px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <AlertCircle className="h-8 w-8 text-slate-400" />
        </div>
        <h1 className="text-lg font-semibold text-slate-800">Randevu Bulunamadı</h1>
        <p className="text-sm text-slate-500">Bu ID ile eşleşen bir randevu bulunamadı.</p>
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

  const durum = durumConfig[apt.durum] || durumConfig.bekliyor;
  const lokColor = lokasyonColors[apt.lokasyon] || "bg-gray-50 text-gray-700 ring-1 ring-gray-200/50";

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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
              <CalendarDays className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-slate-900">Randevu Detayı</h1>
              <p className="mt-0.5 text-xs font-mono text-slate-400">{apt.id}</p>
            </div>
            <Badge variant="outline" className={`border-0 text-xs font-medium ${durum.className}`}>
              {durum.label}
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
              <p className="text-sm font-medium text-slate-800">{apt.musteri_adi}</p>
              <p className="text-xs text-slate-500">{apt.musteri_telefon}</p>
            </div>
          </div>

          {/* Araç */}
          <div className="flex items-center gap-3 py-4">
            <Car className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs font-medium text-slate-400">Araç</p>
              <p className="text-sm font-medium text-slate-800">{apt.arac_model}</p>
              {apt.arac_yil > 0 && (
                <p className="text-xs text-slate-500">{apt.arac_yil} Model</p>
              )}
            </div>
          </div>

          {/* Randevu Tarihi */}
          <div className="flex items-center gap-3 py-4">
            <CalendarDays className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs font-medium text-slate-400">Randevu Tarihi</p>
              <p className="text-sm font-medium text-slate-800">{formatDate(apt.tarih)}</p>
            </div>
          </div>

          {/* Saat */}
          <div className="flex items-center gap-3 py-4">
            <Clock className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs font-medium text-slate-400">Saat</p>
              <p className="text-sm font-medium text-slate-800">{apt.saat}</p>
            </div>
          </div>

          {/* Lokasyon */}
          <div className="flex items-center gap-3 py-4">
            <MapPin className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs font-medium text-slate-400">Lokasyon</p>
              <Badge variant="outline" className={`mt-1 border-0 text-xs font-medium ${lokColor}`}>
                <MapPin className="mr-1 h-3 w-3" />
                {apt.lokasyon}
              </Badge>
            </div>
          </div>

          {/* Oluşturulma Tarihi */}
          <div className="flex items-center gap-3 py-4">
            <Clock className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs font-medium text-slate-400">Kayıt Tarihi</p>
              <p className="text-sm text-slate-600">{formatDateTime(apt.olusturma_tarihi)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
