import Modal from "@/components/shared/modal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductType } from "@/types/product";
import dayjs from "@/lib/dayjs";
import { Cannabis, Clock, ImageIcon, ShoppingCart, Tag } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductsDetailModal {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductType | null;
}

const ProductsDetailModal = ({
  open,
  onOpenChange,
  product,
}: ProductsDetailModal) => {
  if (!product) return null;
  const FormattedDete = dayjs(product.createdAt).fromNow();
  console.log("COD VALUE:", product.cod);
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={product.title}
      description={`SKU: ${product?.sku}`}
      className="md:max-w-3xl max-h-[90vh] overflow-y-auto"
    >
      <div>
        <Tabs>
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="overview">OverView</TabsTrigger>
            <TabsTrigger value="image">
              Images ({product.images.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                {/* main image */}
                <div className="relative aspect-square border rounded-md overflow-hidden group">
                  <Image
                    alt={product.title}
                    src={product.mainImage?.url || ""}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                {/* product info */}

                <div className="p-4 flex flex-col">
                  <div className="flex justify-between items-center">
                    <div className=" gap-0.5 text-sm bg-yellow-400 inline-flex justify-items-start rounded px-1 mt-[1px]">
                      <span className="text-white">{product.sku}</span>
                    </div>
                    <Badge>
                      <Tag />
                      <div>{product.category.name}</div>
                    </Badge>
                  </div>

                  <h2 className="font-bold  text-xl line-clamp-2 flex items-center gap-1">
                    <div className="text-primary">
                      <Cannabis size={25} />
                    </div>
                    {product.title}
                  </h2>

                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-0.5">
                      <ShoppingCart size={18} className="text-primary" />
                      <span className="text-sm text-[15px]">
                        ราคา: {product.price}฿{" "}
                      </span>
                    </div>
                    <span className="text-[15px]">
                      Stock:{" "}
                      <span className="text-red-500">{product.stock}</span> ชิ้น
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-1">
                    {/* กล่องพร้อมส่ง */}
                    <Badge
                      variant="outline"
                      className={cn(
                        "transition-colors",
                        product.stock <= product.lowStock
                          ? "text-amber-500 border-amber-500"
                          : "text-green-600 border-green-600"
                      )}
                    >
                      {product.stock <= product.lowStock
                        ? "ใกล้หมด"
                        : "พร้อมส่ง"}
                    </Badge>

                    {/* กล่องบริการเก็บปลายทาง */}
                    <Badge
                      variant="outline"
                      className={cn(
                        product.cod
                          ? "text-green-600 border-green-600"
                          : "text-red-500 border-red-500"
                      )}
                    >
                      {product.cod
                        ? "มีบริการเก็บปลายทาง"
                        : "ไม่มีบริการเก็บปลายทาง"}
                    </Badge>
                  </div>

                  <div>
                    <div className="overflow-hidden w-full">
                      <div className="marquee-text text-[12px] sm:text-xs md:text-sm font-medium whitespace-nowrap">
                        🎉 พบกับสินค้าใหม่ๆ ทุกสัปดาห์ พร้อมโปรโมชั่นสุดพิเศษ!
                        🎉 พบกับสินค้าใหม่ๆ ทุกสัปดาห์ พร้อมโปรโมชั่นสุดพิเศษ!
                        🥦
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Clock size={12} />
                    <span>Added {FormattedDete}</span>
                  </div>

                  <div className="max-w-full mb-2 ">
                    <Badge
                      variant="outline"
                      className="break-words whitespace-pre-line text-sm font-normal leading-relaxed w-full max-w-full"
                    >
                      {product.description}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="image">
            <ScrollArea className="max-h-[500px] overflow-y-auto">
              <Card>
                <CardContent>
                  <h3 className="text-sm font-semibold mb-3">
                    รูปภาพของสินค้า ({product.images.length})
                  </h3>

                  {product.images.length > 0 ? (
                    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {product.images.map((image, index) => (
                        <div
                          key={index}
                          className=" relative aspect-square border-[10px] rounded-md overflow-hidden cursor-pointer"
                        >
                          <Image
                            alt={`Product image ${index + 1}`}
                            src={image.url}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 bg-muted/50 rounded-md">
                      <ImageIcon
                        size={40}
                        className="text-muted-foreground mb-2 opacity-40"
                      />
                      <p className="text-sm text-muted-foreground">
                        ไม่มีรูปภาพของสินค้า
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
};

export default ProductsDetailModal;
