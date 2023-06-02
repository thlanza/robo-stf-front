import Link from 'next/link';

export default function Nav() {
    let linkStyles = "flex items-center text-lg gap-3 font-semibold text-zinc-200 border pb-2 pt-2 pl-10 pr-10 border-[#8E9897]"
    let homeStyle = "flex bg-white items-center text-lg gap-3 font-semibold text-black border pb-2 pt-2 pl-10 pr-10 border-zinc-700"

    return (
    <nav className='space-y-5 mt-1 flex flex-col items-center'>

        <Link href="/" className={homeStyle}>

        Home</Link>
        <Link href="/stf" className={linkStyles}>

          STF</Link>
        <a href="/stj" className={linkStyles}>
  
          STJ</a>
        <a href="/tjmg" className={linkStyles}>
      
          TJMG</a>
      </nav>
    )

}