import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chuyên gia răng miệng - Giải pháp chăm sóc răng miệng toàn diện',
  description: 'Chuyên cung cấp các sản phẩm chăm sóc răng miệng chất lượng cao: máy tăm nước, bàn chải điện, nước súc miệng.',
  keywords: 'chăm sóc răng miệng, máy tăm nước, bàn chải điện, nước súc miệng, dental care',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={montserrat.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}