import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load env vars manually to avoid dotenv dependency
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

console.log(`Using credentials: ${SUPABASE_URL} with key starting ${SUPABASE_KEY.substring(0, 10)}...`);

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const categories = [
    {
        name: "Power Tools",
        slug: "power-tools",
        description: "High-performance tools for heavy-duty tasks.",
        image_url: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=1000",
    },
    {
        name: "Hand Tools",
        slug: "hand-tools",
        description: "Precision instruments for everyday fixes.",
        image_url: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=1000",
    },
    {
        name: "Workwear",
        slug: "workwear",
        description: "Durable gear to keep you safe and comfortable.",
        image_url: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=1000",
    },
    {
        name: "Plumbing",
        slug: "plumbing",
        description: "Everything you need for pipe and water systems.",
        image_url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=1000",
    },
    {
        name: "Electrical",
        slug: "electrical",
        description: "Wiring, outlets, and professional electrical gear.",
        image_url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000", // Need better image
    }
];

const products = [
    // --- Power Tools ---
    {
        name: "DeWalt 20V Max Cordless Drill",
        slug: "dewalt-20v-drill",
        description: "Compact, lightweight design fits into tight areas. High-performance motor delivers 300 unit watts out (UWO) of power ability completing a wide range of applications.",
        price: 129.00,
        stock: 50,
        images: ["https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=1000"],
        specs: { voltage: "20V", weight: "3.6 lbs", speed: "1500 RPM" },
        category_slug: "power-tools"
    },
    {
        name: "Milwaukee M18 Fuel Sawzall",
        slug: "milwaukee-m18-sawzall",
        description: "Delivers faster than corded cutting speed and the durability of a corded saw. Brushless motor provides constant power for faster cuts and reduced heat for extended life.",
        price: 199.00,
        sale_price: 179.00,
        stock: 30,
        images: ["https://images.unsplash.com/photo-1540544660406-6a69dacb2804?auto=format&fit=crop&q=80&w=1000"],
        specs: { voltage: "18V", stroke_length: "1-1/8 in", spm: "0-3000" },
        category_slug: "power-tools"
    },
    {
        name: "Makita 18V LXT Angle Grinder",
        slug: "makita-18v-grinder",
        description: "Delivers corded grinding performance without the cord. Automatic Speed Change technology adjusts speed and torque during operation for optimum performance.",
        price: 119.00,
        stock: 45,
        images: ["https://images.unsplash.com/photo-1507208386348-e6d306b86cd1?auto=format&fit=crop&q=80&w=1000"],
        specs: { voltage: "18V", wheel_diameter: "4-1/2 in", rpm: "8500" },
        category_slug: "power-tools"
    },
    {
        name: "Bosch 12V Max Router",
        slug: "bosch-12v-router",
        description: "Ergonomic design for comfortable edge routing. Brushless motor for efficiency.",
        price: 149.00,
        stock: 20,
        images: ["https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=1000"],
        specs: { voltage: "12V", speed: "13000 RPM", collet: "1/4 in" },
        category_slug: "power-tools"
    },
    {
        name: "Ryobi One+ 18V Circular Saw",
        slug: "ryobi-18v-circular-saw",
        description: "Cordless convenience with a powerful motor for cuts up to 2-1/4 inches deep.",
        price: 69.00,
        sale_price: 59.00,
        stock: 60,
        images: ["https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=1000"], // Reuse power tool placeholder
        specs: { voltage: "18V", blade_size: "5-1/2 in", rpm: "4700" },
        category_slug: "power-tools"
    },

    // --- Hand Tools ---
    {
        name: "Estwing 20 oz Rip Claw Hammer",
        slug: "estwing-hammer",
        description: "Forged in one piece, this hammer offers the utmost in durability and longevity. The grip reduces impact vibration by 70%.",
        price: 29.99,
        stock: 100,
        images: ["https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=1000"],
        specs: { weight: "20 oz", material: "Steel", handle: "Shock Reduction Grip" },
        category_slug: "hand-tools"
    },
    {
        name: "Klein Tools 11-in-1 Screwdriver",
        slug: "klein-11-in-1",
        description: "Versatile screwdriver / nut driver for the professional. Includes unique industrial strength bits that are heat treated.",
        price: 14.99,
        stock: 200,
        images: ["https://images.unsplash.com/photo-1533230623223-99b3863e48f8?auto=format&fit=crop&q=80&w=1000"],
        specs: { bits: "11", handle: "Cushion-Grip", shaft: "Plated" },
        category_slug: "hand-tools"
    },
    {
        name: "Knipex Cobra Water Pump Pliers",
        slug: "knipex-cobra",
        description: "Adjustment at the touch of a button directly on the workpiece. Fine adjustment for optimum adaptation to different sizes of workpieces.",
        price: 38.50,
        stock: 80,
        images: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1000"],
        specs: { length: "10 in", capacity: "2 in", adjustment_positions: "25" },
        category_slug: "hand-tools"
    },
    {
        name: "Stanley PowerLock Tape Measure",
        slug: "stanley-tape-measure",
        description: "Classic design with a durable metal case and Mylar polyester film coated blade for durability.",
        price: 21.99,
        stock: 150,
        images: ["https://images.unsplash.com/photo-1590425761356-946764516629?auto=format&fit=crop&q=80&w=1000"],
        specs: { length: "25 ft", width: "1 in", material: "Steel" },
        category_slug: "hand-tools"
    },
    {
        name: "Irwin Vise-Grip Locking Pliers",
        slug: "irwin-vise-grip",
        description: "Curved jaw with built-in wire cutter. Great for gripping, clamping, and twisting.",
        price: 16.99,
        stock: 90,
        images: ["https://images.unsplash.com/photo-1581147036324-c17ac41dbf6c?auto=format&fit=crop&q=80&w=1000"], // Reuse placeholder style
        specs: { size: "10 in", jaw_capacity: "1-7/8 in", material: "Alloy Steel" },
        category_slug: "hand-tools"
    },

    // --- Workwear ---
    {
        name: "Carhartt Duck Chore Coat",
        slug: "carhartt-chore-coat",
        description: "Heavyweight cotton duck coat featuring a blanket lining for warmth. Triple-stitched main seams for durability.",
        price: 89.99,
        stock: 25,
        images: ["https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=1000"],
        specs: { material: "Cotton Duck", lining: "Blanket", "fit": "Loose" },
        category_slug: "workwear"
    },
    {
        name: "Mechanix Wear Original Gloves",
        slug: "mechanix-gloves",
        description: "The glove that started it all. Breathable TrekDry material keeps your hands cool and comfortable.",
        price: 24.99,
        stock: 150,
        images: ["https://images.unsplash.com/photo-1624638760971-da797e88c3a9?auto=format&fit=crop&q=80&w=1000"],
        specs: { material: "Synthetic Leather", feature: "Touchscreen Capable" },
        category_slug: "workwear"
    },
    {
        name: "Timberland PRO Pit Boss Steel Toe Boot",
        slug: "timberland-pro-boot",
        description: "Rugged leather work boots with steel safety toes and anti-fatigue technology.",
        price: 135.00,
        stock: 40,
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000"], // Shoe placeholder
        specs: { material: "Leather", toe: "Steel", certified: "ANSI" },
        category_slug: "workwear"
    },
    {
        name: "Safety High-Visibility Vest",
        slug: "safety-vest",
        description: "ANSI Class 2 compliant mesh vest with reflective strips for maximum visibility.",
        price: 9.99,
        stock: 300,
        images: ["https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=1000"], // Construction worker
        specs: { material: "Polyester Mesh", class: "ANSI 2", pockets: "2" },
        category_slug: "workwear"
    },

    // --- Plumbing ---
    {
        name: "SharkBite 1/2 in. Push-to-Connect Coupling",
        slug: "sharkbite-coupling",
        description: "The easiest way to join copper, PEX, CPVC, or PE-RT pipe in any combination. No soldering required.",
        price: 8.98,
        stock: 500,
        images: ["https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=1000"], // Plumbing placeholder
        specs: { size: "1/2 in", material: "Brass", connection: "Push-fit" },
        category_slug: "plumbing"
    },
    {
        name: "Ridgid Heavy-Duty Pipe Wrench",
        slug: "ridgid-pipe-wrench",
        description: "Straight pipe wrench with a sturdy, ductile-iron housing and I-beam handle for superior strength.",
        price: 45.00,
        stock: 35,
        images: ["https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=1000"], // Wrench
        specs: { size: "14 in", jaw_capacity: "2 in", material: "Cast Iron" },
        category_slug: "plumbing"
    },
    {
        name: "Delta Faucet Single Handle Kitchen Faucet",
        slug: "delta-kitchen-faucet",
        description: "Modern design with magnetic docking spray head. Diamond Seal Technology reduces leak points.",
        price: 229.00,
        sale_price: 199.00,
        stock: 15,
        images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000"], // Faucet
        specs: { finish: "Chrome", flow_rate: "1.8 GPM", type: "Pull-down" },
        category_slug: "plumbing"
    },

    // --- Electrical ---
    {
        name: "Klein Tools Digital Multimeter",
        slug: "klein-multimeter",
        description: "Measures up to 600V AC/DC voltage, 10A DC current and 2M resistance. Perfect for basic electrical troubleshooting.",
        price: 49.97,
        stock: 60,
        images: ["https://images.unsplash.com/photo-1596434407005-4b2aee50a109?auto=format&fit=crop&q=80&w=1000"], // Electronics
        specs: { rating: "CAT III 600V", display: "LCD", battery: "9V" },
        category_slug: "electrical"
    },
    {
        name: "Leviton 15 Amp Duplex Outlet (10-Pack)",
        slug: "leviton-outlet-pack",
        description: "Residential grade grounding duplex receptacle. Impact resistant thermoplastic nylon body.",
        price: 24.99,
        stock: 100,
        images: ["https://images.unsplash.com/photo-1556624654-e054ba9136ca?auto=format&fit=crop&q=80&w=1000"], // Wall socket
        specs: { amperage: "15A", voltage: "125V", color: "White" },
        category_slug: "electrical"
    },
    {
        name: "Southwire Romex SIMpull 250ft 12/2 WG",
        slug: "southwire-romex-12-2",
        description: "Non-metallic sheathed cable for residential wiring. Coated for easier pulling.",
        price: 158.00,
        stock: 40,
        images: ["https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1000"], // Wire
        specs: { gauge: "12 AWG", conductors: "2 + Ground", length: "250 ft" },
        category_slug: "electrical"
    },
    {
        name: "Commercial Electric 6in LED Recessed Trim",
        slug: "led-recessed-trim",
        description: "Energy efficient LED downlight with 5 selectable color temperatures. Wet rated for showers.",
        price: 14.97,
        sale_price: 11.97,
        stock: 120,
        images: ["https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=1000"], // Light
        specs: { wattage: "9W", lumens: "650", cct: "Selectable" },
        category_slug: "electrical"
    }
];

async function seed() {
    console.log("Starting seed with privileged key...");

    // 1. Seed Categories
    for (const cat of categories) {
        const { data, error } = await supabase
            .from('categories')
            .upsert({
                name: cat.name,
                slug: cat.slug,
                description: cat.description,
                image_url: cat.image_url
            }, { onConflict: 'slug' })
            .select();

        if (error) {
            console.error(`Error upserting category ${cat.name}:`, error);
        } else {
            console.log(`Upserted category: ${cat.name}`);
        }
    }

    // Refresh categories to get IDs
    const { data: allCategories, error: catError } = await supabase.from('categories').select('id, slug');
    if (catError) {
        console.error("Error fetching categories for mapping:", catError);
        return;
    }

    const catMap = new Map(allCategories.map(c => [c.slug, c.id]));
    console.log(`Mapped ${catMap.size} categories.`);

    // 2. Seed Products
    console.log(`Seeding ${products.length} products...`);
    for (const p of products) {
        const catId = catMap.get(p.category_slug);
        if (!catId) {
            console.warn(`[SKIP] Category not found for product "${p.name}" (slug: ${p.category_slug})`);
            continue;
        }
        // console.log(`Processing ${p.name}...`);

        const { error } = await supabase
            .from('products')
            .upsert({
                name: p.name,
                slug: p.slug,
                description: p.description,
                price: p.price,
                stock: p.stock,
                sale_price: p.sale_price || null,
                images: p.images,
                specs: p.specs,
                category_id: catId
            }, { onConflict: 'slug' });

        if (error) {
            console.error(`Error upserting product ${p.name}:`, error);
        } else {
            console.log(`Upserted product: ${p.name}`);
        }
    }

    console.log("Seed completed successfully.");
}

seed();
