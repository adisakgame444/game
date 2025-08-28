import { UserType } from "@/types/user";
import MobileMenu from "./mobile-menu";
import CartIcon from "./cart-icon";
import { DesktopNavLinks } from "./navlinks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DesktopUserMenu from "./desktop-user-menu";
import { getUserCart } from "@/features/carts/db/carts";

interface NavbarProps {
  user: UserType | null;
}

const Navbar = async ({ user }: NavbarProps) => {
  const cart = user ? await getUserCart(user.id) : null;

  // ✅ ใช้ reduce รวม quantity ของสินค้าทั้งหมด
  const itemCount = cart
    ? cart.items.reduce((total, item) => total + item.count, 0)
    : 0;

  return (
    <nav className="flex items-center gap-3">
      {/* Mobile Navigation */}
      {user && <CartIcon itemCount={itemCount} />}
      <MobileMenu user={user} />

      {/* Desktop Navigation */}
      <div className="hidden md:flex md:items-center">
        <DesktopNavLinks />
        {user ? (
          <DesktopUserMenu user={user} itemCount={itemCount} />
        ) : (
          <Button size="sm" asChild>
            <Link href="/auth/signin">เข้าสู่ระบบ</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
