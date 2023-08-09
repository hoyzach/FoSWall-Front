import './globals.css';
import { Montserrat } from "next/font/google"
import { Providers } from './providers';
import Footer from './footer';
import Header from './header';
import Subheader from './subheader';
import ScrollToTopButton from './scrollToTopButton.jsx';
import { Toaster } from 'react-hot-toast';

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
          <div>
            <Toaster
              toastOptions={{
                className: '',
                style: {
                  border: '4px solid #ffffff',
                  padding: '25px',
                  color: '#00CED1',
                  background: '#1F2937',
                },
              }} containerStyle={{
                top: 130,
              }}
            />
          </div>
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
