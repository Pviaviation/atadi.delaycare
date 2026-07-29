# Bảo hiểm Trễ Chuyến Bay — Atadi.vn × Bảo hiểm PVI

Trang **policy wording** (quy tắc bảo hiểm) cho chương trình Flight Delay Insurance, viết bằng **HTML + CSS + JavaScript thuần** — không dùng framework, dễ chỉnh sửa và đưa vào Google Antigravity.

## 1. Cấu trúc thư mục

```
flight-delay-policy/
├── index.html    # Toàn bộ nội dung & cấu trúc trang
├── styles.css    # Thiết kế hiển thị màn hình (desktop + mobile)
├── print.css     # Tối ưu khi In / xuất PDF khổ A4 (media="print")
├── script.js     # Menu mobile, scroll-spy mục lục, nút In
├── assets/       # Logo PVI, Atadi & mã QR (PNG nền trong suốt)
│   ├── pvi-logo.png
│   ├── atadi-logo.png
│   ├── claims-qr.png
│   └── guide/    # 10 ảnh màn hình Cổng bồi thường UCP (mục Hướng dẫn)
│       ├── 01-email.png              # Email thông báo đủ điều kiện
│       ├── 02-dang-nhap.png          # Màn hình đăng nhập
│       ├── 03-otp.png                # Email chứa mã OTP
│       ├── 04-bao-hiem-cua-toi.png   # Danh sách hợp đồng
│       ├── 05-chi-tiet-hop-dong.png  # Chi tiết hợp đồng + nút YCBT
│       ├── 06-chon-quyen-loi.png     # Chọn quyền lợi
│       ├── 07-ho-so-1.png            # Form hồ sơ (màn 1)
│       ├── 08-ho-so-2.png            # Form hồ sơ (màn 2)
│       ├── 09-danh-sach-ho-so.png    # Danh sách hồ sơ & trạng thái
│       └── 10-chi-tiet-ho-so.png     # Chi tiết hồ sơ
└── README.md     # Tài liệu này
```

## 2. Cách chạy

Chỉ cần mở `index.html` bằng trình duyệt (Chrome / Edge / Safari) — không cần server.
Nếu muốn chạy qua server tĩnh (tùy chọn):

```bash
# Python
python3 -m http.server 8080
# hoặc Node
npx serve .
```

Rồi mở `http://localhost:8080`.

## 3. Xuất PDF / In khổ A4

- Bấm nút **“Tải / In bản PDF”** ở Hero, hoặc nhấn `Ctrl/Cmd + P`.
- Trong hộp thoại in: chọn khổ **A4**, bật **Background graphics** (Đồ họa nền) để giữ màu bảng & nhãn.
- File `print.css` tự động: ẩn thanh điều hướng, chuyển khối liên hệ nền tối → nền sáng, chống ngắt trang giữa bảng/thẻ.

## 4. Chỗ cần điền nội dung (đánh dấu sẵn)

Các ô có dạng `[___]` (class `.fill`, viền xanh nét đứt) là **chỗ cần điền / cập nhật** trước khi phát hành:

| Vị trí | Nội dung cần điền |
|---|---|
| Mục **Quy trình yêu cầu bồi thường** → Cổng bồi thường | Cập nhật **mã QR** (`assets/claims-qr.png`) trỏ tới link Cổng bồi thường thực tế |
| Mục **Bồi thường** → 10 ảnh trong `assets/guide/` | Ảnh trích từ tài liệu HDSD, đang là **dữ liệu test** (`NGUYEN VAN TEST`, Kênh mua hàng `PVI Insurance`). Nên thay bằng ảnh chụp môi trường thật với kênh **Atadi** |

> Địa chỉ Cổng bồi thường `https://pvi-flight-delay.ucp-latest.iglooinsure.com/` **đã được xác nhận là link live** (dù tên miền có chuỗi `ucp-latest`). Địa chỉ này xuất hiện ở 3 chỗ: mã QR `assets/claims-qr.png`, thanh URL giả lập `.brw__url`, và nút **Mở Cổng bồi thường** - cả 3 phải trỏ cùng một đích khi cập nhật.

> Quyền lợi đã cố định: trễ **từ 120 phút liên tục trở lên** → **500.000 VND / chuyến / người** (theo Giấy chứng nhận bảo hiểm). Đơn vị bảo hiểm: **Công ty Bảo hiểm PVI Thủ Đô**. Hotline **(+84) 24 3377 2288 / (84) 969 871 166**, International SOS **(84) 28 3999 8110**, email **atadi.support@pvi.com.vn** đã điền sẵn.

### Bố cục các phần (theo thứ tự)

1. **Quyền lợi bảo hiểm** (`#quyen-loi`) - 4 thẻ quyền lợi + ghi chú cách tính thời gian trễ · 2. **Đối tượng bảo hiểm** (`#doi-tuong`) · 3. **Định nghĩa chính** (`#dinh-nghia`) · 4. **Bồi thường** (`#quy-trinh-bt`) - chuẩn bị hồ sơ + 6 bước khai báo + trạng thái · 5. **Loại trừ** (`#loai-tru`) · 6. **Điều khoản & xác nhận đồng ý** (`#dieu-khoan`) · 7. **Liên hệ & hỗ trợ** (`#lien-he`).

> Mục “Xác định thời gian trễ chuyến” trước đây đã **gộp vào Quyền lợi bảo hiểm** vì trùng nội dung (cùng nêu mốc 120 phút, cùng nhắc FlightRadar24). Phần riêng có giá trị được giữ lại: cách tính thời gian trễ và mệnh đề *“tùy thời điểm nào đến trước”* nằm ở `.note` cuối mục Quyền lợi; ràng buộc *“theo quy định trong Hợp đồng / GCNBH”* gộp vào thẻ 03 “Xác minh tự động”.

## 5. Cách chỉnh nội dung

- **Sửa câu chữ:** mở `index.html`, mỗi phần là một `<section class="block" id="...">` có chú thích rõ ràng (ví dụ `<!-- 6. EXCLUSIONS -->`).
- **Thêm/bớt điểm loại trừ hoặc khoản mục:** thêm `<li>...</li>` trong `<ol class="list list--excl">` (số thứ tự tự động).
- **Đổi màu thương hiệu:** sửa biến CSS ở đầu `styles.css` trong khối `:root` (`--blue`, `--ink`, `--paper`...).
- **Đổi font:** thay thẻ `<link>` Google Fonts trong `index.html` và biến `--font-serif` / `--font-sans`.
- **Logo:** đặt trong thư mục `assets/`. Nav hiển thị logo PVI trước rồi Atadi; footer hiển thị cả hai. Thay logo bằng cách ghi đè file `assets/pvi-logo.png` / `assets/atadi-logo.png` (giữ nền trong suốt) hoặc đổi đường dẫn `src` trong `index.html`. Chỉnh chiều cao hiển thị qua các rule `.nav__logo-pvi`, `.nav__logo-atadi`, `.foot__logo-img--*` trong `styles.css`.
- **Nền trời động ở Hero:** điều khiển bằng các rule `.sky`, `.cloud`, `.plane` trong `styles.css`; tự tắt khi thiết bị bật `prefers-reduced-motion` và ẩn khi in.

### Hero - 3 điểm vượt trội (`.usps`)

Thay cho đoạn văn giới thiệu dài trước đây. Ba box nêu 3 điểm bán hàng: **500.000đ/người/chuyến** · **Tự động xác minh** · **Nhận tiền trong 07 ngày** (tham chiếu: AirAsia Easy Cancel, OPES O·FLIGHT).

- Mỗi box gồm `.usp__ic` (icon) + `<strong>` (tiêu đề) + `.usp__sub` (mô tả). Sửa nội dung trực tiếp trong `index.html`.
- Máy nhỏ (≤860px): tự chuyển sang xếp dọc, icon nằm bên trái tiêu đề bằng `grid-template-areas` - **không cần đổi HTML**.
- Hero đã được nén lại ở breakpoint 720px để 3 box + nút CTA cùng nằm gọn trong một màn hình điện thoại. Nếu thêm nội dung vào hero, kiểm tra lại nút CTA có bị đẩy khỏi tầm nhìn không.

### Mục “Điều khoản &amp; xác nhận đồng ý” (`#dieu-khoan`)

Đây là **đích của ô checkbox xác nhận** ở bước mua bảo hiểm trên Atadi.vn: *“Tôi đã đọc, hiểu và đồng ý với Quy tắc bảo hiểm, Điều khoản &amp; Điều kiện bảo hiểm và Chính sách bảo vệ dữ liệu cá nhân của Bảo hiểm PVI và Atadi.”*

- Mục liệt kê 6 nội dung khách hàng xác nhận khi tích ô (đọc hiểu &amp; tự nguyện tham gia · đồng ý Quy tắc/Điều khoản · đồng ý Atadi chuyển dữ liệu cho PVI · đồng ý PVI &amp; đơn vị vận hành Cổng bồi thường xử lý dữ liệu · tuân theo 2 chính sách dữ liệu · cam kết khai báo trung thực).
- **Không liệt kê tài liệu thành khối riêng.** Tên tài liệu được gắn hyperlink ngay trong câu xác nhận (`.consent__list a`):
  - dòng 2 → “Quy tắc bảo hiểm, Điều khoản &amp; Điều kiện bảo hiểm” → `assets/Atadi-DelayCare-Quy-tac-bao-hiem.pdf`
  - dòng 5 → “Chính sách bảo vệ dữ liệu cá nhân của Bảo hiểm PVI” → `pvi.com.vn/vi/privacy-policy`
  - dòng 5 → “Chính sách bảo mật của Atadi” → `atadi.vn/chinh-sach-bao-mat`
- Ba link trên cũng có ở chân trang (`.foot__policies`) để truy cập từ mọi vị trí cuộn.
- **Atadi có thể deep-link thẳng tới `…/index.html#dieu-khoan`** để nhảy đúng mục.
- Khi in, địa chỉ đầy đủ của link ngoài được tự động in ra sau tên tài liệu để đối chiếu trên bản giấy.

### Mục “Bồi thường” (`#quy-trinh-bt`)

Gộp chung phần quy trình và phần hướng dẫn thao tác, gồm: **01 Chuẩn bị hồ sơ** (danh mục chứng từ + mã QR / nút mở Cổng) → **02 Các bước khai báo trên Cổng** (walkthrough 6 bước + 10 ảnh) → **03 Trạng thái hồ sơ**.

> Hai mốc thời hạn (**01 năm** nộp hồ sơ · **07 ngày làm việc** chi trả) nằm trong câu mở đầu (`.block__lead`) của mục - trước đây từng tách thành khối thẻ riêng nhưng đã bỏ. Nếu sửa câu mở đầu, đừng làm mất 2 mốc này vì không còn chỗ nào khác trên trang nêu thời hạn 01 năm.

Nội dung hướng dẫn lấy từ tài liệu `HDSD-UCP-BaoHiem-TreChuyenBay_updated.docx` (PVI × Igloo).

- **Sửa lời văn 6 bước:** trong `index.html`, mỗi bước là một `<li class="walk__step" data-step="N">`; tiêu đề nằm trong `<strong>`, mô tả trong `<em>` (mô tả chỉ hiện khi bước đang được chọn).
- **Đổi / thêm ảnh minh hoạ:** sửa mảng `SLIDES` ở cuối `script.js` - mỗi phần tử gồm `step` (thuộc bước nào), `img` (đường dẫn ảnh) và `cap` (chú thích). Một bước có thể có nhiều ảnh; chấm tròn và nút mũi tên tự sinh theo số phần tử.
- **Đổi địa chỉ Cổng:** sửa ở 2 chỗ trong `index.html` - thanh URL giả lập `.brw__url` và nút `Mở Cổng bồi thường` trong thẻ QR - đồng thời tạo lại `assets/claims-qr.png`.
- **Thẻ truy cập Cổng:** mã QR và nút bấm nằm chung một thẻ (`.claims__qr`), ngăn bởi dải “hoặc” (`.qr__or`), vì cả hai dẫn tới cùng một địa chỉ. Khi in, dải “hoặc” và nút tự ẩn (chỉ giữ mã QR để quét).
- **Tạo hình ô cửa sổ máy bay:** thẻ `.claims__qr` dùng `border-radius: 78px / 92px` + nền trời sáng + viền bezel kép (3 lớp `inset` box-shadow) + một áng mây trôi ở `::before` (animation `qrCloud`) - cùng ngôn ngữ với `.porthole` ở mục Liên hệ. Nếu đổi bo góc, nhớ chỉnh `padding` theo để nút và mã QR không chạm đường cong. Khi in, bo góc và mây tự tắt.
- **Tương tác:** bấm vào bước để nhảy tới ảnh đầu của bước đó; mũi tên / chấm tròn / phím `←` `→` để chuyển ảnh; bấm ảnh (hoặc nút kính lúp) để phóng to, `Esc` để đóng.
- **Khi in:** `print.css` tự bung toàn bộ mô tả 6 bước, ẩn chấm tròn / mũi tên / nút CTA và giới hạn ảnh cao tối đa 90mm.

## 6. Khả năng tương thích

- Responsive: desktop (mục lục dính bên trái) và mobile (menu thu gọn, 1 cột).
- Hoạt động offline, không phụ thuộc CDN ngoài Google Fonts (có thể nhúng font cục bộ nếu cần in offline).

## 7. Lưu ý pháp lý

Trang chỉ trình bày **Quy tắc bảo hiểm** phục vụ tham khảo. Quyền lợi, số tiền bảo hiểm, mức thời gian trễ tối thiểu, phí và điều kiện cụ thể áp dụng theo **Hợp đồng / Giấy chứng nhận bảo hiểm** và **Bảng quyền lợi bảo hiểm** chính thức. Khi có khác biệt, nội dung Hợp đồng / Giấy chứng nhận chính thức là căn cứ áp dụng. Mọi dẫn chiếu về thời gian áp dụng theo **giờ Việt Nam**.
