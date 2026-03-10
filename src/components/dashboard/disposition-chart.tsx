"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChartIcon, BarChart3 } from "lucide-react";
import {
  getDispositionStats,
  getRedNedeniStats,
  sonucKoduLabels,
  redNedeniLabels,
} from "@/lib/mock-data";
import { useBorusanData } from "@/hooks/use-borusan-data";

const chartColors: Record<string, string> = {
  RANDEVU_ALINDI: "#059669",
  RANDEVU_ALMADI: "#dc2626",
  CALLBACK_ISTEDI: "#d97706",
  MESGUL_TEKRAR_ARA: "#7c3aed",
  YANLIS_KISI: "#94a3b8",
  OPT_OUT: "#db2777",
  ULASILAMADI: "#cbd5e1",
};

const redBarColors = ["#dc2626", "#ea580c", "#d97706", "#7c3aed", "#db2777", "#6b7280"];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { name: string } }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white/95 px-3.5 py-2.5 shadow-xl shadow-black/5 backdrop-blur-sm">
        <p className="text-xs font-medium text-slate-500">{payload[0].payload.name}</p>
        <p className="text-lg font-bold tabular-nums text-slate-900">{payload[0].value}</p>
      </div>
    );
  }
  return null;
}

export function DispositionChart() {
  const { dispositions } = useBorusanData();

  const dispStats = getDispositionStats(dispositions);
  const pieData = Object.entries(dispStats).map(([key, value]) => ({
    name: sonucKoduLabels[key] || key,
    value,
    color: chartColors[key] || "#6b7280",
  }));

  const redStats = getRedNedeniStats(dispositions);
  const barData = Object.entries(redStats).map(([key, value]) => ({
    name: redNedeniLabels[key] || key,
    value,
  }));

  return (
    <div className="animate-fade-in-up overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-black/[0.04] backdrop-blur-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/10">
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Arama Sonuçları</h3>
            <p className="text-xs text-slate-400">Dağılım ve red nedenleri analizi</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Tabs defaultValue="pie">
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="pie" className="gap-1.5">
              <PieChartIcon className="h-3.5 w-3.5" />
              Genel Dağılım
            </TabsTrigger>
            <TabsTrigger value="bar" className="gap-1.5">
              <BarChart3 className="h-3.5 w-3.5" />
              Red Nedenleri
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pie">
            <div className="flex flex-col items-center gap-8 sm:flex-row">
              <div className="h-[220px] w-full max-w-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                      strokeWidth={0}
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-slate-500">
                        {item.name}
                      </span>
                      <span className="text-xs font-bold tabular-nums text-slate-900">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="bar">
            {barData.length > 0 ? (
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={140}
                      tick={{ fontSize: 11, fill: "#475569" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                      {barData.map((_, i) => (
                        <Cell key={i} fill={redBarColors[i % redBarColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-slate-400">
                Henüz red verisi yok.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
