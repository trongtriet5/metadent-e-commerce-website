# Hướng dẫn kết nối Supabase với Django

## Bước 1: Tạo project Supabase

1. Truy cập [Supabase](https://supabase.com/)
2. Đăng ký/đăng nhập tài khoản
3. Tạo project mới
4. Chọn region gần nhất (Singapore cho Việt Nam)

## Bước 2: Lấy thông tin kết nối

1. Vào **Settings** > **Database**
2. Copy **Connection string** (URI)
3. Vào **Settings** > **API**
4. Copy **Project URL** và **API Keys**

## Bước 3: Cấu hình Django

### Tạo file `.env` trong thư mục `backend/`:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com,localhost,127.0.0.1

# Supabase Database
DATABASE_URL=postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres

# Supabase Settings
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Cập nhật settings.py:

```python
# Database configuration
DATABASE_URL = config('DATABASE_URL', default='sqlite:///db.sqlite3')

if DATABASE_URL.startswith('sqlite'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    DATABASES = {
        'default': dj_database_url.parse(DATABASE_URL)
    }
```

## Bước 4: Chạy migrations

```bash
# Tạo migrations
python manage.py makemigrations

# Chạy migrations
python manage.py migrate

# Tạo superuser
python manage.py createsuperuser

# Load demo data
python manage.py loaddata fixtures/demo_products.json
```

## Bước 5: Cấu hình Supabase Storage (cho media files)

1. Vào **Storage** trong Supabase dashboard
2. Tạo bucket tên `media`
3. Cấu hình public access nếu cần

### Cập nhật settings.py cho media files:

```python
# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Supabase Storage (optional)
SUPABASE_URL = config('SUPABASE_URL', default='')
SUPABASE_ANON_KEY = config('SUPABASE_ANON_KEY', default='')
```

## Bước 6: Deploy

### Vercel/Netlify:
- Cấu hình environment variables
- Deploy Django backend
- Deploy Next.js frontend

### Railway/Render:
- Connect GitHub repository
- Cấu hình environment variables
- Auto-deploy

## Lưu ý bảo mật

1. **Không commit file `.env`** vào git
2. **Sử dụng environment variables** trong production
3. **Giới hạn CORS origins** cho production
4. **Sử dụng HTTPS** cho production
5. **Backup database** định kỳ

## Troubleshooting

### Lỗi kết nối database:
- Kiểm tra connection string
- Kiểm tra firewall settings
- Kiểm tra credentials

### Lỗi CORS:
- Cập nhật `CORS_ALLOWED_ORIGINS`
- Kiểm tra domain frontend

### Lỗi media files:
- Cấu hình static files
- Kiểm tra MEDIA_URL và MEDIA_ROOT
