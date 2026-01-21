import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProfileDashboard from "../components/ProfileDashboard";
import Navbar from "../components/Navbar";

export default async function ProfilePage() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/login");
    }

    // Fetch Profile Data
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    // Fetch Orders
    const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    // Fetch Wishlist (with Product details)
    // Note: This requires the foreign key to be explicitly named or correctly inferred. 
    // If the previous SQL didn't set up the relationship name, 'products' might be the key.
    const { data: wishlist } = await supabase
        .from("wishlist")
        .select(`
        id,
        user_id,
        product_id,
        created_at,
        products:product_id (*)
    `)
        .eq("user_id", user.id);

    return (
        <>
            <Navbar />
            <ProfileDashboard
                user={user}
                profile={profile}
                orders={orders || []}
                wishlist={(wishlist as any) || []}
            />
        </>
    );
}
