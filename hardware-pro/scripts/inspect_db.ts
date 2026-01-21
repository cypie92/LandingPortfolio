import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load env vars manually
const envPath = path.resolve(__dirname, '../.env.local');
const envConfig = fs.readFileSync(envPath, 'utf8');
envConfig.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        process.env[key.trim()] = value.trim().replace(/^"|"$/g, '');
    }
});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function inspect() {
    console.log("Inspecting Database...");

    // 1. Fetch all Categories
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('id, name, slug');

    if (catError) {
        console.error("Error fetching categories:", catError);
        return;
    }

    // 2. Fetch all Products
    const { data: products, error: prodError } = await supabase
        .from('products')
        .select('id, name, slug, category_id');

    if (prodError) {
        console.error("Error fetching products:", prodError);
        return;
    }

    const counts = new Map();
    const orphaned: string[] = [];

    // Create a map of category IDs to names for easy lookup
    const catMap = new Map();
    categories.forEach(c => catMap.set(c.id, c.name));

    products.forEach(p => {
        if (p.category_id) {
            const catName = catMap.get(p.category_id) || 'UNKNOWN_ID';
            counts.set(catName, (counts.get(catName) || 0) + 1);
        } else {
            orphaned.push(p.name);
        }
    });

    // Simplified Output
    const summary = {
        totalCategories: categories.length,
        totalProducts: products.length,
        categoryCounts: Object.fromEntries(counts),
        orphanedCount: orphaned.length,
        categories: categories.map(c => ({ name: c.name, slug: c.slug, id: c.id }))
    };

    console.log(JSON.stringify(summary, null, 2));
}

inspect();
