'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Award, Users, Target } from 'lucide-react';
import { cmsApi, getImageUrl, PageImage } from '@/lib/cms';

export default function AboutPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [pageImages, setPageImages] = useState<PageImage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsMap, images] = await Promise.all([
          cmsApi.getAllSiteSettingsMap(),
          cmsApi.getPageImages()
        ]);
        setSettings(settingsMap);
        setPageImages(images);
      } catch (error) {
        console.error('Error fetching CMS data:', error);
      }
    };

    fetchData();
  }, []);

  // Get images for About page sections
  const heroImage = pageImages.find(img => img.position === 'hero_section' && img.is_active);
  const storyImage = pageImages.find(img => img.position === 'story_section' && img.is_active);
  const teamImages = pageImages.filter(img => img.position === 'ourteam_section' && img.is_active).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0077B6] to-[#005a8b] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {settings.about_hero_title || 'Về chúng tôi'}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              {settings.about_hero_subtitle || 'Chuyên gia răng miệng - Đồng hành cùng bạn trên hành trình chăm sóc sức khỏe răng miệng'}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section with Hero Image */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {settings.about_mission_title || 'Sứ mệnh của chúng tôi'}
              </h2>
              {settings.about_mission_content?.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-600 mb-6">
                  {paragraph}
                </p>
              )) || (
                <>
                  <p className="text-lg text-gray-600 mb-6">
                    Tại Chuyên gia răng miệng, chúng tôi tin rằng một nụ cười khỏe đẹp là nền tảng 
                    của sự tự tin và hạnh phúc. Sứ mệnh của chúng tôi là mang đến những sản phẩm 
                    chăm sóc răng miệng chất lượng cao, giúp mọi người có thể chăm sóc sức khỏe 
                    răng miệng một cách hiệu quả và dễ dàng.
                  </p>
                  <p className="text-lg text-gray-600">
                    Chúng tôi cam kết cung cấp những sản phẩm được chọn lọc kỹ càng từ các thương hiệu 
                    uy tín, đảm bảo chất lượng và an toàn cho người sử dụng.
                  </p>
                </>
              )}
            </div>
            <div className="relative">
              <div className="aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden">
                {heroImage?.image ? (
                  <Image
                    src={getImageUrl(heroImage.image)}
                    alt={heroImage.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                    unoptimized
                  />
                ) : (
                  <Image
                    src="http://localhost:8000/media/logo.jpg"
                    alt="Sứ mệnh của chúng tôi"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những giá trị định hướng mọi hoạt động và quyết định của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#0077B6] rounded-full flex items-center justify-center mx-auto">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Chăm sóc tận tâm</h3>
              <p className="text-gray-600">
                Chúng tôi luôn đặt sức khỏe và hạnh phúc của khách hàng lên hàng đầu
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#0077B6] rounded-full flex items-center justify-center mx-auto">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Chất lượng cao</h3>
              <p className="text-gray-600">
                Chỉ cung cấp những sản phẩm chất lượng tốt nhất từ các thương hiệu uy tín
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#0077B6] rounded-full flex items-center justify-center mx-auto">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Phục vụ chuyên nghiệp</h3>
              <p className="text-gray-600">
                Đội ngũ nhân viên được đào tạo chuyên nghiệp, sẵn sàng hỗ trợ khách hàng
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#0077B6] rounded-full flex items-center justify-center mx-auto">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Đổi mới liên tục</h3>
              <p className="text-gray-600">
                Luôn cập nhật và mang đến những sản phẩm công nghệ tiên tiến nhất
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden">
                {storyImage?.image ? (
                  <Image
                    src={getImageUrl(storyImage.image)}
                    alt={storyImage.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                    unoptimized
                  />
                ) : (
                  <Image
                    src="http://localhost:8000/media/logo.jpg"
                    alt="Câu chuyện của chúng tôi"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {settings.about_story_title || 'Câu chuyện của chúng tôi'}
              </h2>
              {settings.about_story_content?.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-600 mb-6">
                  {paragraph}
                </p>
              )) || (
                <>
                  <p className="text-lg text-gray-600 mb-6">
                    Chuyên gia răng miệng được thành lập với niềm tin rằng mọi người đều xứng đáng 
                    có được những sản phẩm chăm sóc răng miệng tốt nhất. Từ những ngày đầu, chúng tôi 
                    đã tập trung vào việc tìm kiếm và cung cấp những sản phẩm chất lượng cao từ các 
                    thương hiệu hàng đầu thế giới.
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    Qua nhiều năm phát triển, chúng tôi đã xây dựng được mối quan hệ đối tác bền vững 
                    với các nhà sản xuất uy tín, đảm bảo mang đến cho khách hàng những sản phẩm chính hãng 
                    với giá cả hợp lý.
                  </p>
                  <p className="text-lg text-gray-600">
                    Hôm nay, chúng tôi tự hào là địa chỉ tin cậy của hàng nghìn khách hàng trong việc 
                    chăm sóc sức khỏe răng miệng.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {settings.about_team_title || 'Đội ngũ của chúng tôi'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {settings.about_team_subtitle || 'Những con người tận tâm đằng sau thành công của Chuyên gia răng miệng'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto relative overflow-hidden">
                {teamImages[0]?.image && (
                  <Image
                    src={getImageUrl(teamImages[0].image)}
                    alt={settings.about_team_member_1_name || 'Member 1'}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{settings.about_team_member_1_name || 'Nguyễn Văn A'}</h3>
              <p className="text-[#0077B6] font-medium">{settings.about_team_member_1_role || 'Giám đốc điều hành'}</p>
              <p className="text-gray-600 text-sm">
                {settings.about_team_member_1_bio || 'Với hơn 10 năm kinh nghiệm trong ngành chăm sóc sức khỏe, anh A dẫn dắt đội ngũ với tầm nhìn chiến lược và sự tận tâm.'}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto relative overflow-hidden">
                {teamImages[1]?.image && (
                  <Image
                    src={getImageUrl(teamImages[1].image)}
                    alt={settings.about_team_member_2_name || 'Member 2'}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{settings.about_team_member_2_name || 'Trần Thị B'}</h3>
              <p className="text-[#0077B6] font-medium">{settings.about_team_member_2_role || 'Trưởng phòng sản phẩm'}</p>
              <p className="text-gray-600 text-sm">
                {settings.about_team_member_2_bio || 'Chị B chịu trách nhiệm nghiên cứu và lựa chọn những sản phẩm chất lượng nhất để phục vụ khách hàng.'}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto relative overflow-hidden">
                {teamImages[2]?.image && (
                  <Image
                    src={getImageUrl(teamImages[2].image)}
                    alt={settings.about_team_member_3_name || 'Member 3'}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{settings.about_team_member_3_name || 'Lê Văn C'}</h3>
              <p className="text-[#0077B6] font-medium">{settings.about_team_member_3_role || 'Trưởng phòng chăm sóc khách hàng'}</p>
              <p className="text-gray-600 text-sm">
                {settings.about_team_member_3_bio || 'Anh C đảm bảo mọi khách hàng đều nhận được sự hỗ trợ tận tình và chuyên nghiệp nhất.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0077B6] to-[#005a8b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Hãy bắt đầu hành trình chăm sóc răng miệng cùng chúng tôi
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Khám phá bộ sưu tập sản phẩm chất lượng cao và tìm ra giải pháp 
            phù hợp nhất cho nhu cầu của bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-[#0077B6] px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Khám phá sản phẩm
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-[#0077B6] transition-colors duration-200"
            >
              Liên hệ với chúng tôi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
