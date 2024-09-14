import { Nav, NavLink } from "@/components/Nav"


export const dynamic = "force-dynamic"

export default function Layout ({
    children,
}: Readonly<{
children: React.ReactNode
}>) {
    return <>
    <Nav>
        <NavLink href="/customer">Home</NavLink>
        <NavLink href="/customer/products">Products</NavLink>
        <NavLink href="/customer/orders">My Orders</NavLink>
    </Nav>
     <div className="container my-6">
        {children}
    </div>
    </>
    
}