"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface buttonProps {
    text: string;
    variant?: "default" | "destructive" | "secondary" | "outline";
}

export function SubmitButton({text, variant}: buttonProps) {
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
