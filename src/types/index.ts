export type Lokasyon = "Kağıthane" | "İstinye" | "Vadi" | "Florya" | "Avcılar E-5" | "Samandıra" | "Ankara Balgat";

export type RandevuDurum = "bekliyor" | "tamamlandi" | "iptal";

export type SonucKodu =
  | "RANDEVU_ALINDI"
  | "RANDEVU_ALMADI"
  | "CALLBACK_ISTEDI"
  | "MESGUL_TEKRAR_ARA"
  | "YANLIS_KISI"
  | "OPT_OUT"
  | "ULASILAMADI";

export type RedNedeni =
  | "fiyat_dusuk"
  | "premium_fiyat_hassasiyeti"
  | "satmaktan_vazgecti"
  | "baska_firmaya_satti"
  | "zaman_uygun_degil"
  | "lokasyon_uzak"
  | "guven_sorunu"
  | "seri_ilan_tercih"
  | "aranmak_istemiyor"
  | "diger";

// Local (mock) data types
export interface Appointment {
  id: string;
  musteri_telefon: string;
  musteri_adi: string;
  arac_model: string;
  arac_yil: number;
  tarih: string;
  saat: string;
  lokasyon: Lokasyon;
  durum: RandevuDurum;
  olusturma_tarihi: string;
}

export interface Disposition {
  id: string;
  musteri_telefon: string;
  musteri_adi: string;
  sonuc_kodu: SonucKodu;
  red_nedeni?: RedNedeni;
  red_detay?: string;
  notlar?: string;
  callback_tarihi?: string;
  callback_saat_araligi?: string;
  created_at: string;
}

// API response types
export interface ApiAppointment {
  appointment_id: string;
  status: string;
  musteri_adi: string;
  musteri_telefon: string;
  arac: string;
  arac_yili: number;
  tarih: string;
  saat: string;
  lokasyon: string;
  created_at: string;
}

export interface ApiDisposition {
  disposition_id: string;
  musteri_adi: string;
  musteri_telefon: string;
  sonuc_kodu: SonucKodu;
  red_nedeni?: RedNedeni | null;
  red_detay?: string | null;
  notlar?: string | null;
  callback_tarihi?: string | null;
  callback_saat_araligi?: string | null;
  created_at: string;
}

export interface AppointmentsResponse {
  success: boolean;
  count: number;
  appointments: ApiAppointment[];
}

export interface DispositionsResponse {
  success: boolean;
  count: number;
  dispositions: ApiDisposition[];
}
