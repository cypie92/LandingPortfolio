import { createClient } from "@/utils/supabase/server";
import NewArrivalsClient from "./NewArrivalsClient";

export default async function NewArrivals() {
    const supabase = await createClient();
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .limit(8)
        .order("created_at", { ascending: false });

    return <NewArrivalsClient products={products || []} />;
}
