import './globals.css'
import { Montserrat } from 'next/font/google'
import Nav from '@/components/nav'
import Footer from '@/components/footer'


export const metadata = {
  title: 'Data Jus',
  description: 'Busca de Processos',
}

const montserrat = Montserrat({ subsets: ['latin']});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={`h-screen flex flex-col ${montserrat.className}`}>
  <div className="flex flex-1">
    <aside className="w-44 bg-[#2C4A52] p-6">
    <Nav />
    </aside>
    <div className='mx-auto flex flex-col w-[100%] bg-[#D3DDE1]'>
      <div className='flex flex-col bg-[#021C1E] w-[100%] justify-center items-center'>
      <h1 className='font-bold text-3xl mt-5 text-white'>Data Jus</h1>
      <h2 className='text-xl text-[#F4EBDB] mb-3'>Busca de Processos</h2>
      </div>
      <div className='border border-[#335252] w-[100%]'></div>
      <main className="flex mt-5 items-center flex-col mx-auto bg-[#D3DDE1] w-[100%] h-[calc(100%-2rem]">{children}</main>
    </div>

  </div>
  <Footer />
</body>
</html>
  )
}
