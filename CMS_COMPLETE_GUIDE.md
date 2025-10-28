# 🎯 CMS Complete Guide - Metadent E-Commerce

## 📋 Tổng quan

Website Metadent có **CMS hoàn chỉnh** để quản lý tất cả nội dung và hình ảnh qua Django Admin.

---

## 🚀 Truy cập CMS

**URL Admin:** http://localhost:8000/admin
- **Username:** `admin`
- **Password:** `admin123`

---

## 📍 Quản lý CMS

### **1. Cài đặt trang web (Site Settings)**

Quản lý tất cả thông tin văn bản, cấu hình website.

**Vào:** CMS → Cài đặt trang web

**Các nhóm settings:**

#### **Company Information** (`company`)
- `company_name` - Tên công ty
- `company_description` - Mô tả công ty
- `company_address` - Địa chỉ
- `logo_url` - URL logo

#### **Contact Information** (`contact`)
- `contact_phone` - Số điện thoại
- `contact_email` - Email
- `contact_hotline` - Hotline
- `working_hours` - Giờ làm việc

#### **Social Media** (`social`)
- `facebook_url` - Facebook
- `tiktok_url` - TikTok
- `instagram_url` - Instagram
- `youtube_url` - YouTube

#### **Hero Section** (`other`)
- `hero_title` - Tiêu đề hero
- `hero_subtitle` - Phụ đề hero
- `hero_description` - Mô tả hero

#### **Categories** (`other`)
- `category_1/2/3/4_name` - Tên danh mục
- `category_1/2/3/4_description` - Mô tả danh mục

#### **About Page** (`other`)
- `about_hero_title` - Tiêu đề hero About
- `about_hero_subtitle` - Phụ đề hero About
- `about_mission_title/content` - Sứ mệnh
- `about_story_title/content` - Câu chuyện
- `about_team_title/subtitle` - Đội ngũ
- `about_team_member_1/2/3_name/role/bio` - Thông tin 3 lãnh đạo

---

### **2. Hình ảnh trang (Page Images)**

Quản lý tất cả hình ảnh trên website.

**Vào:** CMS → Hình ảnh trang

**Các vị trí (Positions):**

#### **Trang chủ (Homepage)**
- `hero` - Hero slider (có thể nhiều ảnh)
- `tamnuoc_banner` - Banner Máy tăm nước
- `banchaidien_banner` - Banner Bàn chải điện
- `nuocsucmieng_banner` - Banner Nước súc miệng
- `sanphamkhac_banner` - Banner Sản phẩm khác

#### **Trang giới thiệu (About Page)**
- `hero_section` - Hình ảnh Mission Section
- `story_section` - Hình ảnh Story Section
- `ourteam_section` - Hình ảnh 3 lãnh đạo (thêm 3 ảnh)

---

## 🎨 Cách sử dụng

### **Thêm/Sửa Site Settings:**

1. Vào **CMS** → **Cài đặt trang web**
2. Tìm hoặc tạo setting cần thiết
3. Sửa **Value**
4. Click **Save**
5. Refresh website để xem thay đổi

### **Thêm hình ảnh:**

**Option 1 - Chọn từ sản phẩm (Khuyên dùng):**
1. Vào **CMS** → **Hình ảnh trang**
2. Add/Edit Page Image
3. Chọn **Position** tương ứng
4. Dropdown "Chọn từ sản phẩm" → Chọn sản phẩm
5. Hình ảnh sẽ được copy tự động
6. Click **Save**

**Option 2 - Upload mới:**
1. Vào **CMS** → **Hình ảnh trang**
2. Add/Edit Page Image
3. Chọn **Position** tương ứng
4. Upload file mới
5. Click **Save**

---

## 📝 Seed Data

Reset/Update dữ liệu mẫu:

```bash
cd backend
python manage.py seed_cms_data
```

Sẽ tạo/tự động cập nhật tất cả settings với dữ liệu mặc định.

---

## 🎯 Mapping Positions

| Position | Hiển thị tại | Mô tả |
|----------|--------------|-------|
| `hero` | Homepage Hero Section | Slider ở đầu trang chủ |
| `tamnuoc_banner` | Homepage Category 1 | Banner Máy tăm nước |
| `banchaidien_banner` | Homepage Category 2 | Banner Bàn chải điện |
| `nuocsucmieng_banner` | Homepage Category 3 | Banner Nước súc miệng |
| `sanphamkhac_banner` | Homepage Category 4 | Banner Sản phẩm khác |
| `hero_section` | About Page - Mission Section | Hình ảnh sứ mệnh |
| `story_section` | About Page - Story Section | Hình ảnh câu chuyện |
| `ourteam_section` | About Page - Team Section | 3 ảnh lãnh đạo |

---

## ✅ Các tính năng đã tích hợp

### **Frontend Components:**
- ✅ Header - Logo, company name (từ CMS)
- ✅ Footer - Company info, contact, social (từ CMS)
- ✅ Homepage - Hero slider, content (từ CMS)
- ✅ About Page - Mission, Story, Team (từ CMS)
- ✅ Categories - 4 banners (từ CMS)

### **Backend Models:**
- ✅ PageImage - Quản lý hình ảnh theo vị trí
- ✅ SiteSetting - Quản lý cài đặt (key-value)

### **CMS Features:**
- ✅ Dynamic content - Tất cả text có thể chỉnh sửa
- ✅ Dynamic images - Tất cả hình ảnh có thể thay thế
- ✅ Admin interface - Django Admin dễ dàng
- ✅ No coding required - Không cần code

---

## 🎉 Tổng kết

**Website có CMS hoàn chỉnh!**

- ✅ Tất cả nội dung quản lý qua Django Admin
- ✅ Không cần code để thay đổi nội dung
- ✅ Support multi-language (Vietnamese)
- ✅ SEO friendly settings
- ✅ Social media integration

**CMS sẵn sàng sử dụng!** 🚀

