import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

async function checkCategories() {
    const { data: categories, error } = await supabase
        .from('categories')
        .select('id, name, slug');

    if (error) {
        console.error("Error fetching categories:", error);
    } else {
        console.log("Categories found:", categories);
    }
}

checkCategories();
