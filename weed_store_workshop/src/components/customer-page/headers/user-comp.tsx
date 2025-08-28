'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SheetClose } from '@/components/ui/sheet'
import { useSignout } from '@/hooks/use-sign-out'
import { UserType } from '@/types/user'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from "swiper/modules";

interface UserCompProps {
  user: UserType
}

const heroImages = [
  '/images/game-image.jpg',
  '/images/game-image.jpg',
  '/images/game-image.jpg'
]

export const AuthButtons = () => (
  <div className='flex justify-center gap-3'>
    <Button
      size='lg'
      asChild
    >
      <SheetClose asChild>
        <Link href='/auth/signup'>ลงทะเบียน</Link>
      </SheetClose>
    </Button>
    <Button
      variant='outline'
      size='lg'
      asChild
    >
      <SheetClose asChild>
        <Link href='/auth/signin'>เข้าสู่ระบบ</Link>
      </SheetClose>
    </Button>
  </div>
)

export const SignoutButton = ({ isMobile = false }) => {
  const { isPending, handleSignout } = useSignout()

  if (isMobile) {
    return (
      <SheetClose asChild>
        <Button
          variant='destructive'
          size='lg'
          disabled={isPending}
          onClick={handleSignout}
        >
          ออกจากระบบ
        </Button>
      </SheetClose>
    )
  }

  return (
    <Button
      variant='destructive'
      className='w-full mt-4'
      disabled={isPending}
      onClick={handleSignout}
    >
      ออกจากระบบ
    </Button>
  )
}

export const UserAvatar = ({ user }: UserCompProps) => (
  <div className="px-4">
    <Card className="relative overflow-hidden rounded-md">
      {/* พื้นหลังสไลด์ */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: true  }}
          loop
        >
          {heroImages.map((src, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-screen bg-no-repeat bg-cover"
                style={{ 
                  backgroundImage: `url(${src})`, 
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper> 
      </div>

      {/* Overlay เนื้อหา */}
      <CardContent className="relative z-10 flex flex-col items-center gap-1 p-4 ">
        <Image
          alt={user.name || 'Profile'}
          src={user.picture || '/images/no-user-image.webp'}
          width={128}
          height={128}
          priority
          className="rounded-full border-4 border-green-400 object-cover shadow-md"
        />
        <h2 className="text-sm font-semibold text-gray-800 bg-green-100 px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {user.name}
        </h2>
        {user.email && (
          <p className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-lg shadow-sm flex items-center gap-2 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0l-4-4m4 4l-4 4" />
            </svg>
            {user.email}
          </p>
        )}
      </CardContent>
    </Card>
  </div>
);




export const UserAvatarSmall = ({ user }: UserCompProps) => (
  <Avatar className='border-2 border-primary'>
    <AvatarImage
      src={user.picture || undefined}
      alt={user.name || 'User'}
    />
    <AvatarFallback className='bg-primary text-primary-foreground'>
      {user.name
        ? user.name.slice(0, 2).toUpperCase()
        : user.email.slice(0, 2).toUpperCase()}
    </AvatarFallback>
  </Avatar>
)

export const UserDropdownAvatar = ({ user }: UserCompProps) => (
  <Avatar className='size-16 border-2 border-primary'>
    <AvatarImage
      src={user.picture || undefined}
      alt={user.name || 'User'}
    />
    <AvatarFallback className='text-lg'>
      {user.name
        ? user.name.slice(0, 2).toUpperCase()
        : user.email.slice(0, 2).toUpperCase()}
    </AvatarFallback>
  </Avatar>
)
