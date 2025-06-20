"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema } from "./lib/zodSchemas"
import prisma from "./lib/db";
import { redis } from "./lib/redis";
import { Cart } from "./lib/interfaces";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";


export async function createProduct(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: productSchema,
    })

    if (submission.status !== "success") {
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((urlString: string) => urlString.split(",").map((url) => url.trim()))

    await prisma.product.create({
        data: {
            name: submission.value.name,
            description: submission.value.description,
            price: submission.value.price,
            isFeatured: submission.value.isFeatured === true ? true : false,
            status: submission.value.status,
            images: flattenUrls,
            category: submission.value.category,
        }
    })

    redirect("/dashboard/products")
}

export async function editProduct(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: productSchema,
    })

    if (submission.status !== "success") {
        return submission.reply();
    }

    const productId = formData.get("productId") as string;
    const flattenUrls = submission.value.images.flatMap((urlString: string) => urlString.split(",").map((url) => url.trim()))

    await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            name: submission.value.name,
            description: submission.value.description,
            price: submission.value.price,
            isFeatured: submission.value.isFeatured === true ? true : false,
            status: submission.value.status,
            category: submission.value.category,
            images: flattenUrls,
        }
    })

    redirect("/dashboard/products")
}

export async function deleteProduct(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }

    await prisma.product.delete({
        where: {
            id: formData.get("productId") as string,
        }
    })

    redirect("/dashboard/products")
}

export async function createBanner(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: bannerSchema,
    })

    if (submission.status !== "success") {
        return submission.reply();
    }

    await prisma.banner.create({
        data: {
            title: submission.value.title,
            imageString: submission.value.imageString,
        }
    })

    redirect("/dashboard/banner")
}

export async function deleteBanner(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }

    await prisma.banner.delete({
        where: {
            id: formData.get("bannerId") as string,
        }
    })

    redirect("/dashboard/banner")
}


export async function addItem(productId: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    let cart: Cart | null = await redis.get(`cart-${user.id}`)

    const selectedProduct = await prisma.product.findUnique({
        select: {
            id: true,
            name: true,
            price: true,
            images: true,
        },
        where: {
            id: productId,
        }
    })

    if (!selectedProduct) {
        throw new Error("No product with this ID")
    }

    let myCart = {} as Cart

    if (!cart || !cart.items) {
        myCart = {
            userId: user.id,
            items: [
                {
                    price: selectedProduct.price,
                    id: selectedProduct.id,
                    imageString: selectedProduct.images[0],
                    name: selectedProduct.name,
                    quantity: 1,
                }
            ]
        }
    } else {
        let itemFound = false;

        myCart.items = cart.items.map((item) => {
            if (item.id === productId) {
                itemFound = true;
                item.quantity += 1;
            }

            return item;
        })

        if (!itemFound) {
            myCart.items.push({
                id: selectedProduct.id,
                imageString: selectedProduct.images[0],
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity: 1,
            })
        }
    }

    await redis.set(`cart-${user.id}`, myCart)

    revalidatePath("/", "layout")
}

export async function deleteItem(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    const productId = formData.get("productId") as string;

    let cart: Cart | null = await redis.get(`cart-${user.id}`)

    if (cart && cart.items) {
        const updateCard: Cart = {
            userId: user.id,
            items: cart.items.filter((item) => item.id !== productId)
        }

        await redis.set(`cart-${user.id}`, updateCard);
    }

    revalidatePath("/bag");
}

export async function checkOut() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    let cart: Cart | null = await redis.get(`cart-${user.id}`)

    if (cart && cart.items) {
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((item) => ({
            price_data: {
                currency: "usd",
                unit_amount: item.price * 100, // Stripe expects the amount in cents
                product_data: {
                    name: item.name,
                    images: [item.imageString],
                }
            },
            quantity: item.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: "http://localhost:3000/payment/success",
            cancel_url: "http://localhost:3000/payment/cancel",
            metadata: {
                userId: user.id,
            }
        }
        )

        return redirect(session.url as string);
    }

    // Here you would typically create a checkout session with Stripe or another payment provider
    // For this example, we will just clear the cart and redirect to a success page

    await redis.del(`cart-${user.id}`);

    redirect("/checkout/success");
}