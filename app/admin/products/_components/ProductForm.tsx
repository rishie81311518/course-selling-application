"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { Product } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { addProduct, updateProduct } from "../../_actions/products"


export function ProductForm({product}: {product?: Product | null}) {
    const [error, action] = useFormState(product == null ? addProduct : updateProduct.bind(null, product.id), {})
const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents)

    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" required defaultValue={product?.name || ""} />
            {error.name && <div className="text-destructive">{error.name}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInCents">Price In Cents</Label>
            <Input type="number" id="priceInCents" name="priceInCents" required value={priceInCents} onChange={e => setPriceInCents(Number(e.target.value)|| undefined)}  />
            <div className="text-muted-foreground">
                {formatCurrency((priceInCents || 0) / 100)}
            </div>
            {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required defaultValue={product?.description || ""}  />
            {error.description && <div className="text-destructive">{error.description}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input type="file" id="file" name="file" required={product == null} />
            {product !=null && (
                <div className="text-muted-foreground">
                    {product.filePath}
                    </div>
            )}
            {error.file && <div className="text-destructive">{error.file}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input type="file" id="image" name="image" required={product ==  null} />
            {product !=null && (
                <Image src={product.imagePath} height="400" width="400" alt="Product Image"  />
            )}
            {error.image && <div className="text-destructive">{error.image}</div>}
        </div>
       <SubmitButton/>
    </form>
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" disabled={pending} className="bg-red-400 hover:bg-white-500 text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-900 hover:border-transparent rounded">
        {pending ? "Saving..." : "Save" }
      </button>
    )
}