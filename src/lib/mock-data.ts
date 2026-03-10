import { Appointment, Disposition } from "@/types";

export const appointments: Appointment[] = [
  {
    id: "APT-001",
    musteri_telefon: "0533 222 33 44",
    musteri_adi: "Ayşe Yılmaz",
    arac_model: "BMW X1 sDrive20i",
    arac_yil: 2021,
    tarih: "2026-03-12",
    saat: "10:00",
    lokasyon: "Kağıthane",
    durum: "bekliyor",
    olusturma_tarihi: "2026-03-10T09:15:00",
  },
  {
    id: "APT-002",
    musteri_telefon: "0542 111 22 33",
    musteri_adi: "Mehmet Kaya",
    arac_model: "BMW 320i",
    arac_yil: 2022,
    tarih: "2026-03-11",
    saat: "14:30",
    lokasyon: "İstinye",
    durum: "tamamlandi",
    olusturma_tarihi: "2026-03-09T11:00:00",
  },
  {
    id: "APT-003",
    musteri_telefon: "0555 333 44 55",
    musteri_adi: "Zeynep Demir",
    arac_model: "BMW X3 xDrive25e",
    arac_yil: 2023,
    tarih: "2026-03-13",
    saat: "11:00",
    lokasyon: "Vadi",
    durum: "bekliyor",
    olusturma_tarihi: "2026-03-10T14:30:00",
  },
  {
    id: "APT-004",
    musteri_telefon: "0544 666 77 88",
    musteri_adi: "Ali Öztürk",
    arac_model: "BMW 520i",
    arac_yil: 2020,
    tarih: "2026-03-11",
    saat: "09:30",
    lokasyon: "Florya",
    durum: "tamamlandi",
    olusturma_tarihi: "2026-03-08T16:00:00",
  },
  {
    id: "APT-005",
    musteri_telefon: "0532 444 55 66",
    musteri_adi: "Fatma Çelik",
    arac_model: "BMW X1 sDrive20i",
    arac_yil: 2022,
    tarih: "2026-03-14",
    saat: "15:00",
    lokasyon: "Avcılar E-5",
    durum: "bekliyor",
    olusturma_tarihi: "2026-03-10T10:45:00",
  },
  {
    id: "APT-006",
    musteri_telefon: "0537 888 99 00",
    musteri_adi: "Emre Arslan",
    arac_model: "BMW i5 eDrive40",
    arac_yil: 2024,
    tarih: "2026-03-12",
    saat: "13:00",
    lokasyon: "Samandıra",
    durum: "iptal",
    olusturma_tarihi: "2026-03-09T08:20:00",
  },
  {
    id: "APT-007",
    musteri_telefon: "0546 123 45 67",
    musteri_adi: "Selin Koç",
    arac_model: "BMW X1 sDrive20i",
    arac_yil: 2021,
    tarih: "2026-03-15",
    saat: "10:30",
    lokasyon: "Kağıthane",
    durum: "bekliyor",
    olusturma_tarihi: "2026-03-10T16:10:00",
  },
  {
    id: "APT-008",
    musteri_telefon: "0553 987 65 43",
    musteri_adi: "Burak Şahin",
    arac_model: "BMW 320i",
    arac_yil: 2023,
    tarih: "2026-03-10",
    saat: "11:30",
    lokasyon: "İstinye",
    durum: "tamamlandi",
    olusturma_tarihi: "2026-03-07T13:00:00",
  },
];

export const dispositions: Disposition[] = [
  {
    id: "DSP-001",
    musteri_telefon: "0533 222 33 44",
    musteri_adi: "Ayşe Yılmaz",
    sonuc_kodu: "RANDEVU_ALINDI",
    notlar: "Müşteri ilgili, hemen randevu aldı.",
    created_at: "2026-03-10T09:15:00",
  },
  {
    id: "DSP-002",
    musteri_telefon: "0542 111 22 33",
    musteri_adi: "Mehmet Kaya",
    sonuc_kodu: "RANDEVU_ALINDI",
    notlar: "BMW 320i için ekspertiz istedi.",
    created_at: "2026-03-09T11:00:00",
  },
  {
    id: "DSP-003",
    musteri_telefon: "0555 333 44 55",
    musteri_adi: "Zeynep Demir",
    sonuc_kodu: "RANDEVU_ALINDI",
    notlar: "Premium araç, kurumsal referans ile ikna oldu.",
    created_at: "2026-03-10T14:30:00",
  },
  {
    id: "DSP-004",
    musteri_telefon: "0544 666 77 88",
    musteri_adi: "Ali Öztürk",
    sonuc_kodu: "RANDEVU_ALINDI",
    notlar: "Hızlı süreç beklentisi var.",
    created_at: "2026-03-08T16:00:00",
  },
  {
    id: "DSP-005",
    musteri_telefon: "0532 444 55 66",
    musteri_adi: "Fatma Çelik",
    sonuc_kodu: "RANDEVU_ALINDI",
    notlar: "Avcılar E-5 noktasını tercih etti.",
    created_at: "2026-03-10T10:45:00",
  },
  {
    id: "DSP-006",
    musteri_telefon: "0537 888 99 00",
    musteri_adi: "Emre Arslan",
    sonuc_kodu: "RANDEVU_ALMADI",
    red_nedeni: "fiyat_dusuk",
    red_detay: "Ön değerlendirme rakamını düşük buldu",
    notlar: "Başka firmadan daha yüksek teklif almış.",
    created_at: "2026-03-09T08:20:00",
  },
  {
    id: "DSP-007",
    musteri_telefon: "0546 123 45 67",
    musteri_adi: "Selin Koç",
    sonuc_kodu: "RANDEVU_ALINDI",
    notlar: "İlk arama başarılı.",
    created_at: "2026-03-10T16:10:00",
  },
  {
    id: "DSP-008",
    musteri_telefon: "0553 987 65 43",
    musteri_adi: "Burak Şahin",
    sonuc_kodu: "RANDEVU_ALINDI",
    notlar: "Ekspertiz tamamlandı.",
    created_at: "2026-03-07T13:00:00",
  },
  {
    id: "DSP-009",
    musteri_telefon: "0538 765 43 21",
    musteri_adi: "Hakan Yıldız",
    sonuc_kodu: "RANDEVU_ALMADI",
    red_nedeni: "satmaktan_vazgecti",
    red_detay: "Aracı satmaktan şimdilik vazgeçmiş",
    notlar: "İleride tekrar düşünebileceğini söyledi.",
    created_at: "2026-03-10T08:00:00",
  },
  {
    id: "DSP-010",
    musteri_telefon: "0541 234 56 78",
    musteri_adi: "Derya Aydın",
    sonuc_kodu: "CALLBACK_ISTEDI",
    callback_tarihi: "2026-03-14",
    callback_saat_araligi: "14:00-16:00",
    notlar: "Şu an müsait değil, Cuma öğleden sonra aranmak istiyor.",
    created_at: "2026-03-10T11:30:00",
  },
  {
    id: "DSP-011",
    musteri_telefon: "0549 876 54 32",
    musteri_adi: "Canan Erdoğan",
    sonuc_kodu: "CALLBACK_ISTEDI",
    callback_tarihi: "2026-03-13",
    callback_saat_araligi: "10:00-12:00",
    notlar: "Eşiyle konuşup karar verecek.",
    created_at: "2026-03-09T15:45:00",
  },
  {
    id: "DSP-012",
    musteri_telefon: "0535 111 00 99",
    musteri_adi: "Murat Güneş",
    sonuc_kodu: "MESGUL_TEKRAR_ARA",
    notlar: "Telefon meşguldü.",
    created_at: "2026-03-10T13:00:00",
  },
  {
    id: "DSP-013",
    musteri_telefon: "0543 222 11 00",
    musteri_adi: "İrem Başaran",
    sonuc_kodu: "YANLIS_KISI",
    notlar: "Numara başka birine ait.",
    created_at: "2026-03-10T09:45:00",
  },
  {
    id: "DSP-014",
    musteri_telefon: "0536 333 22 11",
    musteri_adi: "Tolga Aksoy",
    sonuc_kodu: "OPT_OUT",
    notlar: "Aranmak istemiyor, DNC listesine eklendi.",
    created_at: "2026-03-09T14:00:00",
  },
  {
    id: "DSP-015",
    musteri_telefon: "0548 444 33 22",
    musteri_adi: "Elif Korkmaz",
    sonuc_kodu: "ULASILAMADI",
    notlar: "3 deneme yapıldı, ulaşılamadı.",
    created_at: "2026-03-10T10:00:00",
  },
  {
    id: "DSP-016",
    musteri_telefon: "0531 555 44 33",
    musteri_adi: "Serkan Polat",
    sonuc_kodu: "RANDEVU_ALMADI",
    red_nedeni: "guven_sorunu",
    red_detay: "Dolandırıcılık şüphesiyle reddetti",
    notlar: "Resmi numara verildi ama ikna olmadı.",
    created_at: "2026-03-10T12:15:00",
  },
  {
    id: "DSP-017",
    musteri_telefon: "0539 666 55 44",
    musteri_adi: "Pınar Acar",
    sonuc_kodu: "RANDEVU_ALMADI",
    red_nedeni: "baska_firmaya_satti",
    red_detay: "Aracı geçen hafta başka firmaya satmış",
    notlar: "Araç müşteride değil.",
    created_at: "2026-03-08T10:30:00",
  },
  {
    id: "DSP-018",
    musteri_telefon: "0547 777 66 55",
    musteri_adi: "Oğuz Çetin",
    sonuc_kodu: "RANDEVU_ALMADI",
    red_nedeni: "premium_fiyat_hassasiyeti",
    red_detay: "BMW X5 için daha yüksek beklentisi var",
    notlar: "Kurumsal referans teklifi sunuldu ama yetersiz buldu.",
    created_at: "2026-03-10T15:00:00",
  },
];

// Helper: sonuç kodlarına göre sayılar
export function getDispositionStats(data: Disposition[]) {
  const stats: Record<string, number> = {};
  data.forEach((d) => {
    stats[d.sonuc_kodu] = (stats[d.sonuc_kodu] || 0) + 1;
  });
  return stats;
}

// Helper: lokasyona göre randevu sayıları
export function getLocationStats(data: Appointment[]) {
  const stats: Record<string, number> = {};
  data.forEach((a) => {
    stats[a.lokasyon] = (stats[a.lokasyon] || 0) + 1;
  });
  return stats;
}

// Helper: red nedenlerine göre kırılım
export function getRedNedeniStats(data: Disposition[]) {
  const stats: Record<string, number> = {};
  data
    .filter((d) => d.sonuc_kodu === "RANDEVU_ALMADI" && d.red_nedeni)
    .forEach((d) => {
      stats[d.red_nedeni!] = (stats[d.red_nedeni!] || 0) + 1;
    });
  return stats;
}

// Sonuç kodu Türkçe etiketleri
export const sonucKoduLabels: Record<string, string> = {
  RANDEVU_ALINDI: "Randevu Alındı",
  RANDEVU_ALMADI: "Randevu Alınmadı",
  CALLBACK_ISTEDI: "Callback İstedi",
  MESGUL_TEKRAR_ARA: "Meşgul",
  YANLIS_KISI: "Yanlış Kişi",
  OPT_OUT: "Opt-Out",
  ULASILAMADI: "Ulaşılamadı",
};

// Red nedeni Türkçe etiketleri
export const redNedeniLabels: Record<string, string> = {
  fiyat_dusuk: "Fiyat Düşük",
  premium_fiyat_hassasiyeti: "Premium Fiyat Hassasiyeti",
  satmaktan_vazgecti: "Satmaktan Vazgeçti",
  baska_firmaya_satti: "Başka Firmaya Sattı",
  zaman_uygun_degil: "Zaman Uygun Değil",
  lokasyon_uzak: "Lokasyon Uzak",
  guven_sorunu: "Güven Sorunu",
  seri_ilan_tercih: "Seri İlan Tercih",
  aranmak_istemiyor: "Aranmak İstemiyor",
  diger: "Diğer",
};

// Sonuç kodu renkleri
export const sonucKoduColors: Record<string, string> = {
  RANDEVU_ALINDI: "#22c55e",
  RANDEVU_ALMADI: "#ef4444",
  CALLBACK_ISTEDI: "#f59e0b",
  MESGUL_TEKRAR_ARA: "#8b5cf6",
  YANLIS_KISI: "#6b7280",
  OPT_OUT: "#ec4899",
  ULASILAMADI: "#94a3b8",
};
