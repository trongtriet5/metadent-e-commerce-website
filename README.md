# 🦷 Metadent - E-Commerce Website

Django + Next.js e-commerce website với CMS hoàn chỉnh.

## ✨ Tính năng

- 🛒 **E-Commerce đầy đủ** - Sản phẩm, giỏ hàng, đơn hàng
- 🎨 **CMS** - Quản lý nội dung và hình ảnh qua Django Admin
- 📸 **Dynamic Images** - Tất cả hình ảnh có thể thay thế
- 📝 **Dynamic Content** - Tất cả text có thể chỉnh sửa
- 🔐 **Django Admin** - Quản lý tất cả thông tin
- 💨 **Fast & Modern** - Next.js 15, TailwindCSS 4

## 🚀 Quick Start

### Backend (Django)

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Migrate database
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Seed CMS data
python manage.py seed_cms_data

# Run server
python manage.py runserver
```

**Access:** http://localhost:8000/admin (admin / admin123)

### Frontend (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

**Access:** http://localhost:3000

## 📁 Cấu trúc Project

```
metadent-e-commerce-website/
├── backend/              # Django Backend
│   ├── cms/             # CMS App
│   ├── products/        # Products App
│   ├── cart/            # Cart & Orders App
│   └── accounts/        # Authentication App
├── frontend/            # Next.js Frontend
│   ├── src/
│   │   ├── app/         # Pages
│   │   ├── components/  # React Components
│   │   └── lib/         # API & Utils
│   └── public/          # Static files
└── CMS_COMPLETE_GUIDE.md # CMS Documentation
```

## 🎯 Quản lý CMS

Xem chi tiết: [CMS_COMPLETE_GUIDE.md](./CMS_COMPLETE_GUIDE.md)

### Site Settings
- Company information
- Contact information
- Social media links
- Hero section content
- Category information
- About page content

### Page Images
- Hero slider (homepage)
- Category banners (4 banners)
- About page images (mission, story, team)

## 🛠️ Tech Stack

**Backend:**
- Django 4.2
- Django REST Framework
- SQLite (development)

**Frontend:**
- Next.js 15
- React 19
- TypeScript
- TailwindCSS 4
- Zustand (State management)

## 📝 API Endpoints

### Products
- `GET /api/products/` - List products
- `POST /api/products/` - Create product
- `GET /api/products/{id}/` - Get product
- `PUT /api/products/{id}/` - Update product
- `DELETE /api/products/{id}/` - Delete product

### Cart & Orders
- `POST /api/cart/order/` - Create order
- `GET /api/cart/orders/` - List orders
- `GET /api/cart/orders/{id}/` - Get order

### CMS
- `GET /api/cms/page-images/` - List page images
- `GET /api/cms/settings/` - List settings

## 🎨 CMS Management

Tất cả nội dung website có thể quản lý qua Django Admin:

1. **Products** - Sản phẩm
2. **Orders** - Đơn hàng
3. **Page Images** - Hình ảnh
4. **Site Settings** - Cài đặt

Xem [CMS_COMPLETE_GUIDE.md](./CMS_COMPLETE_GUIDE.md) để biết cách sử dụng.

## 📧 Support

For questions or issues, please contact the development team.

---

**Metadent E-Commerce** - Powered by Django & Next.js
