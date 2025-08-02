import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { UserType } from '@/types/user'
import { AuthButtons, SignoutButton, UserAvatar } from './user-comp'
import { MobileNavLinks } from './navlinks'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { db } from '@/lib/db'
import { subDays } from 'date-fns'

interface MobileMenuProps {
  user: UserType | null
}

const MobileMenu = async ({ user }: MobileMenuProps) => {

  const threeDaysAgo = subDays(new Date(), 3);

  const orders = await db.order.findMany({
    where: { 
      customerId: user?.id,
      createdAt: {
        gte: threeDaysAgo,
      }
    },
    select: { trackingNumber: true }
  })

  return (
    <Sheet>
      <SheetTrigger
        className='md:hidden'
        asChild
      >
        <Button
          variant='ghost'
          size='icon'
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side='left'
        className='flex flex-col w-full md:max-w-sm'
      >
        <SheetHeader>
          <SheetTitle className='text-primary text-xl'>
            {user ? 'โปรไฟล์ของคุณ' : 'ยินดีต้อนรับ'}
          </SheetTitle>
        </SheetHeader>

        <div className='flex-1 flex flex-col gap-6'>
          {/* User Profile && Auth Buttons */}
          {user ? <UserAvatar user={user} /> : <AuthButtons />}
          <div>
            <div className="marquee-container h-8 overflow-hidden">
              <div className="marquee-text  whitespace-nowrap animate-marquee text-sm px-2 leading-tight">
                 📦 ส่งของทุกวัน! สั่งก่อน 12.00 น. ได้ของไวชัวร์! ⏰🚚 ❤️ ขอบคุณลูกค้าทุกท่านที่ไว้ใจเรานะคะ 🙌 แล้วพบกันอีกน้าา~
              </div>
            </div>
          </div>

          <Separator/>
          
          <div className='px-4'>
            <ScrollArea className='h-48 sm:h-60 w-full'>
              {/* Nav Links */}
              <MobileNavLinks />

              {user && orders.length > 0 && (
                <div className='mt-2 px-4 text-sm text-muted-foreground'>
                  <span className='font-medium'>Tracking:</span>
                  <ul className='list-disc list-inside'>
                    {orders.map((o, i) => (
                      <li key={i}>{o.trackingNumber}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Go to admin page button */}
              {user && user.role === 'Admin' && (
                <div className='mt-2'>
                  <Separator className='mb-2' />
                  <Button
                    variant='secondary'
                    size='lg'
                    className='w-full'
                    asChild
                  >
                    <Link href='/admin'>หลังบ้าน</Link>
                  </Button>
                </div>
              )}
            </ScrollArea>


          </div>
        </div>

        {user && (
          <SheetFooter>
            <SignoutButton isMobile />
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
export default MobileMenu
