"use server";

import { createClient } from "@/utils/supabase/server";
import { CheckoutFormValues } from "@/lib/schemas";
import { CartItem } from "@/stores/cartStore";

export type CreateOrderResult =
    | { success: true; orderCode: string }
    | { success: false; error: string };

export async function createOrder(
    formData: CheckoutFormValues,
    cartItems: CartItem[]
): Promise<CreateOrderResult> {
    const supabase = await createClient();

    if (cartItems.length === 0) {
        return { success: false, error: "Cart is empty" };
    }

    // 1. Calculate Total (Server-Side)
    // Ideally, we fetch fresh prices from DB here to avoid client tampering
    // For now, we trust the Client cart for simplicity, but strictly this should be DB verified
    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const { data: { user } } = await supabase.auth.getUser();

    // 2. Generate Order Code (HP-XXXX)
    const orderCode = `HP-${Math.floor(1000 + Math.random() * 9000)}`;

    // 3. Insert Order
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
            user_id: user?.id || null,
            guest_info: {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
            },
            pickup_details: {
                time: formData.pickupTime,
                notes: formData.notes,
            },
            total_amount: totalAmount,
            order_code: orderCode,
            status: "pending_payment",
        })
        .select()
        .single();

    if (orderError) {
        console.error("Order Insert Error:", orderError);
        return { success: false, error: "Failed to create order. Please try again." };
    }

    // 4. Insert Order Items
    const orderItemsData = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price,
    }));

    const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsData);

    if (itemsError) {
        console.error("Order Items Error:", itemsError);
        return { success: false, error: "Failed to save order items." };
    }

    // 5. Update Stock (Simple decrement) (Optional improvement for later)

    return { success: true, orderCode };
}
