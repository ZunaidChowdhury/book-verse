import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";

import Navbar from "@/components/sections/NavBar";
import Footer from '@/components/sections/Footer';
import StoreProvider from '@/redux/store';
import ThemeProvider from '@/providers/ThemeProvider';
import { AuthInitializer } from '@/components/providers/AuthInitializer';


// UI-[font-sans], heading[font-serif]
// Heading
export const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bookverse-serif', // CSS Variable name
});


// UI
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bookverse-sans', // CSS Variable name
});

export const metadata = {
  title: "BookVerse",
  description: "Ebook Sharing Platform",
  icons: {
    icon: '/book-verse-logo.png',
  },
};

export default function RootLayout({ children }) {

  return (
    <html
      lang="en"
      className={`${lora.variable} ${plusJakarta.variable} font-sans h-full antialiased dark`}
    >
      <body className="bg-background font-sans text-text-primary min-h-full flex flex-col ">
        <StoreProvider>
          <AuthInitializer>
            <ThemeProvider>

              <Navbar />
              <main className="flex-1 flex flex-col">
                {children}
              </main>
              <Footer />
              <ToastContainer
                position="top-center"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
              />
            </ThemeProvider>
          </AuthInitializer>
        </StoreProvider>
      </body>
    </html>
  );
}


