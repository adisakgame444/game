import Modal from "@/components/shared/modal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductType } from "@/types/product"
import dayjs from "@/lib/dayjs"
import { Clock, ShoppingCart, Tag } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"


interface ProductsDetailModal {
    open: boolean
    onOpenChange: (open: boolean) => void
    product: ProductType | null
}

const ProductsDetailModal = ({ open, onOpenChange ,product }: ProductsDetailModal) => {
    if(!product) return null
  const FormattedDete = dayjs(product.createdAt).fromNow()
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
              <TabsTrigger value="image">Images ({product.images.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                  {/* main image */}
                  <div className="relative aspect-square border rounded-md overflow-hidden group">
                    <Image alt={product.title} src={product.mainImage?.url || ''} fill className="object-cover transition-transform group-hover:scale-105"/>
                  </div>

                  {/* product info */}

                  <div className="p-4 flex flex-col">

                    <div className="text-end">
                      <Badge>
                        <Tag/>
                        {product.category.name}
                      </Badge>
                    </div>

                    <h2 className="font-bold text-muted-foreground text-xl line-clamp-2 mb-1">
                      <div className="text-sm">เลขไอดีสินค้า {product.sku}</div>
                      {product.title}
                    </h2>

                    <div className="flex items-center gap-1 text-sm mb-1">
                      <ShoppingCart size={18}/>
                      <span>ราคา: {product.price} บาท</span>
                    </div>

                    <span className="text-red-500 text-sm mb-1">สินค้าในสต็อก: {product.stock} ชิ้น</span>

                    <div className="mb-1">
                      <Badge
                      variant="outline"
                      className={cn(
                      "transition-colors",
                      product.stock <= product.lowStock
                      ? "text-amber-500 border-amber-500"
                      : "text-green-600 border-green-500",
                      )}
                    >
                      {product.stock <= product.lowStock ? "เหลือน้อย" : "พร้อมส่ง"}
                    </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <Clock size={12}/>
                      <span>Added {FormattedDete}</span>
                    </div>

                    <div className="max-w-full mb-2 ">
                      <Badge variant='outline' className="break-words whitespace-pre-line text-sm font-normal leading-relaxed w-full max-w-full">{product.description}</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="image">image</TabsContent>
          </Tabs>
        </div>
    </Modal>
  )
}

export default ProductsDetailModal
