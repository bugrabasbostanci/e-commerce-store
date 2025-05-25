import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal, PlusCircle, User2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import prisma from "@/app/lib/db";

async function getData() {
    const data = await prisma.banner.findMany({
        orderBy: {
            createdAt: "desc",
        }
    });
    return data;
}

export default async function BannerRoute() {
    const data = await getData();
    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex gap-x-2">
                    <Link href="/dashboard/banner/create">
                        <PlusCircle className="w-4 h-4" />
                        Add Banner
                    </Link>
                </Button>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banners</CardTitle>
                    <CardDescription>Manage your banners here</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Image 
                                        alt="Product Image"
                                        src={item.imageString} 
                                        width={64}
                                        height={64}
                                        className="object-cover rounded-lg w-16 h-16"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{item.title}</TableCell>
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
                                                    <Link href={`/dashboard/banner/${item.id}/delete`}>Delete</Link>
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