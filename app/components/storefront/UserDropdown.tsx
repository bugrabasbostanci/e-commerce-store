import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

interface iAppProps {
    email: string;
    name: string;
    userImage: string;
}

export async function UserDropdown({email, name, userImage}: iAppProps) {    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="relative h-10 w-10 rounded-full" variant="ghost">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={userImage} alt="User Image"/>
                        <AvatarFallback>{name && name.length > 0 ? name.slice(0,3).toUpperCase() : "USER"}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <LogoutLink>Logout</LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}