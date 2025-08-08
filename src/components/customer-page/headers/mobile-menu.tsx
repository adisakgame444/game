import { Button } from '@/components/ui/button'
import { LogIn, Menu, MessageCircleHeartIcon, User2 } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
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
    select: { 
      trackingNumber: true,
      paymentImage: true 
    }
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
         <div className="inline-flex items-center bg-primary px-3 py-1.5 rounded-full shadow-sm max-w-max">
            <SheetTitle className="flex items-center gap-2 text-sm font-medium tracking-wide">
              {user ? (
                <>
                  <User2 className="w-4 h-4 bg-gray-600 text-white/80 rounded-full" strokeWidth={2} />
                  <span className='text-white'>โปรไฟล์ของคุณ</span>
                </>
                ) : (
                <>
                  <LogIn className="w-4 h-4 text-white rounded" strokeWidth={2} />
                  <span className='text-white'>ยินดีต้อนรับ</span>
                </>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>




        <div className='flex-1 flex flex-col gap-3 overflow-y-auto max-h-full [@media(min-width:414px)]:gap-4'>
          {/* User Profile && Auth Buttons */}
          {user ? <UserAvatar user={user} /> : <AuthButtons />}

          {user && (
            <div className="flex gap-0.5 px-3">
              <div className='inline-flex items-center bg-blue-600 rounded text-xs px-2 py-0'>
                <span className='text-sm text-white'>Message</span>
                <MessageCircleHeartIcon size={14} className="ml-1 text-green-400"/>
              </div>
              <div className="marquee-containerspy-2 overflow-hidden">
                <div className="marquee-texts inline-block whitespace-nowrap animate-marquee text-sm">
                  📦 ส่งของทุกวัน! สั่งก่อน 12.00 น. ได้ของไวชัวร์! ⏰🚚 ❤️ ขอบคุณลูกค้าทุกท่านที่ไว้ใจเรานะคะ 🙌 แล้วพบกันอีกน้าา~ 
                </div>
              </div>
            </div>
          )}

          <Separator/>
          
          <div>
            <div>
              <ScrollArea className="h-[180px]">

                <MobileNavLinks />

                {user?.role === "Admin" && (
                  <div className="mt-1 px-4">
                    <Separator className="mb-2" />
                    <Button
                     variant="destructive"
                     size="lg"
                     className="w-full justify-center gap-2 rounded-xl text-base"
                     asChild
                     >
                      <Link href="/admin">หลังบ้าน</Link>
                    </Button>
                  </div>
                )}

                <div>
                  <div>
                    {user && orders.filter((o) => o.paymentImage).length > 0 && (
                      <div className="mt-2 px-5 text-sm text-muted-foreground">
                       <span className="font-medium">Tracking:</span>
                        <ul className="list-disc list-inside">
                          {orders
                           .filter((o) => o.paymentImage)
                           .map((o, i) => (
                           <li key={i}>{o.trackingNumber}</li>
                          ))}
                        </ul> 
                     </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>
            {user && (
              <>
                <Separator />
                <SheetFooter className="absolute bottom-0 left-0 w-full px-4">
                  <SignoutButton isMobile />
                </SheetFooter>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default MobileMenu
