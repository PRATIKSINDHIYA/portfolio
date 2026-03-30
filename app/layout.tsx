import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import LenisProvider from '@/components/LenisProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Pratik Sindhiya | Full Stack Developer',
  description: 'Full Stack Developer specializing in React.js, Node.js, and modern web applications. Currently pursuing B.Tech at IIIT Vadodara.',
  keywords: ['Full Stack Developer', 'React.js', 'Node.js', 'Web Developer', 'Pratik Sindhiya', 'IIIT Vadodara'],
  authors: [{ name: 'Pratik Sindhiya' }],
  openGraph: {
    title: 'Pratik Sindhiya | Full Stack Developer',
    description: 'Full Stack Developer specializing in React.js, Node.js, and modern web applications.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground no-scrollbar antialiased m-0 p-0 overflow-x-hidden min-h-screen flex flex-col`}>
        <LenisProvider>
          <Navigation />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
