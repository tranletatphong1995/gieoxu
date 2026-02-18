# 📜 PLAN: Công Cụ Gieo Quẻ Kinh Dịch

> **Ngày tạo**: 2026-02-18  
> **Trạng thái**: 📋 Chờ phê duyệt  
> **Công nghệ**: HTML + CSS + JavaScript thuần  
> **Triển khai**: GitHub Pages (tự upload)

---

## 🎯 Tổng quan Dự án

Xây dựng công cụ gieo quẻ Kinh Dịch trực tuyến, mô phỏng việc **gieo 3 đồng xu 6 lần** để tạo thành một quẻ hoàn chỉnh (6 hào). Giao diện phong cách **Á Đông cổ điển** (đỏ - vàng - đen), tối ưu cho việc deploy tĩnh lên GitHub Pages.

---

## 📐 Kiến trúc Dự án

```
my_project/
├── index.html          # Trang chính (single page)
├── css/
│   └── style.css       # Toàn bộ styles
├── js/
│   ├── app.js          # Logic chính, điều phối
│   ├── divination.js   # Engine gieo quẻ (random, tính hào)
│   ├── hexagram.js     # Data 64 quẻ + lookup
│   └── animation.js    # Animation tung xu
├── assets/
│   ├── fonts/          # Font chữ Hán (nếu cần)
│   └── images/         # Hình nền, texture
└── docs/
    └── PLAN-iching-divination.md
```

**Tổng cộng: ~6-8 files** — Gọn nhẹ, dễ quản lý, dễ upload GitHub.

---

## 🧠 Phase 0: Kiến thức Cốt lõi — Quy tắc Gieo Quẻ

### Quy tắc gieo xu

Mỗi lần gieo **3 đồng xu** (mỗi xu: Sấp = Âm, Ngửa = Dương):

| Kết quả 3 xu | Loại Hào | Tính chất | Quẻ Biến |
|---|---|---|---|
| 3 Ngửa (Dương + Dương + Dương) | **Dương Động** ☰ | Lão Dương → Biến | Hào Dương → **Âm** ở quẻ biến |
| 2 Ngửa + 1 Sấp | **Dương Tĩnh** ⚊ | Thiếu Dương | Giữ nguyên |
| 2 Sấp + 1 Ngửa | **Âm Tĩnh** ⚋ | Thiếu Âm | Giữ nguyên |
| 3 Sấp (Âm + Âm + Âm) | **Âm Động** ☷ | Lão Âm → Biến | Hào Âm → **Dương** ở quẻ biến |

### Trình tự
- **Gieo 6 lần**, từ dưới lên (Hào 1 → Hào 6)
- Hào 1-3: **Quẻ Nội** (Hạ quái)
- Hào 4-6: **Quẻ Ngoại** (Thượng quái)
- Nếu có hào động → tạo **Quẻ Biến**

### Bảng tra 64 quẻ
- 8 quẻ đơn (Bát Quái): Càn ☰, Khảm ☵, Cấn ☶, Chấn ☳, Tốn ☴, Ly ☲, Khôn ☷, Đoài ☱
- Kết hợp Thượng + Hạ = 1 trong 64 quẻ kép

---

## 🔨 Phase 1: Foundation — Cấu trúc & Engine

### Task 1.1: Khung HTML cơ bản
- **File**: `index.html`
- **Nội dung**:
  - Meta tags chuẩn SEO (title, description, OG tags)
  - Viewport responsive
  - Khu vực: Header → Gieo Quẻ → Kết Quả → Footer
  - Load Google Fonts (Noto Serif TC / Ma Shan Zheng cho chữ Hán)
- **Thời gian ước tính**: 15 phút

### Task 1.2: Engine Gieo Quẻ (divination.js)
- **File**: `js/divination.js`
- **Chức năng cốt lõi**:

```javascript
// Thuật toán Random tuyệt đối
// Sử dụng crypto.getRandomValues() thay vì Math.random()
// crypto API cho chất lượng random cao hơn (CSPRNG)

function throwCoin() {
  // Return 0 (Sấp/Âm) hoặc 1 (Ngửa/Dương)
  // Dùng Uint32Array + crypto.getRandomValues()
}

function throwThreeCoins() {
  // Gieo 3 xu -> trả về mảng [coin1, coin2, coin3]
  // Và xác định loại hào:
  //   [1,1,1] → Lão Dương (dương động) - giá trị 9
  //   [1,1,0] → Thiếu Dương (dương tĩnh) - giá trị 7
  //   [0,0,1] → Thiếu Âm (âm tĩnh) - giá trị 8
  //   [0,0,0] → Lão Âm (âm động) - giá trị 6
}

function castHexagram() {
  // Gieo 6 lần → tạo mảng 6 hào (từ dưới lên)
  // Trả về: { lines[], mainHexagram, changedHexagram }
}
```

- **Yêu cầu Random**:
  - ✅ Dùng `crypto.getRandomValues()` (CSPRNG — Cryptographically Secure)
  - ✅ Mỗi xu gieo **độc lập** hoàn toàn
  - ✅ Không seed, không pattern, không bias
  - ❌ KHÔNG dùng `Math.random()` (pseudo-random, không đủ ngẫu nhiên)
- **Thời gian ước tính**: 30 phút

### Task 1.3: Data 64 Quẻ (hexagram.js)
- **File**: `js/hexagram.js`
- **Nội dung**:
  - Object chứa 64 quẻ với key = mã nhị phân 6 bit
  - Mỗi quẻ: `{ name, chineseName, unicode, upperTrigram, lowerTrigram }`
  - Bảng 8 Bát Quái đơn
  - Hàm lookup: `getHexagram(lines[])` → trả về thông tin quẻ
- **Thời gian ước tính**: 45 phút (nhập liệu 64 quẻ)

---

## 🎨 Phase 2: Giao diện Á Đông

### Task 2.1: Design System (style.css)
- **File**: `css/style.css`
- **Bảng màu Á Đông Cổ điển**:

```
🔴 Đỏ son:     #8B0000 (chính) / #C41E3A (nhấn)
🟡 Vàng kim:    #D4AF37 (accent) / #FFD700 (highlight)  
⚫ Đen mực:     #1A1A2E (nền chính) / #16213E (nền phụ)
📜 Kem giấy:    #F5E6CA (text sáng) / #DCC19F (text phụ)
🟤 Nâu gỗ:     #5C3317 (border, divider)
```

- **Typography**:
  - Tiêu đề: `Ma Shan Zheng` hoặc `Noto Serif TC` (Google Fonts)
  - Body: `Noto Sans Vietnamese` / System fonts
  - Chữ quẻ lớn: 36-48px, chữ Hán đậm

- **Hiệu ứng**:
  - Background: texture giấy cổ / hoa văn vân mây
  - Border: viền hoa văn Á Đông (CSS pattern)
  - Box-shadow: ánh sáng vàng kim nhẹ (glow effect)
  - Yin-Yang spinner khi loading

- **Thời gian ước tính**: 60 phút

### Task 2.2: Layout & Components
- **Responsive**: Mobile-first (360px → 1200px)
- **Sections**:

```
┌─────────────────────────────────────┐
│          🏮 KINH DỊCH 🏮            │ ← Header với chữ Hán
│         Công Cụ Gieo Quẻ           │
├─────────────────────────────────────┤
│                                     │
│     ┌───────────────────────┐       │
│     │   🪙  🪙  🪙          │       │ ← 3 đồng xu (animated)
│     │                       │       │
│     │  [ GIEO HÀO x/6 ]    │       │ ← Nút gieo từng hào
│     └───────────────────────┘       │
│                                     │
│  Hào 6: ━━━━━━━━━━━━  (Dương)     │ ← Hiển thị realtime
│  Hào 5: ━━━━  ━━━━  (Âm Động ◯)  │   từ dưới lên
│  Hào 4: ━━━━━━━━━━━━  (Dương)     │
│  Hào 3: ━━━━  ━━━━  (Âm)         │
│  Hào 2: ━━━━━━━━━━━━  (Dương)     │
│  Hào 1: ━━━━━━━━━━━━  (Dương Động ✕)│
│                                     │
├─────────────────────────────────────┤
│                                     │
│   QUẺ CHÍNH    →    QUẺ BIẾN       │ ← Kết quả 2 quẻ
│    ☰ Càn             ☷ Khôn        │
│   天 Thiên           地 Địa         │
│                                     │
└─────────────────────────────────────┘
```

- **Thời gian ước tính**: 60 phút

---

## ✨ Phase 3: Animation & UX

### Task 3.1: Animation Tung Xu (animation.js)
- **File**: `js/animation.js`
- **Hiệu ứng**:
  1. **Lắc xu**: 3 đồng xu rung lắc trước khi tung (CSS shake)
  2. **Tung xu**: Xu bay lên, xoay (CSS transform rotateY), rơi xuống
  3. **Hiện kết quả**: Mỗi xu lật ra Sấp/Ngửa với delay stagger
  4. **Vẽ hào**: Hào mới xuất hiện từ dưới lên với fade-in + slide
  5. **Hào động**: Nhấp nháy / glow effect để phân biệt hào động
- **Timing**: 
  - Tung xu: ~1.2 giây
  - Hiện kết quả: ~0.5 giây
  - Tổng: ~2 giây mỗi lần gieo
- **Thời gian ước tính**: 60 phút

### Task 3.2: Flow Tương tác
- **Bước 1**: User nhấn "**BẮT ĐẦU GIEO QUẺ**" → Reset giao diện
- **Bước 2**: Nhấn "**GIEO**" → Tung 3 xu → Animation → Hiện hào 1
- **Bước 3**: Lặp lại 5 lần nữa (hào 2 → hào 6)
- **Bước 4**: Tự động tính → Hiển thị **Quẻ Chính** + **Quẻ Biến** (nếu có)
- **Bước 5**: Nút "**GIEO LẠI**" để reset

- **Thời gian ước tính**: 30 phút

---

## 🔧 Phase 4: Polish & Hoàn thiện

### Task 4.1: Hiệu ứng nâng cao
- Particle effect (tia sáng vàng khi hoàn thành quẻ)
- Smooth scroll đến kết quả
- Sound effect (tùy chọn — click sound khi tung xu)
- Responsive kiểm tra trên mobile

### Task 4.2: SEO & Meta
- Title: "Gieo Quẻ Kinh Dịch Online — Công Cụ Gieo 3 Đồng Xu"
- Meta description
- Open Graph tags (share Facebook/Zalo)
- Favicon (biểu tượng Yin-Yang)

### Task 4.3: Tối ưu Production
- Minify CSS/JS (không bắt buộc với GitHub Pages)
- Kiểm tra Lighthouse score
- Test trên Chrome, Safari, Firefox
- Đảm bảo **không dependency ngoài** (chỉ vanilla)

- **Thời gian ước tính**: 30 phút

---

## ✅ Phase X: Checklist Xác minh

### Chức năng
- [ ] Mỗi lần gieo 3 xu đều random tuyệt đối (crypto API)
- [ ] 3 Dương → Lão Dương (Dương Động → Biến Âm) ✅
- [ ] 3 Âm → Lão Âm (Âm Động → Biến Dương) ✅  
- [ ] 2 Dương + 1 Âm → Thiếu Dương (tĩnh) ✅
- [ ] 2 Âm + 1 Dương → Thiếu Âm (tĩnh) ✅
- [ ] Quẻ biến chỉ xuất hiện khi có hào động ✅
- [ ] Tra đúng tên 64 quẻ từ 6 hào ✅
- [ ] Gieo đúng 6 lần, từ dưới lên ✅

### Giao diện
- [ ] Phong cách Á Đông rõ ràng (màu đỏ-vàng-đen)
- [ ] Animation tung xu mượt mà
- [ ] Hào động có đánh dấu rõ ràng (◯ hoặc ✕)
- [ ] Responsive trên mobile (360px+)
- [ ] Quẻ chính và quẻ biến hiển thị song song

### Kỹ thuật
- [ ] Không dependency ngoài (chỉ HTML/CSS/JS thuần)
- [ ] Dùng `crypto.getRandomValues()` cho random
- [ ] Hoạt động offline (sau khi load lần đầu)
- [ ] Tương thích Chrome, Firefox, Safari, Edge
- [ ] Có thể deploy trực tiếp lên GitHub Pages

---

## ⏱️ Tổng thời gian ước tính

| Phase | Nội dung | Thời gian |
|---|---|---|
| Phase 1 | Foundation & Engine | ~90 phút |
| Phase 2 | Giao diện Á Đông | ~120 phút |
| Phase 3 | Animation & UX | ~90 phút |
| Phase 4 | Polish & Deploy | ~30 phút |
| **Tổng** | | **~330 phút (~5.5 giờ)** |

---

## 🚀 Lệnh tiếp theo

Sau khi phê duyệt plan này, chạy:
```
/create
```
Để bắt đầu triển khai từ Phase 1.

---

*Plan được tạo bởi Antigravity Orchestrator — 2026-02-18*
