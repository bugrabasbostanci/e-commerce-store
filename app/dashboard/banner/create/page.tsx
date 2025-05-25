"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { UploadDropzone } from "@/app/lib/uploadthing";
import Link from "next/link";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { useState } from "react";
import { useFormState } from "react-dom";
import { createBanner, createProduct } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import Image from "next/image";

export default function BannerCreate() {
    const [image, setImages] = useState<string | undefined>(undefined);
    const [lastResult, action] = useFormState(createBanner, undefined);

    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: bannerSchema });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    })

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <div className="flex items-center gap-x-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/products">
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
            </div>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banner Details</CardTitle>
                    <CardDescription>
                        Create your banner here
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-y-6">
                        <div className="flex flex-col gap-3">
                            <Label>Name</Label>
                            <Input
                                name={fields.title.name}
                                key={fields.title.key}
                                defaultValue={fields.title.initialValue}
                                type="text"
                                placeholder="Create title for your banner" />
                            <p className="text-red-500 text-sm">{fields.title.errors}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>
                            <input 
                            type="hidden" 
                            value={image} 
                            key={fields.imageString.key} 
                            name={fields.imageString.name} 
                            defaultValue={fields.imageString.initialValue}/>
                            {image !== undefined ? (
                                <Image 
                                src={image} 
                                alt="Product Image" 
                                width={200} 
                                height={200} 
                                className="w-[200px] h-[200px] object-cover border rounded-lg"
                                />
                            ): (
                                <UploadDropzone
                                endpoint="bannerImageRoute"
                                onClientUploadComplete={(res) => {
                                    setImages(res[0].url);
                                }}
                                onUploadError={() => {
                                    alert("Error uploading image");
                                }}
                            />
                            )}
                            <p className="text-red-500 text-sm">{fields.imageString.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Create Banner" />
                </CardFooter>
            </Card>
        </form>
    )
}