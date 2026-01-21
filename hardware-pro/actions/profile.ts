"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(prevState: any, formData: FormData) {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return { error: "Not authenticated" };
    }

    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;

    // Update Auth User Metadata (optional, but good for auth state)
    const { error: authUpdateError } = await supabase.auth.updateUser({
        data: { full_name: fullName },
    });

    if (authUpdateError) {
        return { error: authUpdateError.message };
    }

    // Update Profiles Table (Where we store phone, etc)
    const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
            id: user.id,
            full_name: fullName,
            phone: phone,
            role: 'user', // Default role
        });

    if (profileError) {
        return { error: profileError.message };
    }

    revalidatePath("/profile");
    return { success: "Profile updated successfully" };
}

export async function updatePassword(prevState: any, formData: FormData) {
    const supabase = await createClient();
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    if (password.length < 6) {
        return { error: "Password must be at least 6 characters" };
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
        return { error: error.message };
    }

    return { success: "Password updated successfully" };
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
}
