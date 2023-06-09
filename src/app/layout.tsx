import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body>
        <Navbar />
        <div className='container mx-auto mt-12'>
          <div className='row'>
            <div className='col-12'>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}


export function Navbar() {
  return (
    <div className="w-full bg-gray-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-semibold px-4 text-gray-100">
              Home
            </Link>

            <Link href="/boards" className="text-lg font-semibold px-4 text-gray-100">
              Boards
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}