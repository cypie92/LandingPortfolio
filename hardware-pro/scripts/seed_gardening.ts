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

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_KEY");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const gardeningCategory = {
    name: "Gardening",
    slug: "gardening",
    description: "Essential tools for maintaining your outdoor space.",
    image_url: "https://images.unsplash.com/photo-1599687351724-69632eb1e92d?auto=format&fit=crop&q=80&w=1000",
};

const gardeningProducts = [
    {
        name: "Fiskars Bypass Pruning Shears",
        slug: "fiskars-pruning-shears",
        description: "Ideal for cutting stems and light branches. Patented Low-Friction coating helps the blade glide through wood.",
        price: 24.98,
        stock: 120,
        images: ["https://images.unsplash.com/photo-1596773223049-75c102b48997?auto=format&fit=crop&q=80&w=1000"], // Shears
        specs: { material: "Carbon Steel", cut_capacity: "5/8 in", handle: "Non-slip" },
    },
    {
        name: "Heavy-Duty Garden Shovel",
        slug: "garden-shovel",
        description: "Tempered steel blade for digging in tough soil. Fiberglass handle for strength and durability.",
        price: 34.99,
        stock: 60,
        images: ["https://images.unsplash.com/photo-1416879895648-81e0ed271193?auto=format&fit=crop&q=80&w=1000"], // Shovel
        specs: { handle_length: "48 in", material: "Steel", weight: "4.5 lbs" },
    },
    {
        name: "Flexzilla Garden Hose (50ft)",
        slug: "flexzilla-hose-50ft",
        description: "Extremely flexible, all-weather garden hose. Kink resistant and memory free.",
        price: 39.99,
        stock: 200,
        images: ["https://images.unsplash.com/photo-1589134763260-84df463e272a?auto=format&fit=crop&q=80&w=1000"], // Hose
        specs: { length: "50 ft", material: "Hybrid Polymer", color: "Green" },
    },
    {
        name: "True Temper Leaf Rake",
        slug: "leaf-rake",
        description: "24-inch poly head collects leaves quickly. Lightweight design prevents fatigue.",
        price: 19.99,
        stock: 150,
        images: ["https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=1000"], // Placeholder (reuse power tool or generic tool if no rake pic) - actually let's try a better one if possible or just stick w/ generic
        specs: { width: "24 in", handle: "Wood", tines: "Poly" },
    },
    {
        name: "Ergonomic Garden Trowel",
        slug: "garden-trowel",
        description: "Made of polished cast aluminum with a soft ergonomic handle. Perfect for planting and weeding.",
        price: 12.99,
        stock: 300,
        images: ["https://images.unsplash.com/photo-1530267981375-70977e36098d?auto=format&fit=crop&q=80&w=1000"], // Trowel
        specs: { material: "Aluminum", handle: "Soft Grip", width: "3 in" },
    }
];

async function seedGardening() {
    console.log("Seeding Gardening data...");

    // 1. Insert Category
    const { data: catData, error: catError } = await supabase
        .from('categories')
        .upsert(gardeningCategory, { onConflict: 'slug' })
        .select()
        .single();

    if (catError) {
        console.error("Error inserting category:", catError);
        return;
    }
    const catId = catData.id;
    console.log(`Gardening category ID: ${catId}`);

    // 2. Insert Products
    for (const p of gardeningProducts) {
        const { error } = await supabase
            .from('products')
            .upsert({
                ...p,
                category_id: catId,
                sale_price: null // Explicitly null for TS check if needed, though optional
            }, { onConflict: 'slug' });

        if (error) {
            console.error(`Error inserting ${p.name}:`, error);
        } else {
            console.log(`Inserted: ${p.name}`);
        }
    }

    console.log("Gardening seed complete!");
}

seedGardening();
