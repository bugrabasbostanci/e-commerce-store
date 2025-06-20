import { ReactNode } from "react";
import { DashboardNavigation } from "../components/dashboard/DashboardNavigation";
import { SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon, CircleUserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


export default async function DashboardLayout({children}: {children: React.ReactNode}) {
    // kullanıcı girişi kontrolü
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    // admin olmayan kullanıcıları yönlendir
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        redirect("/")
    }

    return (
       <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white">
            <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <DashboardNavigation />
            </nav>

            <Sheet>
                <SheetTrigger asChild>
                    <Button className="shrink-0 md:hidden" variant="outline" size="icon">
                        <MenuIcon className="w-5 h-5"></MenuIcon>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-md">
                    <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
                        <DashboardNavigation />
                    </nav>
                </SheetContent>
            </Sheet>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUserIcon className="w-5 h-5"></CircleUserIcon>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <LogoutLink>Logout</LogoutLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
        {/* page.tsx'in içeriklerini buraya alıyoruz */}
        <main className="my-5">{children}</main>
       </div>
    );
} 