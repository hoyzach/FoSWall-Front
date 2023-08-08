import './globals.css';
import { Montserrat } from "next/font/google"
import { Providers } from './providers';
import Footer from './footer';
import Header from './header';
import Subheader from './subheader';
import ScrollToTopButton from './scrollToTopButton.jsx';

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata = {
  title: {
    default: 'Freedom of Speech',
    template: '%s | Freedom of Speech',
  },
  description: "Create and rate on-chain NFTs",
}
// 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <Subheader/>
            <main className='flex flex-grow'>
              <div className="bg-primary bg-[url('/pattern3.png')] bg-cover bg-fixed w-full flex flex-col items-center justify-center py-10">
                {children}
              </div>
              <ScrollToTopButton />
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
