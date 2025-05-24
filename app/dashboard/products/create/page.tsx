"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { useFormState } from "react-dom";
import { createProduct } from "@/app/action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { useState } from "react";
import Image from "next/image";
import { categories } from "@/app/lib/categories";
import { SubmitButton } from "@/app/components/SubmitButtons";

export default function ProductCreateRoute() {
    const [images, setImages] = useState<string[]>([]);
    const [lastResult, action] = useFormState(createProduct, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: productSchema });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    const handleDeleteImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    }


    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon">
                    <Link href="/dashboard/products">
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
            </div>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>In this form you can create a new product</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Label>Name</Label>
                            <Input type="text"
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={fields.name.initialValue}
                                placeholder="Product Name"
                                className="w-full" />

                            <p className="text-red-500 text-sm">{fields.name.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Description</Label>
                            <Textarea
                                key={fields.description.key}
                                name={fields.description.name}
                                defaultValue={fields.description.initialValue}
                                placeholder="Product Description" />
                            <p className="text-red-500 text-sm">{fields.description.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Price</Label>
                            <Input type="number" key={fields.price.key} name={fields.price.name} defaultValue={fields.price.initialValue} placeholder="Product Price" className="w-full" />
                            <p className="text-red-500 text-sm">{fields.price.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Featured Product</Label>
                            <Switch key={fields.isFeatured.key} name={fields.isFeatured.name} defaultValue={fields.isFeatured.initialValue} />
                            <p className="text-red-500 text-sm">{fields.isFeatured.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Status</Label>
                            <Select key={fields.status.key} name={fields.status.name} defaultValue={fields.status.initialValue}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500 text-sm">{fields.status.errors}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Category</Label>
                            <Select key={fields.category.key} name={fields.category.name} defaultValue={fields.category.initialValue}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.name} >
                                            {category.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-red-500 text-sm">{fields.category.errors}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>
                            <input type="hidden"  value={images} key={fields.images.key} name={fields.images.name} defaultValue={fields.images.initialValue as any}/>
                            {images.length > 0 ? (
                                <div className="flex gap-5">
                                    {images.map((image, index) => (
                                        <div className="relative w-[100px] h-[100px]" key={index}>
                                            <Image
                                                height={100}
                                                width={100}
                                                src={image}
                                                alt="Product Image"
                                                className="w-full h-full object-cover rounded-lg border"
                                            />
                                            <Button
                                                type="button"
                                                onClick={() => handleDeleteImage(index)}
                                                className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white hover:bg-red-600">
                                                <XIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) => {
                                    setImages(res.map((r) => r.url))
                                }} onUploadError={(error: Error) => {
                                    alert("Something went wrong")
                                }} />
                            )}

                            <p className="text-red-500 text-sm">{fields.images.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </Card>
        </form>
    )
}
