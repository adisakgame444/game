'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SheetClose } from '@/components/ui/sheet'
import { useSignout } from '@/hooks/use-sign-out'
import { UserType } from '@/types/user'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserCompProps {
  user: UserType
}

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
    <Card className="bg-white border border-gray-200">
      <CardContent className="flex flex-col items-center gap-1 py-0">
        {/* Picture */}
        <Image
          alt={user.name || 'Profile'}
          src={user.picture || '/images/no-user-image.webp'}
          width={128}
          height={128}
          priority
          className="rounded-full border-4 border-green-400 object-cover shadow-md"
        />

        {/* Name */}
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>

        {/* Email */}
        {user.email && (
          <p className="text-sm text-gray-500">{user.email}</p>
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
