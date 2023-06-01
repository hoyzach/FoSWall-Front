import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Montserrat } from "@next/font/google"
import { Providers } from './providers';
import { ConnectButton } from '@rainbow-me/rainbowkit';

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
      <body className={montserrat.className}>
        <Providers>
          <nav className='grid md:grid-cols-3 grid-cols-1 items-center p-2 text-primary bg-black'>
              <div className='flex justify-center md:justify-start py-1'> 
                  <span className="font-bold text-xl">FoSWall</span>
              </div>
              <div className="flex justify-center text-sm text-primary underline">
                  <a href="/" className="mx-2 sm:mt-0 hover:text-white">Home</a>
                  <a href="wall" className="mx-2 sm:mt-0 hover:text-white">Wall</a>
                  <a href="create" className="mx-2 sm:mt-0 hover:text-white">Create</a>
              </div>
              <div className="flex justify-center md:justify-end py-1">
                  <ConnectButton />
              </div>
          </nav>
          <div className="bg-gradient-to-b from-black to-primary w-screen h-screen flex flex-col items-center justify-center">
          {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}