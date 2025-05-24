"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "./lib/zodSchemas"
import prisma from "./lib/db";

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
            isFeatured: submission.value.isFeatured ?? false,
            status: submission.value.status,
            images: flattenUrls,
            category: submission.value.category,
        }
    })

    redirect("/dashboard/products")
}