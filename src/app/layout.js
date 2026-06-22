import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";

import Navbar from "@/components/sections/NavBar";
import Footer from '@/components/sections/Footer';
import StoreProvider from '@/redux/store';
import ThemeProvider from '@/providers/ThemeProvider';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="bg-background min-h-full flex flex-col text-foreground">
        <StoreProvider>
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
        </StoreProvider>
      </body>
    </html>
  );
}


