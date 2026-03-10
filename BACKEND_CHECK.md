# Borusan Next Mock API — Backend Kontrol Raporu

## Sorun
Frontend, POST edilen verileri GET ile çekemiyor. POST başarılı dönüyor (201) ama sonraki GET isteğinde veri kaybolmuş oluyor.

## Base URL
```
https://borusan-next-mock.freyavoice.workers.dev
```

## Kanıt

### 1. POST başarılı çalışıyor
Voice agent (Elif) şu POST'u attı ve 201 aldı:
```
POST /dispositions
Body: {
  "musteri_telefon": "05xx xxx xx xx",
  "sonuc_kodu": "RANDEVU_ALMADI",
  "red_nedeni": "guven_sorunu",
  "red_detay": "Müşteri Borusan'ın ilgisiz ve güven vermediğini belirtti.",
  "notlar": "Müşteri güven eksikliği nedeniyle randevu almadı."
}

Response (201):
{
  "success": true,
  "disposition_id": "DSP-BN-23226",
  "musteri_telefon": "05xx xxx xx xx",
  "sonuc_kodu": "RANDEVU_ALMADI",
  "created_at": "2026-03-10T11:35:44.009Z",
  "red_nedeni": "guven_sorunu",
  "message": "Arama sonucu kaydedildi."
}
```

### 2. GET boş dönüyor (veri kaybolmuş)
POST'tan saniyeler sonra yapılan GET:
```
GET /dispositions

Response (200):
{
  "success": true,
  "dispositions": [],
  "count": 0
}
```

### 3. Aynı durum appointments için de geçerli
```
GET /appointments → { "success": true, "appointments": [], "count": 0 }
```

## Kontrol Edilmesi Gerekenler

### A. In-Memory Storage
- [ ] Veri nerede saklanıyor? (global değişken, Map, Object?)
- [ ] POST handler veriyi yazıyor mu?
- [ ] GET handler aynı veri kaynağından okuyor mu?
- [ ] Worker'da birden fazla isolate/instance sorunu var mı?

### B. Cloudflare Worker Yapılandırması
- [ ] Worker'ın global scope'u request'ler arasında korunuyor mu?
- [ ] Durable Objects veya KV kullanılıyor mu, yoksa sadece global variable mı?
- [ ] `wrangler.toml` yapılandırmasında özel bir şey var mı?

### C. Olası Çözümler (basit → karmaşık)
1. **Global variable doğrulama** — `let store = []` gibi bir global var mı, POST ona push ediyor mu, GET ondan okuyor mu?
2. **KV Namespace** — Basit key-value storage, worker restart'a dayanıklı
3. **D1 Database** — SQL tabanlı, en dayanıklı çözüm
4. **Durable Objects** — Tek instance garantisi, in-memory ama persist eder

## Frontend Tarafı
Frontend hazır ve doğru çalışıyor:
- 5 saniyede bir `GET /appointments` + `GET /dispositions` poll ediyor
- Gelen yeni kayıtları ID bazlı kontrol ile mevcut mock datanın üstüne ekliyor
- API hata verirse mock data korunuyor

**Tek beklenti:** GET endpoint'leri POST edilen verileri dönsün.

## Hızlı Test
Backend düzeltildikten sonra şu komutlarla test et:
```bash
# 1. POST yap
curl -X POST https://borusan-next-mock.freyavoice.workers.dev/dispositions \
  -H "Content-Type: application/json" \
  -d '{"musteri_telefon":"0555 999 88 77","sonuc_kodu":"ULASILAMADI","notlar":"Test kaydi"}'

# 2. GET ile kontrol et (hemen ardından)
curl https://borusan-next-mock.freyavoice.workers.dev/dispositions

# Beklenen: dispositions arrayinde az önce POST edilen kayıt olmalı
```
