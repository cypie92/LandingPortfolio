-- Schema Migration: Ensure sale_price column exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'sale_price') THEN
        ALTER TABLE products ADD COLUMN sale_price numeric;
    END IF;
END $$;

-- Categories Seed
INSERT INTO categories (name, slug, description, image_url)
VALUES
    ('Power Tools', 'power-tools', 'High-performance tools for heavy-duty tasks.', 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=1000'),
    ('Hand Tools', 'hand-tools', 'Precision instruments for everyday fixes.', 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=1000'),
    ('Workwear', 'workwear', 'Durable gear to keep you safe and comfortable.', 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=1000'),
    ('Plumbing', 'plumbing', 'Everything you need for pipe and water systems.', 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=1000'),
    ('Electrical', 'electrical', 'Wiring, outlets, and professional electrical gear.', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000')
ON CONFLICT (slug) DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url;

-- Products Seed (Power Tools)
INSERT INTO products (name, slug, description, price, stock, sale_price, images, specs, category_id)
VALUES
    (
        'DeWalt 20V Max Cordless Drill',
        'dewalt-20v-drill',
        'Compact, lightweight design fits into tight areas. High-performance motor delivers 300 unit watts out (UWO) of power ability completing a wide range of applications.',
        129.00,
        50,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=1000'],
        '{"voltage": "20V", "weight": "3.6 lbs", "speed": "1500 RPM"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'power-tools')
    ),
    (
        'Milwaukee M18 Fuel Sawzall',
        'milwaukee-m18-sawzall',
        'Delivers faster than corded cutting speed and the durability of a corded saw. Brushless motor provides constant power for faster cuts and reduced heat for extended life.',
        199.00,
        30,
        179.00,
        ARRAY['https://images.unsplash.com/photo-1540544660406-6a69dacb2804?auto=format&fit=crop&q=80&w=1000'],
        '{"voltage": "18V", "stroke_length": "1-1/8 in", "spm": "0-3000"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'power-tools')
    ),
    (
        'Makita 18V LXT Angle Grinder',
        'makita-18v-grinder',
        'Delivers corded grinding performance without the cord. Automatic Speed Change technology adjusts speed and torque during operation for optimum performance.',
        119.00,
        45,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1507208386348-e6d306b86cd1?auto=format&fit=crop&q=80&w=1000'],
        '{"voltage": "18V", "wheel_diameter": "4-1/2 in", "rpm": "8500"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'power-tools')
    ),
    (
        'Bosch 12V Max Router',
        'bosch-12v-router',
        'Ergonomic design for comfortable edge routing. Brushless motor for efficiency.',
        149.00,
        20,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=1000'],
        '{"voltage": "12V", "speed": "13000 RPM", "collet": "1/4 in"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'power-tools')
    ),
    (
        'Ryobi One+ 18V Circular Saw',
        'ryobi-18v-circular-saw',
        'Cordless convenience with a powerful motor for cuts up to 2-1/4 inches deep.',
        69.00,
        60,
        59.00,
        ARRAY['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=1000'],
        '{"voltage": "18V", "blade_size": "5-1/2 in", "rpm": "4700"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'power-tools')
    )
ON CONFLICT (slug) DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    stock = EXCLUDED.stock,
    sale_price = EXCLUDED.sale_price,
    images = EXCLUDED.images,
    specs = EXCLUDED.specs,
    category_id = EXCLUDED.category_id;

-- Products Seed (Hand Tools)
INSERT INTO products (name, slug, description, price, stock, sale_price, images, specs, category_id)
VALUES
    (
        'Estwing 20 oz Rip Claw Hammer',
        'estwing-hammer',
        'Forged in one piece, this hammer offers the utmost in durability and longevity. The grip reduces impact vibration by 70%.',
        29.99,
        100,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=1000'],
        '{"weight": "20 oz", "material": "Steel", "handle": "Shock Reduction Grip"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'hand-tools')
    ),
    (
        'Klein Tools 11-in-1 Screwdriver',
        'klein-11-in-1',
        'Versatile screwdriver / nut driver for the professional. Includes unique industrial strength bits that are heat treated.',
        14.99,
        200,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1533230623223-99b3863e48f8?auto=format&fit=crop&q=80&w=1000'],
        '{"bits": "11", "handle": "Cushion-Grip", "shaft": "Plated"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'hand-tools')
    ),
    (
        'Knipex Cobra Water Pump Pliers',
        'knipex-cobra',
        'Adjustment at the touch of a button directly on the workpiece. Fine adjustment for optimum adaptation to different sizes of workpieces.',
        38.50,
        80,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1000'],
        '{"length": "10 in", "capacity": "2 in", "adjustment_positions": "25"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'hand-tools')
    ),
    (
        'Stanley PowerLock Tape Measure',
        'stanley-tape-measure',
        'Classic design with a durable metal case and Mylar polyester film coated blade for durability.',
        21.99,
        150,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1590425761356-946764516629?auto=format&fit=crop&q=80&w=1000'],
        '{"length": "25 ft", "width": "1 in", "material": "Steel"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'hand-tools')
    ),
    (
        'Irwin Vise-Grip Locking Pliers',
        'irwin-vise-grip',
        'Curved jaw with built-in wire cutter. Great for gripping, clamping, and twisting.',
        16.99,
        90,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1581147036324-c17ac41dbf6c?auto=format&fit=crop&q=80&w=1000'],
        '{"size": "10 in", "jaw_capacity": "1-7/8 in", "material": "Alloy Steel"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'hand-tools')
    )
ON CONFLICT (slug) DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    stock = EXCLUDED.stock,
    sale_price = EXCLUDED.sale_price,
    images = EXCLUDED.images,
    specs = EXCLUDED.specs,
    category_id = EXCLUDED.category_id;

-- Products Seed (Workwear)
INSERT INTO products (name, slug, description, price, stock, sale_price, images, specs, category_id)
VALUES
    (
        'Carhartt Duck Chore Coat',
        'carhartt-chore-coat',
        'Heavyweight cotton duck coat featuring a blanket lining for warmth. Triple-stitched main seams for durability.',
        89.99,
        25,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=1000'],
        '{"material": "Cotton Duck", "lining": "Blanket", "fit": "Loose"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'workwear')
    ),
    (
        'Mechanix Wear Original Gloves',
        'mechanix-gloves',
        'The glove that started it all. Breathable TrekDry material keeps your hands cool and comfortable.',
        24.99,
        150,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1624638760971-da797e88c3a9?auto=format&fit=crop&q=80&w=1000'],
        '{"material": "Synthetic Leather", "feature": "Touchscreen Capable"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'workwear')
    ),
    (
        'Timberland PRO Pit Boss Steel Toe Boot',
        'timberland-pro-boot',
        'Rugged leather work boots with steel safety toes and anti-fatigue technology.',
        135.00,
        40,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000'],
        '{"material": "Leather", "toe": "Steel", "certified": "ANSI"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'workwear')
    ),
    (
        'Safety High-Visibility Vest',
        'safety-vest',
        'ANSI Class 2 compliant mesh vest with reflective strips for maximum visibility.',
        9.99,
        300,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=1000'],
        '{"material": "Polyester Mesh", "class": "ANSI 2", "pockets": "2"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'workwear')
    )
ON CONFLICT (slug) DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    stock = EXCLUDED.stock,
    sale_price = EXCLUDED.sale_price,
    images = EXCLUDED.images,
    specs = EXCLUDED.specs,
    category_id = EXCLUDED.category_id;

-- Products Seed (Plumbing)
INSERT INTO products (name, slug, description, price, stock, sale_price, images, specs, category_id)
VALUES
    (
        'SharkBite 1/2 in. Push-to-Connect Coupling',
        'sharkbite-coupling',
        'The easiest way to join copper, PEX, CPVC, or PE-RT pipe in any combination. No soldering required.',
        8.98,
        500,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=1000'],
        '{"size": "1/2 in", "material": "Brass", "connection": "Push-fit"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'plumbing')
    ),
    (
        'Ridgid Heavy-Duty Pipe Wrench',
        'ridgid-pipe-wrench',
        'Straight pipe wrench with a sturdy, ductile-iron housing and I-beam handle for superior strength.',
        45.00,
        35,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=1000'],
        '{"size": "14 in", "jaw_capacity": "2 in", "material": "Cast Iron"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'plumbing')
    ),
    (
        'Delta Faucet Single Handle Kitchen Faucet',
        'delta-kitchen-faucet',
        'Modern design with magnetic docking spray head. Diamond Seal Technology reduces leak points.',
        229.00,
        15,
        199.00,
        ARRAY['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000'],
        '{"finish": "Chrome", "flow_rate": "1.8 GPM", "type": "Pull-down"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'plumbing')
    )
ON CONFLICT (slug) DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    stock = EXCLUDED.stock,
    sale_price = EXCLUDED.sale_price,
    images = EXCLUDED.images,
    specs = EXCLUDED.specs,
    category_id = EXCLUDED.category_id;

-- Products Seed (Electrical)
INSERT INTO products (name, slug, description, price, stock, sale_price, images, specs, category_id)
VALUES
    (
        'Klein Tools Digital Multimeter',
        'klein-multimeter',
        'Measures up to 600V AC/DC voltage, 10A DC current and 2M resistance. Perfect for basic electrical troubleshooting.',
        49.97,
        60,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1596434407005-4b2aee50a109?auto=format&fit=crop&q=80&w=1000'],
        '{"rating": "CAT III 600V", "display": "LCD", "battery": "9V"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'electrical')
    ),
    (
        'Leviton 15 Amp Duplex Outlet (10-Pack)',
        'leviton-outlet-pack',
        'Residential grade grounding duplex receptacle. Impact resistant thermoplastic nylon body.',
        24.99,
        100,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1556624654-e054ba9136ca?auto=format&fit=crop&q=80&w=1000'],
        '{"amperage": "15A", "voltage": "125V", "color": "White"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'electrical')
    ),
    (
        'Southwire Romex SIMpull 250ft 12/2 WG',
        'southwire-romex-12-2',
        'Non-metallic sheathed cable for residential wiring. Coated for easier pulling.',
        158.00,
        40,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1000'],
        '{"gauge": "12 AWG", "conductors": "2 + Ground", "length": "250 ft"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'electrical')
    ),
    (
        'Commercial Electric 6in LED Recessed Trim',
        'led-recessed-trim',
        'Energy efficient LED downlight with 5 selectable color temperatures. Wet rated for showers.',
        14.97,
        120,
        11.97,
        ARRAY['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=1000'],
        '{"wattage": "9W", "lumens": "650", "cct": "Selectable"}'::jsonb,
        (SELECT id FROM categories WHERE slug = 'electrical')
    )
ON CONFLICT (slug) DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    stock = EXCLUDED.stock,
    sale_price = EXCLUDED.sale_price,
    images = EXCLUDED.images,
    specs = EXCLUDED.specs,
    category_id = EXCLUDED.category_id;
