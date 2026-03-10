"use client";

import { MapPin, Building2 } from "lucide-react";
import { getLocationStats } from "@/lib/mock-data";
import { useBorusanData } from "@/hooks/use-borusan-data";

const locationColors: Record<string, { bar: string; text: string; bg: string }> = {
  "Kağıthane": { bar: "bg-blue-500", text: "text-blue-600", bg: "bg-blue-50" },
  "İstinye": { bar: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50" },
  "Vadi": { bar: "bg-violet-500", text: "text-violet-600", bg: "bg-violet-50" },
  "Florya": { bar: "bg-amber-500", text: "text-amber-600", bg: "bg-amber-50" },
  "Avcılar E-5": { bar: "bg-rose-500", text: "text-rose-600", bg: "bg-rose-50" },
  "Samandıra": { bar: "bg-cyan-500", text: "text-cyan-600", bg: "bg-cyan-50" },
  "Ankara Balgat": { bar: "bg-orange-500", text: "text-orange-600", bg: "bg-orange-50" },
};

export function LocationBreakdown() {
  const { appointments } = useBorusanData();
  const stats = getLocationStats(appointments);
  const maxVal = Math.max(...Object.values(stats), 1);
  const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]);
  const totalAppointments = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <div className="animate-fade-in-up overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-black/[0.04] backdrop-blur-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/10">
              <Building2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Lokasyonlar</h3>
              <p className="text-xs text-slate-400">Randevu dağılımı</p>
            </div>
          </div>
          <div className="flex h-8 items-center rounded-full bg-slate-50 px-3 ring-1 ring-slate-100">
            <span className="text-xs font-bold tabular-nums text-slate-900">{totalAppointments}</span>
            <span className="ml-1 text-[10px] text-slate-400">toplam</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-5">
          {sorted.map(([lokasyon, count]) => {
            const pct = Math.round((count / maxVal) * 100);
            const colors = locationColors[lokasyon] || { bar: "bg-gray-400", text: "text-gray-600", bg: "bg-gray-50" };
            return (
              <div key={lokasyon} className="group">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${colors.bg} ring-1 ring-black/[0.04]`}>
                      <MapPin className={`h-3 w-3 ${colors.text}`} />
                    </div>
                    <span className="text-[13px] font-medium text-slate-700">{lokasyon}</span>
                  </div>
                  <span className="text-[13px] font-bold tabular-nums text-slate-900">
                    {count}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${colors.bar} transition-all duration-700 ease-out`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
