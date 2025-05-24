"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UploadDropzone } from "@/app/lib/uploadthing";




export default function ProductCreateRoute() {
    return (
        <form>
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
                            <Input type="text" placeholder="Product Name" className="w-full"/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Description</Label>
                            <Textarea placeholder="Product Description" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Price</Label>
                            <Input type="number" placeholder="Product Price" className="w-full"/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Featured Product</Label>
                            <Switch />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Status</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>
                            <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) => {
                                alert("Uploaded successfully")
                            }} onUploadError={(error: Error) => {
                                alert("Something went wrong")
                            }} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Create Product</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
