import './globals.css';
import { Montserrat } from "@next/font/google"
import { Providers } from './providers';
import Footer from './footer';
import Header from './header';
import Subheader from './subheader';
import ScrollToTopButton from '../utils/scrollToTopButton';

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${montserrat.className}`}>
        <Providers>
          <Header />
          <Subheader/>
          <main>
            <div className="bg-primary bg-[url('/pattern3.png')] bg-cover bg-fixed w-full min-h-screen flex flex-1 flex-col items-center justify-center py-10">
              {children}
              <ScrollToTopButton />
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
