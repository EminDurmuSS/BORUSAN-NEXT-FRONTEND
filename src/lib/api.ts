import type {
  ApiAppointment,
  ApiDisposition,
  Appointment,
  AppointmentsResponse,
  Disposition,
  DispositionsResponse,
  Lokasyon,
  RandevuDurum,
} from "@/types";

const BASE_URL = "https://borusan-next-demo.freyavoice.workers.dev";

export async function fetchAppointments(): Promise<ApiAppointment[]> {
  const res = await fetch(`${BASE_URL}/appointments`);
  const data: AppointmentsResponse = await res.json();
  return data.success ? data.appointments : [];
}

export async function fetchDispositions(): Promise<ApiDisposition[]> {
  const res = await fetch(`${BASE_URL}/dispositions`);
  const data: DispositionsResponse = await res.json();
  return data.success ? data.dispositions : [];
}

export function mapApiAppointment(api: ApiAppointment): Appointment {
  return {
    id: api.appointment_id,
    musteri_telefon: api.musteri_telefon,
    musteri_adi: api.musteri_adi || api.musteri_telefon,
    arac_model: api.arac || "—",
    arac_yil: api.arac_yili || 0,
    tarih: api.tarih,
    saat: api.saat,
    lokasyon: api.lokasyon as Lokasyon,
    durum: (api.status as RandevuDurum) || "bekliyor",
    olusturma_tarihi: api.created_at,
  };
}

export function mapApiDisposition(api: ApiDisposition): Disposition {
  return {
    id: api.disposition_id,
    musteri_telefon: api.musteri_telefon,
    musteri_adi: api.musteri_adi || api.musteri_telefon,
    sonuc_kodu: api.sonuc_kodu,
    red_nedeni: api.red_nedeni || undefined,
    red_detay: api.red_detay || undefined,
    notlar: api.notlar || undefined,
    callback_tarihi: api.callback_tarihi || undefined,
    callback_saat_araligi: api.callback_saat_araligi || undefined,
    created_at: api.created_at,
  };
}
