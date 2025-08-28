// "use client";

// import { Button } from "@/components/ui/button";
// import { ShoppingCart } from "lucide-react";
// import { useTransition } from "react";
// import { addToCartAction } from "../actions/carts";
// import { toast } from "sonner";

// interface AddToCartBButtonProps {
//   productId: string;
//   stock: number;
//   className?: string;
//   children?: React.ReactNode;
// }

// const AddToCartButton = ({
//   productId,
//   stock,
//   className,
//   children,
// }: AddToCartBButtonProps) => {
//   const [isPending, startTransition] = useTransition();

//   const handleAddToCart = () => {
//     startTransition(async () => {
//       const formData = new FormData();
//       formData.append("product-id", productId);
//       formData.append("count", "1");

//       const result = await addToCartAction(formData);

//       if (result && result.success) {
//         toast.success(result.message);
//       } else {
//         toast.error(result.message);
//       }
//     });
//   };

//   return (
//     <Button
//       className={className}
//       onClick={handleAddToCart}
//       disabled={stock <= 0 || isPending}
//     >
//       <ShoppingCart size={16} />
//       {children || "ซื้อเลย"}
//     </Button>
//   );
// };

// export default AddToCartButton;

"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useTransition } from "react";
import { addToCartAction } from "../actions/carts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  productId: string;
  stock: number;
  className?: string;
  children?: React.ReactNode;
}

const AddToCartButton = ({
  productId,
  stock,
  className,
  children,
}: AddToCartButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("product-id", productId);
      formData.append("count", "1");

      const result = await addToCartAction(formData);

      if (result && result.success) {
        toast.success(result.message);
        router.refresh(); // ✅ refresh UI → cart badge อัปเดต
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      className={className}
      onClick={handleAddToCart}
      disabled={stock <= 0 || isPending}
    >
      <ShoppingCart size={16} />
      {children || "ซื้อเลย"}
    </Button>
  );
};

export default AddToCartButton;
