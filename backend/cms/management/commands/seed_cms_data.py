"""
Management command to seed CMS data with default settings for the website
"""
from django.core.management.base import BaseCommand
from cms.models import SiteSetting


class Command(BaseCommand):
    help = 'Seeds the database with default CMS settings'

    def handle(self, *args, **options):
        self.stdout.write('Seeding CMS data...')

        # Company Information
        company_settings = [
            {
                'key': 'company_name',
                'value': 'Metadent - Chuyên gia răng miệng',
                'description': 'Tên công ty',
                'category': 'company'
            },
            {
                'key': 'company_description',
                'value': 'Chuyên cung cấp các sản phẩm chăm sóc răng miệng chất lượng cao, giúp bạn có nụ cười khỏe đẹp và tự tin.',
                'description': 'Mô tả công ty',
                'category': 'company'
            },
            {
                'key': 'company_address',
                'value': '19V Nguyễn Hữu Cảnh, Phường 19, Quận Bình Thạnh, TP.HCM',
                'description': 'Địa chỉ công ty',
                'category': 'company'
            },
            {
                'key': 'logo_url',
                'value': 'http://localhost:8000/media/logo.jpg',
                'description': 'URL logo công ty',
                'category': 'company'
            },
        ]

        # Contact Information
        contact_settings = [
            {
                'key': 'contact_phone',
                'value': '(+84) 866 940 279',
                'description': 'Số điện thoại liên hệ',
                'category': 'contact'
            },
            {
                'key': 'contact_email',
                'value': 'chuyengiarangmieng@gmail.com',
                'description': 'Email liên hệ',
                'category': 'contact'
            },
            {
                'key': 'contact_hotline',
                'value': '19001234',
                'description': 'Hotline',
                'category': 'contact'
            },
            {
                'key': 'working_hours',
                'value': '8:00 - 18:00 (T2 - CN)',
                'description': 'Giờ làm việc',
                'category': 'contact'
            },
        ]

        # Social Media
        social_settings = [
            {
                'key': 'facebook_url',
                'value': 'https://www.facebook.com/chuyengiarangmiengcom',
                'description': 'Link Facebook',
                'category': 'social'
            },
            {
                'key': 'tiktok_url',
                'value': 'https://www.tiktok.com/@chuyengiarangnieng',
                'description': 'Link TikTok',
                'category': 'social'
            },
            {
                'key': 'instagram_url',
                'value': '',
                'description': 'Link Instagram',
                'category': 'social'
            },
            {
                'key': 'youtube_url',
                'value': '',
                'description': 'Link YouTube',
                'category': 'social'
            },
        ]

        # Homepage Hero Section
        hero_settings = [
            {
                'key': 'hero_title',
                'value': 'Chuyên gia răng miệng',
                'description': 'Tiêu đề hero section',
                'category': 'other'
            },
            {
                'key': 'hero_subtitle',
                'value': 'Giải pháp chăm sóc răng miệng toàn diện',
                'description': 'Phụ đề hero section',
                'category': 'other'
            },
            {
                'key': 'hero_description',
                'value': 'Khám phá bộ sưu tập sản phẩm chăm sóc răng miệng chất lượng cao, giúp bạn có nụ cười khỏe đẹp và tự tin.',
                'description': 'Mô tả hero section',
                'category': 'other'
            },
        ]

        # About Page Information
        about_settings = [
            {
                'key': 'about_hero_title',
                'value': 'Về chúng tôi',
                'description': 'Tiêu đề hero section trang About',
                'category': 'other'
            },
            {
                'key': 'about_hero_subtitle',
                'value': 'Chuyên gia răng miệng - Đồng hành cùng bạn trên hành trình chăm sóc sức khỏe răng miệng',
                'description': 'Phụ đề hero section trang About',
                'category': 'other'
            },
            {
                'key': 'about_mission_title',
                'value': 'Sứ mệnh của chúng tôi',
                'description': 'Tiêu đề phần sứ mệnh',
                'category': 'other'
            },
            {
                'key': 'about_mission_content',
                'value': 'Tại Chuyên gia răng miệng, chúng tôi tin rằng một nụ cười khỏe đẹp là nền tảng của sự tự tin và hạnh phúc. Sứ mệnh của chúng tôi là mang đến những sản phẩm chăm sóc răng miệng chất lượng cao, giúp mọi người có thể chăm sóc sức khỏe răng miệng một cách hiệu quả và dễ dàng.\n\nChúng tôi cam kết cung cấp những sản phẩm được chọn lọc kỹ càng từ các thương hiệu uy tín, đảm bảo chất lượng và an toàn cho người sử dụng.',
                'description': 'Nội dung phần sứ mệnh',
                'category': 'other'
            },
            {
                'key': 'about_story_title',
                'value': 'Câu chuyện của chúng tôi',
                'description': 'Tiêu đề phần câu chuyện',
                'category': 'other'
            },
            {
                'key': 'about_story_content',
                'value': 'Chuyên gia răng miệng được thành lập với niềm tin rằng mọi người đều xứng đáng có được những sản phẩm chăm sóc răng miệng tốt nhất. Từ những ngày đầu, chúng tôi đã tập trung vào việc tìm kiếm và cung cấp những sản phẩm chất lượng cao từ các thương hiệu hàng đầu thế giới.\n\nQua nhiều năm phát triển, chúng tôi đã xây dựng được mối quan hệ đối tác bền vững với các nhà sản xuất uy tín, đảm bảo mang đến cho khách hàng những sản phẩm chính hãng với giá cả hợp lý.\n\nHôm nay, chúng tôi tự hào là địa chỉ tin cậy của hàng nghìn khách hàng trong việc chăm sóc sức khỏe răng miệng.',
                'description': 'Nội dung phần câu chuyện',
                'category': 'other'
            },
            {
                'key': 'about_team_title',
                'value': 'Đội ngũ của chúng tôi',
                'description': 'Tiêu đề phần đội ngũ',
                'category': 'other'
            },
            {
                'key': 'about_team_subtitle',
                'value': 'Những con người tận tâm đằng sau thành công của Chuyên gia răng miệng',
                'description': 'Phụ đề phần đội ngũ',
                'category': 'other'
            },
            {
                'key': 'about_team_member_1_name',
                'value': 'Nguyễn Văn A',
                'description': 'Tên thành viên đội ngũ 1',
                'category': 'other'
            },
            {
                'key': 'about_team_member_1_role',
                'value': 'Giám đốc điều hành',
                'description': 'Vai trò thành viên đội ngũ 1',
                'category': 'other'
            },
            {
                'key': 'about_team_member_1_bio',
                'value': 'Với hơn 10 năm kinh nghiệm trong ngành chăm sóc sức khỏe, anh A dẫn dắt đội ngũ với tầm nhìn chiến lược và sự tận tâm.',
                'description': 'Tiểu sử thành viên đội ngũ 1',
                'category': 'other'
            },
            {
                'key': 'about_team_member_2_name',
                'value': 'Trần Thị B',
                'description': 'Tên thành viên đội ngũ 2',
                'category': 'other'
            },
            {
                'key': 'about_team_member_2_role',
                'value': 'Trưởng phòng sản phẩm',
                'description': 'Vai trò thành viên đội ngũ 2',
                'category': 'other'
            },
            {
                'key': 'about_team_member_2_bio',
                'value': 'Chị B chịu trách nhiệm nghiên cứu và lựa chọn những sản phẩm chất lượng nhất để phục vụ khách hàng.',
                'description': 'Tiểu sử thành viên đội ngũ 2',
                'category': 'other'
            },
            {
                'key': 'about_team_member_3_name',
                'value': 'Lê Văn C',
                'description': 'Tên thành viên đội ngũ 3',
                'category': 'other'
            },
            {
                'key': 'about_team_member_3_role',
                'value': 'Trưởng phòng chăm sóc khách hàng',
                'description': 'Vai trò thành viên đội ngũ 3',
                'category': 'other'
            },
            {
                'key': 'about_team_member_3_bio',
                'value': 'Anh C đảm bảo mọi khách hàng đều nhận được sự hỗ trợ tận tình và chuyên nghiệp nhất.',
                'description': 'Tiểu sử thành viên đội ngũ 3',
                'category': 'other'
            },
        ]

        # Category Information
        category_settings = [
            {
                'key': 'category_1_name',
                'value': 'Máy tăm nước',
                'description': 'Tên danh mục 1',
                'category': 'other'
            },
            {
                'key': 'category_1_description',
                'value': 'Làm sạch kẽ răng hiệu quả',
                'description': 'Mô tả danh mục 1',
                'category': 'other'
            },
            {
                'key': 'category_2_name',
                'value': 'Bàn chải điện',
                'description': 'Tên danh mục 2',
                'category': 'other'
            },
            {
                'key': 'category_2_description',
                'value': 'Làm sạch răng chuyên nghiệp',
                'description': 'Mô tả danh mục 2',
                'category': 'other'
            },
            {
                'key': 'category_3_name',
                'value': 'Nước súc miệng',
                'description': 'Tên danh mục 3',
                'category': 'other'
            },
            {
                'key': 'category_3_description',
                'value': 'Bảo vệ răng miệng toàn diện',
                'description': 'Mô tả danh mục 3',
                'category': 'other'
            },
            {
                'key': 'category_4_name',
                'value': 'Sản phẩm khác',
                'description': 'Tên danh mục 4',
                'category': 'other'
            },
            {
                'key': 'category_4_description',
                'value': 'Khám phá thêm các sản phẩm khác',
                'description': 'Mô tả danh mục 4',
                'category': 'other'
            },
        ]

        all_settings = (
            company_settings + 
            contact_settings + 
            social_settings + 
            hero_settings + 
            category_settings +
            about_settings
        )

        created_count = 0
        updated_count = 0

        for setting_data in all_settings:
            setting, created = SiteSetting.objects.update_or_create(
                key=setting_data['key'],
                defaults={
                    'value': setting_data['value'],
                    'description': setting_data['description'],
                    'category': setting_data['category'],
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Created: {setting_data["key"]}')
                )
            else:
                updated_count += 1
                self.stdout.write(
                    self.style.WARNING(f'↻ Updated: {setting_data["key"]}')
                )

        self.stdout.write(self.style.SUCCESS(
            f'\n✓ Successfully seeded CMS data: '
            f'{created_count} created, {updated_count} updated'
        ))

