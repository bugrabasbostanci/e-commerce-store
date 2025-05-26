import Link from "next/link";

export const navLinks = [
    {
        id:0,
        name: "Home",
        href: "/",
    },
    {
        id:1,
        name: "All Products",
        href: "/products",
    },
    {
        id:2,
        name: "Men",
        href: "/men",
    },
    {
        id:3,
        name: "Women",
        href: "/women",
    },
    {
        id:4,
        name: "Kids",
        href: "/kids",
    },
]

export function NavbarLinks() {
 return(
    <div className="hidden md:flex justify-center items-center gap-x-4 ml-8">
        {navLinks.map((link) => (
            <Link key={link.id} href={link.href} className="font-medium">
                {link.name}
            </Link>
        ))}
    </div>
 )
}