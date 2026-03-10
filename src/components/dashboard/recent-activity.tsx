"use client";

import { useState } from "react";
import {
  CalendarCheck,
  CalendarX,
  PhoneCall,
  PhoneOff,
  UserX,
  ShieldOff,
  Activity,
  Phone,
} from "lucide-react";
import { sonucKoduLabels } from "@/lib/mock-data";
import { useBorusanData } from "@/hooks/use-borusan-data";
import { DispositionModal } from "./disposition-modal";
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

const dotBgMap: Record<string, string> = {
  RANDEVU_ALINDI: "bg-emerald-50 text-emerald-600 ring-emerald-500/10",
  RANDEVU_ALMADI: "bg-rose-50 text-rose-600 ring-rose-500/10",
  CALLBACK_ISTEDI: "bg-amber-50 text-amber-600 ring-amber-500/10",
  MESGUL_TEKRAR_ARA: "bg-violet-50 text-violet-600 ring-violet-500/10",
  YANLIS_KISI: "bg-slate-50 text-slate-500 ring-slate-500/10",
  OPT_OUT: "bg-pink-50 text-pink-600 ring-pink-500/10",
  ULASILAMADI: "bg-slate-50 text-slate-400 ring-slate-500/10",
};

function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMin / 60);
  const diffD = Math.floor(diffH / 24);

  if (diffD > 0) return `${diffD}g`;
  if (diffH > 0) return `${diffH}sa`;
  if (diffMin > 0) return `${diffMin}dk`;
  return "az önce";
}

export function RecentActivity() {
  const { dispositions } = useBorusanData();
  const [selected, setSelected] = useState<Disposition | null>(null);

  const recent = [...dispositions]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 8);

  return (
    <>
      <div className="animate-fade-in-up flex h-full flex-col overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-black/[0.04] backdrop-blur-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 ring-1 ring-violet-500/10">
              <Activity className="h-4 w-4 text-violet-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Son Aktiviteler</h3>
              <p className="text-xs text-slate-400">Gerçek zamanlı arama takibi</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <div className="space-y-0">
            {recent.map((d, i) => {
              const Icon = iconMap[d.sonuc_kodu] || Phone;
              const iconStyle = dotBgMap[d.sonuc_kodu] || "bg-slate-50 text-slate-500 ring-slate-500/10";
              const label = sonucKoduLabels[d.sonuc_kodu as SonucKodu];
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelected(d)}
                  className="group relative flex w-full cursor-pointer items-start gap-3 rounded-lg py-3 text-left transition-colors hover:bg-slate-50/80"
                >
                  {/* Timeline connector */}
                  {i < recent.length - 1 && (
                    <div className="absolute left-[13px] top-[40px] h-[calc(100%-16px)] w-px bg-gradient-to-b from-slate-200 to-transparent" />
                  )}
                  <div
                    className={`mt-0.5 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg ring-1 ${iconStyle}`}
                  >
                    <Icon className="h-3 w-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[13px] font-medium text-slate-800">
                        {d.musteri_adi}
                      </p>
                      <span className="shrink-0 text-[10px] font-medium tabular-nums text-slate-400">
                        {timeAgo(d.created_at)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                      {label}
                    </p>
                    {d.notlar && (
                      <p className="mt-0.5 truncate text-[10px] text-slate-400">
                        {d.notlar}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <DispositionModal
        disposition={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </>
  );
}
