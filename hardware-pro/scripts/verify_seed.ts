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

async function verify() {
    console.log("Verifying data...");

    // Check Categories
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('*');

    if (catError) {
        console.error("Error fetching categories:", catError);
    } else {
        console.log(`Found ${categories.length} categories:`);
        categories.forEach(c => console.log(`- ${c.name} (${c.slug})`));
    }

    // Check Products
    const { data: products, error: prodError } = await supabase
        .from('products')
        .select('name, category:categories(name)');

    if (prodError) {
        console.error("Error fetching products:", prodError);
    } else {
        console.log(`Found ${products.length} products:`);
        products.forEach(p => console.log(`- ${p.name} (${p.category?.name})`));
    }
}

verify();
