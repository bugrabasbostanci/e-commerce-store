import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

async function getData() {
    const data = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        }
    })
    return data
} 

export default async function Products() {
    const data = await getData()
    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex items-center gap-x-2">
                    <Link href="/dashboard/products/create">
                        <PlusCircle className="w-4 h-4" />
                        <span>Add Product</span>
                    </Link>
                </Button>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>
                        Manage your products and view their sales performance.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                <TableCell>
                                    <Image alt="Product Image" src={item.images[0]} width={64} height={64} className="rounded-md object-cover w-16 h-16"/>
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>{new Intl.DateTimeFormat('en-US').format(item.createdAt)}</TableCell>
                                <TableCell className="text-right">
                                   <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/products/${item.id}`}>Edit</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/products/${item.id}/delete`}>Delete</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                   </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}