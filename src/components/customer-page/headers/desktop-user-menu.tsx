
import { UserType } from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  SignoutButton,
  UserAvatarSmall,
  UserDropdownAvatar,
} from "./user-comp";
import { db } from "@/lib/db";
import { isAfter, subDays } from "date-fns";

interface DesktopUserMenuProps {
  user: UserType;
  itemCount: number;
}

const DesktopUserMenu = async ({ user, itemCount }: DesktopUserMenuProps) => {

  const order = await db.order.findMany({
    where: { 
      customerId: user.id,
    },
    select: { 
      trackingNumber: true,
      createdAt: true 
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 rounded-full">
          <UserAvatarSmall user={user} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={4} // px
        className="w-56"
      >
        <DropdownMenuLabel className="flex flex-col items-center gap-2">
          <UserDropdownAvatar user={user} />
          <span>{user.name || user.email}</span>
        </DropdownMenuLabel>

      {user && order.length > 0 && (
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {order.filter((o) => isAfter(o.createdAt, subDays(new Date(), 3)))
          .map((o,index) => (
            <div key={index}>Tracking: {o.trackingNumber}</div>
          ))}
        </DropdownMenuLabel>
      )}

        {/* <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/profile">โปรไฟล์ของฉัน</Link>
        </DropdownMenuItem> */}

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/cart">
            <span>ตะกร้าของฉัน</span>
            <Badge className="ml-auto">{itemCount}</Badge>
          </Link>
        </DropdownMenuItem> 

        {/* <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/my-orders">ประวัติการสั่งซื้อ</Link>
        </DropdownMenuItem> */}

        {user.role === "Admin" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/admin">หลังบ้าน</Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <div>
          <SignoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DesktopUserMenu;
