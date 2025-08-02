import { SheetClose } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Home, Info } from 'lucide-react'
import { JSX } from 'react'

const NAV_LINKS = [
  { title: 'หน้าหลัก', href: '/' },
  // { title: 'สินค้าทั้งหมด', href: '/products' },
  // { title: 'เกี่ยวกับ', href: '/about' },
  { title: 'ติดต่อเรา', href: '/contact' },
]

const iconMap: { [key: string]: JSX.Element } = {
  '/': <Home size={18}/>,
  '/contact': <Info size={18}/>
}

export const MobileNavLinks = () => (
  <div className='flex flex-col gap-2 px-4'>
    {NAV_LINKS.map((link, index) => (
      <SheetClose
        key={index}
        asChild
      >
        <Button
          variant='secondary'
          size='lg'
          className='justify-start gap-3 text-base text-gray-800 hover:bg-gray-100 transition rounded-lg'
          asChild
        >
          <Link href={link.href}>{iconMap[link.href]}{link.title}</Link>
        </Button>
      </SheetClose>
    ))}
  </div>
)

export const DesktopNavLinks = () => (
  <div className='flex items-center gap-1 p-1'>
    {NAV_LINKS.map((link, index) => (
      <Button
        key={index}
        variant='ghost'
        size='sm'
        asChild
      >
        <Link href={link.href}>{link.title}</Link>
      </Button>
    ))}
  </div>
)
