import { ProductCard, ProductCardSkeleton } from "@/components/ui/ProductCard"
import db from "@/db/db"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"



function getMostPopularProducts() {
return db.product.findMany({
        where: {isAvailableForPurchase: true},
        orderBy: {orders: {_count:"desc"}},
        take: 6
    })
}

function getNewestProducts() {
return db.product.findMany({
        where: {isAvailableForPurchase: true},
        orderBy: { createdAt: "desc"},
        take: 6
    })
}




export default function HomePage() {
    return <main className="space-y-12">
        <ProductGridSection title="Most Popular" productsFetcher={getMostPopularProducts} />
        <ProductGridSection title="Newest" productsFetcher={getNewestProducts}/>
    </main>
}

type ProductGridSectionProps = {
    title: string,
    productsFetcher: () => Promise<Product[]>
}

function ProductGridSection({ productsFetcher, title}: ProductGridSectionProps ){
return <div className="space-y-4">
<div className="flex gap-4">
<h2 className="text-3xl font-bold">{title}</h2>
<button className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white">
<Link href="/products" className="space-x-2" > 
<span>View All</span>
<ArrowRight classNamesize-4/>
</Link>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<Suspense fallback={
<>
<ProductCardSkeleton/>
<ProductCardSkeleton/>
<ProductCardSkeleton/>
</>
}>
<ProductSuspense productsFetcher={productsFetcher} />
</Suspense>

</div>
</div>
}


async function ProductSuspense({productsFetcher,}: {productsFetcher: () => Promise<Product[]>}){

return ( await productsFetcher()).map(product => (
    <ProductCard key={product.id} {...product} />

)) }


