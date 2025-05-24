import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DollarSign, Package, PartyPopper, ShoppingBag, User2 } from "lucide-react";

export default function Dashboard() {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {/* total revenue card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Total Revenue</CardTitle>
                        <DollarSign className="w-4 h-4 text-green-500"></DollarSign>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">$100.000</p>
                        <p className="text-xs text-muted-foreground">Based on 1000 charges</p>
                    </CardContent>
                </Card>

                {/* total sales card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Total Sales</CardTitle>
                        <ShoppingBag className="w-4 h-4 text-blue-500"></ShoppingBag>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">+50</p>
                        <p className="text-xs text-muted-foreground">Total sales on ShoeMarshal</p>
                    </CardContent>
                </Card>

                {/* total products card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Total Products</CardTitle>
                        <PartyPopper className="w-4 h-4 text-indigo-500"></PartyPopper>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">37</p>
                        <p className="text-xs text-muted-foreground">Total products created</p>
                    </CardContent>
                </Card>

                {/* total users card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Total Users</CardTitle>
                        <User2 className="w-4 h-4 text-orange-500"></User2>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-xs text-muted-foreground">Total Users Signed Up</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">

                {/* transactions card */}
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>
                            Recent transactions from your store
                        </CardDescription>
                    </CardHeader>
                </Card>


                <Card>
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>JM</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium">Jan Marshal</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+$1,999.00</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>JM</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium">Jan Marshal</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+$1,999.00</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>JM</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium">Jan Marshal</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+$1,999.00</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>JM</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium">Jan Marshal</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+$1,999.00</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}