# Bảo hiểm Trễ Chuyến Bay — Atadi.vn × Bảo hiểm PVI

Trang **policy wording** (quy tắc bảo hiểm) cho chương trình Flight Delay Insurance, viết bằng **HTML + CSS + JavaScript thuần** — không dùng framework, dễ chỉnh sửa và đưa vào Google Antigravity.

## 1. Cấu trúc thư mục

Toàn bộ trang nằm ở thư mục gốc của dự án:

```
atadi.delaycare-main/
├── index.html    # Toàn bộ nội dung & cấu trúc trang
├── styles.css    # Thiết kế hiển thị màn hình (desktop + mobile)
├── print.css     # Tối ưu khi In / xuất PDF khổ A4 (media="print")
├── script.js     # Menu mobile, scroll-spy mục lục, nút In
├── assets/       # Logo PVI, Atadi, mã QR & bản PDF Quy tắc bảo hiểm
│   ├── pvi-logo.png
│   ├── atadi-logo.png
│   ├── claims-qr.png
│   ├── Atadi-DelayCare-Quy-tac-bao-hiem.pdf
│   └── guide/    # 10 ảnh màn hình Cổng bồi thường UCP (mục Bồi thường)
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
├── uploads/      # Tài liệu nguồn nội bộ (.docx hợp đồng, chương trình BH)
├── screenshots/  # Ảnh chụp màn hình trang, dùng để đối chiếu khi sửa
└── README.md     # Tài liệu này
```

> **Khi đưa lên GitHub / hosting công khai:** chỉ up `index.html`, `styles.css`, `print.css`, `script.js` và thư mục `assets/`. **Không** up `uploads/` (chứa tài liệu nội bộ) và `screenshots/`.

> Thư mục `flight-delay-policy/` (bản dựng đầu tiên, chưa có phần hướng dẫn 6 bước) đã được xoá ngày 11/08/2026. Mọi nội dung của nó đều đã có trong bản ở thư mục gốc.

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

> Quyền lợi đã cố định: trễ **từ 120 phút liên tục trở lên** → **500.000 VND / chuyến / người** (theo Giấy chứng nhận bảo hiểm). Đơn vị bảo hiểm: **Công ty Bảo hiểm PVI Thủ Đô**. Hotline **(+84) 24 3377 2288 / (84) 969 871 166**, email **atadi.support@pvi.com.vn** (về đơn bảo hiểm) và **claim.vn@iglooinsure.com** (về hồ sơ bồi thường) đã điền sẵn. Thẻ “Hỗ trợ khẩn cấp · International SOS” đã được bỏ khỏi mục Liên hệ (13/08/2026); cả 3 thẻ còn lại đều chiếm trọn bề ngang (`.contact__card--wide`).

### Bố cục các phần (theo thứ tự)

1. **Quyền lợi bảo hiểm** (`#quyen-loi`) - 4 thẻ quyền lợi + ghi chú cách tính thời gian trễ · 2. **Đối tượng bảo hiểm** (`#doi-tuong`) · 3. **Định nghĩa chính** (`#dinh-nghia`) · 4. **Bồi thường** (`#quy-trinh-bt`) - chuẩn bị hồ sơ + 6 bước khai báo + trạng thái · 5. **Loại trừ** (`#loai-tru`) · 6. **Điều khoản & xác nhận đồng ý** (`#dieu-khoan`) · 7. **Câu hỏi thường gặp** (`#faq`) · 8. **Liên hệ & hỗ trợ** (`#lien-he`).

> Mục “Xác định thời gian trễ chuyến” trước đây đã **gộp vào Quyền lợi bảo hiểm** vì trùng nội dung (cùng nêu mốc 120 phút, cùng nhắc FlightRadar24). Phần riêng có giá trị được giữ lại: cách tính thời gian trễ và mệnh đề *“tùy thời điểm nào đến trước”* nằm ở `.note` cuối mục Quyền lợi; ràng buộc *“theo quy định trong Hợp đồng / GCNBH”* gộp vào thẻ 03 “Xác minh tự động”.

## 5. Cách chỉnh nội dung

- **Sửa câu chữ:** mở `index.html`, mỗi phần là một `<section class="block" id="...">` có chú thích rõ ràng (ví dụ `<!-- 6. EXCLUSIONS -->`).
- **Thêm/bớt điểm loại trừ hoặc khoản mục:** thêm `<li>...</li>` trong `<ol class="list list--excl">` (số thứ tự tự động).
- **Đổi màu thương hiệu:** sửa biến CSS ở đầu `styles.css` trong khối `:root` (`--blue`, `--ink`, `--paper`...).
- **Đổi font:** thay thẻ `<link>` Google Fonts trong `index.html` và biến `--font-serif` / `--font-sans`.
- **Logo:** đặt trong thư mục `assets/`. Nav và footer đều hiển thị logo PVI trước rồi Atadi. Thay logo bằng cách ghi đè file `assets/pvi-logo.png` / `assets/atadi-logo.png` (giữ nền trong suốt) hoặc đổi đường dẫn `src` trong `index.html`. Chỉnh chiều cao hiển thị qua các rule `.nav__logo-pvi`, `.nav__logo-atadi`, `.foot__logo-img--*` trong `styles.css`.
- **Logo là link về trang chủ:** mỗi logo được bọc trong thẻ `a.brand-link` mở tab mới - PVI → `pvi.com.vn`, Atadi → `atadi.vn`. Chiều cao hai logo được đặt lệch nhau (nav 30px / 26px, footer 34px / 30px) để **bề ngang hiển thị bằng nhau**, do ảnh Atadi có tỷ lệ dài hơn (3.23 so với 2.72). Nếu đổi file logo, chỉnh lại chiều cao theo nguyên tắc cân bề ngang chứ không cân chiều cao.
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
- **Lưu ý booking nhiều hành khách:** đặt ở `<p class="note">` ngay dưới walkthrough, **ngoài** khối 6 bước. Lý do: mô tả trong `<em>` của mỗi bước bị ẩn cho tới khi khách bấm vào bước đó (`.walk__txt em { display: none }`), nên lưu ý quan trọng phải nằm ngoài mới luôn hiển thị. Nội dung: Cổng bồi thường hiển thị hồ sơ theo từng khách hàng, khách khai báo lần lượt cho từng người.
- **Đổi / thêm ảnh minh hoạ:** sửa mảng `SLIDES` ở cuối `script.js` - mỗi phần tử gồm `step` (thuộc bước nào), `img` (đường dẫn ảnh) và `cap` (chú thích). Một bước có thể có nhiều ảnh; chấm tròn và nút mũi tên tự sinh theo số phần tử.
- **Đổi địa chỉ Cổng:** sửa ở 2 chỗ trong `index.html` - thanh URL giả lập `.brw__url` và nút `Mở Cổng bồi thường` trong thẻ QR - đồng thời tạo lại `assets/claims-qr.png`.
- **Thẻ truy cập Cổng:** mã QR và nút bấm nằm chung một thẻ (`.claims__qr`), ngăn bởi dải “hoặc” (`.qr__or`), vì cả hai dẫn tới cùng một địa chỉ. Khi in, dải “hoặc” và nút tự ẩn (chỉ giữ mã QR để quét).
- **Tạo hình ô cửa sổ máy bay:** thẻ `.claims__qr` dùng `border-radius: 78px / 92px` + nền trời sáng + viền bezel kép (3 lớp `inset` box-shadow) + một áng mây trôi ở `::before` (animation `qrCloud`) - cùng ngôn ngữ với `.porthole` ở mục Liên hệ. Nếu đổi bo góc, nhớ chỉnh `padding` theo để nút và mã QR không chạm đường cong. Khi in, bo góc và mây tự tắt.
- **Tương tác:** bấm vào bước để nhảy tới ảnh đầu của bước đó; mũi tên / chấm tròn / phím `←` `→` để chuyển ảnh; bấm ảnh (hoặc nút kính lúp) để phóng to, `Esc` để đóng.
- **Khi in:** `print.css` tự bung toàn bộ mô tả 6 bước, ẩn chấm tròn / mũi tên / nút CTA và giới hạn ảnh cao tối đa 90mm.

### Mục “Câu hỏi thường gặp” (`#faq`)

Đặt **ngay trước** mục Liên hệ & hỗ trợ - khách tự tìm đáp án trước, không thấy thì cuộn tiếp một đoạn là gặp hotline. Đừng đảo lên trước Điều khoản: khối Liên hệ phải là điểm kết của trang.

- **46 câu, gom thành 5 nhóm** (`.faq__group`): Điều kiện tham gia & mua bảo hiểm (10) · Quyền lợi & cách tính thời gian trễ (6) · Tình huống thực tế: trễ, hủy & đổi chuyến (9) · Trường hợp không được chi trả (10) · Hồ sơ, khai báo & nhận tiền (11).
- **Nguồn nội dung:** 35 câu do Igloo bổ sung (file `FAQ_BaoHiem_TreChuyenBay_PVI_35Cau.xlsx`, 7 nhóm gốc) đã được gộp vào 12 câu sẵn có ngày 13/08/2026. **Giữ đúng 5 nhóm** là ràng buộc thiết kế - thêm nhóm thứ 6 làm mục FAQ dài quá tầm nhìn một màn hình. Câu mới phải xếp vào 1 trong 5 nhóm hiện có.
- ⚠️ **Câu “hủy hợp đồng - hoàn phí” KHÔNG lấy theo file Igloo.** File Igloo ghi hoàn **80%**; Quy tắc bảo hiểm của chương trình Atadi (Phần II, Mục 4 - Chấm dứt Hợp đồng bảo hiểm) quy định hoàn **100%** phí nếu gửi văn bản đề nghị chấm dứt trước giờ khởi hành theo lịch trình ít nhất 24 giờ, không phân biệt bên nào đề nghị; dưới 24 giờ thì không hoàn phí. Trang đang để **100%** theo Quy tắc.
- 7 câu cũ bị gỡ vì trùng nội dung với bản Igloo (mốc trễ, số tiền, cách tính giờ, hạn nộp hồ sơ, thời gian chi trả, đến sân bay muộn, dịch bệnh/cơ quan nhà nước) - bản Igloo có căn cứ điều khoản nên được ưu tiên giữ.
- **Cột “Căn cứ Điều khoản & Tài liệu” trong file Excel chưa đưa lên trang** (giữ giọng hướng khách hàng như các mục khác). Nếu cần hiển thị, thêm class `.faq__ref` và một `<p>` cuối mỗi `.faq__a-in`.
- **Quy ước lời văn:** câu hỏi viết theo giọng khách hàng (chủ ngữ “tôi”), câu trả lời viết theo giọng đơn vị bảo hiểm - luôn có chủ ngữ *Bảo hiểm PVI* hoặc *Quý khách*, không trả lời cụt.
- **Tương tác:** accordion 2 tầng - bấm nhóm để mở danh sách câu hỏi (mỗi lúc chỉ một nhóm mở), bấm câu hỏi để mở đáp án (mỗi lúc chỉ một đáp án). Đóng nhóm thì đáp án bên trong đóng theo. Toàn bộ nằm ở cuối `script.js`.
- **Đóng/mở mượt** bằng kỹ thuật `grid-template-rows: 0fr → 1fr` (không cần biết trước chiều cao), nên mỗi panel phải giữ đúng 2 lớp: `.faq__panel > .faq__panel-in` và `.faq__a > .faq__a-in`, lớp trong có `overflow: hidden`. Bỏ lớp trong là mất hiệu ứng.
- **Nội dung phải khớp các mục trên trang.** Số liệu trong FAQ (120 phút · 500.000đ · 01 năm · 07 ngày làm việc · 02-85 tuổi) lấy từ các mục Quyền lợi / Đối tượng / Bồi thường - khi sửa quy tắc, sửa cả hai chỗ.
- **Khi in:** `print.css` bung sẵn toàn bộ câu hỏi và đáp án, ẩn dấu +/chevron.

> Lưu ý khi kiểm tra bằng Browser pane: tab chạy nền không tick animation nên panel accordion đọc ra chiều cao 0. Tạm chèn `.faq__panel,.faq__a{transition:none}` rồi mới đo, hoặc kiểm tra trên trình duyệt thật.

## 6. Khả năng tương thích

- Responsive: desktop (mục lục dính bên trái) và mobile (menu thu gọn, 1 cột).
- Hoạt động offline, không phụ thuộc CDN ngoài Google Fonts (có thể nhúng font cục bộ nếu cần in offline).

## 7. Lưu ý pháp lý

Trang chỉ trình bày **Quy tắc bảo hiểm** phục vụ tham khảo. Quyền lợi, số tiền bảo hiểm, mức thời gian trễ tối thiểu, phí và điều kiện cụ thể áp dụng theo **Hợp đồng / Giấy chứng nhận bảo hiểm** và **Bảng quyền lợi bảo hiểm** chính thức. Khi có khác biệt, nội dung Hợp đồng / Giấy chứng nhận chính thức là căn cứ áp dụng. Mọi dẫn chiếu về thời gian áp dụng theo **giờ Việt Nam**.
