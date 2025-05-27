"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Loader2, ShoppingBag } from "lucide-react"

interface buttonProps {
    text: string;
    variant?: "default" | "destructive" | "secondary" | "outline";
}

export function SubmitButton({ text, variant }: buttonProps) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled variant={variant}>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Please wait...
                </Button>
            ) : (
                <Button type="submit" variant={variant}>{text}</Button>
            )}
        </>
    )
}


export function ShoppingBagButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled size="lg" className="w-full mt-5">
                    <Loader2 className="mr-4 h-5 w-5 animate-spin" />Please Wait
                </Button>
            ) : (
                <Button size="lg" className="w-full mt-5" type="submit">
                    <ShoppingBag className="mr-4 h-5 w-5" />Add to Cart
                </Button>
            )}
        </>
    )
}


export function DeleteItem() {
    const {pending} = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled variant="ghost" className="font-medium text-primary text-end">Removing...</Button>

            ) : (
                <Button type="submit" variant="ghost" className="font-medium text-primary text-end">Delete</Button>


            )}
        </>
    )
}