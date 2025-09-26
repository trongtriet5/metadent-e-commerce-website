# Chuyên gia răng miệng - Website bán hàng

Website bán hàng chuyên về các sản phẩm chăm sóc răng miệng với frontend Next.js và backend Django.

## 🌟 Tính năng chính

- **Frontend**: Next.js 15 với TypeScript, TailwindCSS, App Router
- **Backend**: Django 4.2 + Django REST Framework
- **UI/UX**: Thiết kế hiện đại, responsive, màu chủ đạo #0077B6
- **State Management**: Zustand cho quản lý giỏ hàng
- **API Integration**: Axios cho giao tiếp frontend-backend
- **Database**: SQLite (có thể chuyển sang PostgreSQL/MySQL)

## 📁 Cấu trúc dự án

```
metadent/
├── frontend/                    # Next.js frontend
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   │   ├── page.tsx        # Trang chủ
│   │   │   ├── products/       # Trang sản phẩm
│   │   │   ├── cart/           # Trang giỏ hàng
│   │   │   ├── about/          # Trang giới thiệu
│   │   │   └── contact/        # Trang liên hệ
│   │   ├── components/         # React components
│   │   ├── lib/               # Utilities & API
│   │   ├── store/             # Zustand stores
│   │   └── types/             # TypeScript types
│   ├── package.json
│   └── tailwind.config.js
├── backend/                     # Django backend
│   ├── metadent_backend/       # Django project
│   ├── products/               # Products app
│   ├── cart/                   # Cart app
│   ├── fixtures/               # Demo data
│   ├── media/                  # Uploaded files
│   ├── requirements.txt
│   └── manage.py
└── README.md
```

## 🛠️ Yêu cầu hệ thống

- **Node.js**: 18.0.0 trở lên
- **Python**: 3.8 trở lên
- **npm**: 8.0.0 trở lên
- **pip**: 21.0.0 trở lên

## 🚀 Cài đặt và chạy

### 1. Backend (Django)

```bash
# Di chuyển vào thư mục backend
cd backend

# Tạo virtual environment
python -m venv venv

# Kích hoạt virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Cài đặt dependencies
pip install -r requirements.txt

# Chạy migrations
python manage.py migrate

# Tạo superuser (tùy chọn)
python manage.py createsuperuser

# Load dữ liệu demo
python manage.py loaddata fixtures/demo_products.json

# Chạy server
python manage.py runserver
```

Backend sẽ chạy tại: **http://localhost:8000**

### 2. Frontend (Next.js)

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:3000**

## 📡 API Endpoints

### Products
- `GET /api/products/` - Danh sách tất cả sản phẩm
- `GET /api/products/{id}/` - Chi tiết sản phẩm
- `GET /api/products/category/{category}/` - Sản phẩm theo danh mục

### Cart
- `GET /api/cart/items/` - Xem giỏ hàng
- `POST /api/cart/items/` - Thêm sản phẩm vào giỏ hàng
- `DELETE /api/cart/items/{id}/` - Xóa sản phẩm khỏi giỏ hàng
- `DELETE /api/cart/items/` - Xóa toàn bộ giỏ hàng

### Orders
- `POST /api/cart/order/` - Tạo đơn hàng

## 🎨 Thiết kế UI/UX

### Màu sắc
- **Màu chủ đạo**: #0077B6 (Xanh nước biển)
- **Màu phụ**: #005a8b (Xanh đậm)
- **Màu nền**: #ffffff (Trắng)
- **Màu chữ**: #1f2937 (Xám đậm)

### Components chính
- **Header**: Logo, menu navigation, giỏ hàng
- **Footer**: Thông tin liên hệ, mạng xã hội
- **ProductCard**: Hiển thị sản phẩm với hình ảnh, giá, nút thêm vào giỏ
- **Cart**: Danh sách sản phẩm, tổng tiền, form đặt hàng

### Responsive Design
- **Desktop**: Grid 4 cột cho sản phẩm
- **Tablet**: Grid 2-3 cột
- **Mobile**: Grid 1 cột, menu hamburger

## 📦 Sản phẩm demo

Dự án bao gồm 9 sản phẩm demo:

### Máy tăm nước (3 sản phẩm)
1. Waterpik WP-660 - 1,290,000 VND
2. Philips Sonicare AirFloss - 890,000 VND
3. Panasonic EW-DJ10 - 650,000 VND

### Bàn chải điện (3 sản phẩm)
1. Oral-B Pro 1000 - 750,000 VND
2. Philips Sonicare DiamondClean - 1,890,000 VND
3. Xiaomi Mi Electric Toothbrush - 450,000 VND

### Nước súc miệng (3 sản phẩm)
1. Listerine Total Care - 85,000 VND
2. Colgate Plax - 65,000 VND
3. Sensodyne Daily Care - 95,000 VND

## 🔧 Công nghệ sử dụng

### Frontend
- **Next.js 15**: React framework với App Router
- **TypeScript**: Type safety
- **TailwindCSS**: Utility-first CSS framework
- **Zustand**: State management
- **Axios**: HTTP client
- **Lucide React**: Icon library

### Backend
- **Django 4.2**: Python web framework
- **Django REST Framework**: API development
- **django-cors-headers**: CORS handling
- **Pillow**: Image processing
- **SQLite**: Database (development)

## 📱 Tính năng đã hoàn thành

- ✅ **Trang chủ**: Hero section, danh mục sản phẩm, sản phẩm nổi bật
- ✅ **Trang sản phẩm**: Danh sách, lọc theo danh mục, tìm kiếm
- ✅ **Chi tiết sản phẩm**: Hình ảnh, mô tả, giá, thêm vào giỏ hàng
- ✅ **Giỏ hàng**: Thêm/xóa sản phẩm, cập nhật số lượng, đặt hàng
- ✅ **Trang giới thiệu**: Thông tin công ty, đội ngũ, giá trị cốt lõi
- ✅ **Trang liên hệ**: Form liên hệ, thông tin liên hệ, FAQ
- ✅ **Responsive design**: Tối ưu cho desktop, tablet, mobile
- ✅ **API integration**: Kết nối frontend-backend hoàn chỉnh
- ✅ **State management**: Quản lý giỏ hàng với Zustand
- ✅ **UI/UX**: Thiết kế hiện đại, dễ sử dụng

## 🚀 Triển khai

### Development
```bash
# Backend
cd backend
python manage.py runserver

# Frontend
cd frontend
npm run dev
```

### Production
```bash
# Build frontend
cd frontend
npm run build
npm start

# Backend với Gunicorn
cd backend
pip install gunicorn
gunicorn metadent_backend.wsgi:application
```

## 📞 Hỗ trợ

Nếu gặp vấn đề trong quá trình cài đặt hoặc sử dụng, vui lòng:
1. Kiểm tra phiên bản Node.js và Python
2. Đảm bảo đã cài đặt đầy đủ dependencies
3. Kiểm tra port 3000 và 8000 có bị chiếm dụng không
4. Xem log lỗi trong terminal để debug

## 📄 License

Dự án này được phát triển cho mục đích học tập và demo.
