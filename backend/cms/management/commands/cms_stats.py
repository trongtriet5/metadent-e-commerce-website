from django.core.management.base import BaseCommand
from cms.models import PageImage
from products.models import Product


class Command(BaseCommand):
    help = 'Show CMS statistics'

    def handle(self, *args, **options):
        """Display statistics about CMS images and products"""
        
        self.stdout.write('\n📊 CMS STATISTICS\n' + '='*50)
        
        # Count Page Images by position
        self.stdout.write('\n📸 Page Images by Position:')
        positions = [
            'hero', 'tamnuoc_banner', 'banchaidien_banner', 
            'nuocsucmieng_banner', 'sanphamkhac_banner',
            'hero_section', 'story_section', 'ourteam_section'
        ]
        
        for position in positions:
            active_count = PageImage.objects.filter(position=position, is_active=True).count()
            total_count = PageImage.objects.filter(position=position).count()
            
            status = '✓' if active_count > 0 else '✗'
            self.stdout.write(
                f'  {status} {position:20s} - Active: {active_count}/{total_count}'
            )
        
        # Count Products
        products_count = Product.objects.count()
        products_with_images = Product.objects.exclude(image='').count()
        
        self.stdout.write(f'\n📦 Products:')
        self.stdout.write(f'  Total: {products_count}')
        self.stdout.write(f'  With images: {products_with_images}')
        
        self.stdout.write('\n' + '='*50 + '\n')

