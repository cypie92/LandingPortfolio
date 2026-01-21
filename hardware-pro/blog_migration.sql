-- Schema Migration for Posts table
DO $$
BEGIN
    -- 1. Create table if it doesn't exist
    CREATE TABLE IF NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT,
        image_url TEXT,
        category TEXT,
        read_time TEXT,
        published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        author TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- 2. Add columns if they are missing (in case table existed but was incomplete)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'excerpt') THEN
        ALTER TABLE posts ADD COLUMN excerpt TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'category') THEN
        ALTER TABLE posts ADD COLUMN category TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'read_time') THEN
        ALTER TABLE posts ADD COLUMN read_time TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'image_url') THEN
        ALTER TABLE posts ADD COLUMN image_url TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'published_at') THEN
        ALTER TABLE posts ADD COLUMN published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
     IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'author') THEN
        ALTER TABLE posts ADD COLUMN author TEXT;
    END IF;
END $$;

-- 3. Seed Blog Posts (Upsert) with FULL CONTENT
INSERT INTO posts (title, slug, excerpt, content, image_url, category, read_time, author)
VALUES
    (
        'How to fix a leaky faucet like a pro',
        'fix-leaky-faucet',
        'Stop the drip and save on your water bill. Our step-by-step guide makes this common repair simple.',
        'A dripping faucet is more than just a nuisance; it''s money down the drain. The good news is that fixing a leaky faucet is one of the most common and manageable DIY plumbing tasks. In this guide, we''ll walk you through the steps to identify the problem and fix it like a seasoned pro.

### Tools You''ll Need
Before you start, gather these essentials:
-   Adjustable wrench
-   Phillips and flathead screwdrivers
-   Replacement washers or O-rings (match your faucet type)
-   Plumber''s grease
-   A towel or rag

### Step 1: Turn Off the Water
This is critical! specific shutoff valves are usually located under the sink. Turn them clockwise until they stop. If you can''t find them, you may need to shut off the main water supply to your home. Open the faucet to drain any remaining water and relieve pressure.

### Step 2: Disassemble the Handle
Most faucets have a decorative cap on top of the handle that hides a screw. Use a flathead screwdriver to gently pry it off. Once exposed, remove the screw with a Phillips screwdriver and pull the handle off.

### Step 3: Remove the Cartridge or Stem
You''ll see a nut holding the internal mechanism in place. Use your adjustable wrench to loosen and remove it. Pull out the stem or cartridge. This is the heart of the faucet where the leak usually originates.

### Step 4: Inspect and Replace Parts
Check the O-rings and washers for wear, cracks, or mineral buildup. Take the old parts to your local hardware store to ensure you buy the exact replacements. Coat the new O-rings in plumber''s grease before installing them.

### Step 5: Reassemble and Test
Put everything back together in the reverse order. Turn the water supply back on slowly and check for leaks.

**Pro Tip:** If your faucet is old and corroded, it might be more cost-effective to replace the entire unit rather than hunting for specific parts.

By tackling this repair yourself, you''ve saved the cost of a service call and gained valuable DIY experience. Now enjoy the silence!',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAvN_pBh41ElSU-PaOvCq87tRsbmbZUKQNYSL2jLYg9AQ0WeHr1crbOqh8HQmvDBqSPVwqaxe9YDkZqOvX1HK4lX3FrjBz8ulc7RUVgjyKI805_23x2K1H6RU4p8pfhE-kr0G6Zi8zqTNPo4HP_dYSt5bR_q2SNB8pl0h6rLswwdCpyF9XLebJX3oGLQ7z7Z3IWQDx8GXiEO9EVfbtKCHvHYpD6OiJbSV0Ro796kB4P3lTXNMhlYPfN7lSsy-rR9O04WE62hNmw1P8',
        'PLUMBING',
        '5 min read',
        'Expert Plumber'
    ),
    (
        'The best drills for home improvement',
        'best-drills-2026',
        'We tested the top 10 cordless drills on the market. Find out which one belongs in your toolbox.',
        'Choosing the right drill can be overwhelming with so many options on the market. Whether you''re hanging pictures, building a deck, or assembling furniture, a reliable cordless drill is the backbone of any homeowner''s toolbox. We tested the leading models to bring you our top recommendations for 2026.

### 1. The All-Rounder: DeWalt 20V MAX XR
**Best for:** Serious DIYers and semi-pros.
The DeWalt XR series continues to dominate with its brushless motor technology, which offers 57% more runtime than brushed motors. It''s compact, powerful, and the battery ecosystem is unmatched.
*   **Pros:** Excellent power-to-weight ratio, durable build, bright LED light.
*   **Cons:** Slightly more expensive than entry-level models.

### 2. The Budget King: Ryobi ONE+ 18V HP
**Best for:** New homeowners and occasional users.
Ryobi has stepped up its game with the HP (High Performance) line. It delivers surprising torque at a fraction of the price of premium brands. Plus, the ONE+ battery works with over 260 tools.
*   **Pros:** Very affordable, massive tool compatibility, lightweight.
*   **Cons:** Charging speed is slower than competitors.

### 3. The Compact Beast: Milwaukee M12 Fuel
**Best for:** Tight spaces and cabinet work.
Don''t let the 12-volt battery fool you. This sub-compact drill packs a punch that rivals many 18V tools. It''s incredibly light and fits into corners where others can''t.
*   **Pros:** Unbeatable ergonomics, fits in a tool belt easily.
*   **Cons:** Battery life is shorter for heavy-duty drilling.

### Buying Guide: What to Look For
*   **Voltage:** 12V is great for light tasks; 18V/20V is standard for general construction.
*   **Brushless Motors:** They run cooler, last longer, and are more efficient than brushed motors. Worth the extra cost.
*   **Chuck Size:** A 1/2-inch chuck offers more versatility than a 3/8-inch chuck.

**Conclusion:** For most homeowners, the Ryobi ONE+ offers the best value. However, if you plan on tackling major renovations, investing in the DeWalt or Milwaukee ecosystem is a decision you won''t regret.',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBdoXq8ujkXPsc-Q1vvy4MC2LnLlhNURQ8jBwekUHGFP0EBjfsgQItHOufPoEqc0P8JTqW_uukctP7RlJ9ccCwaYDqGcYbk-ObRnSFAP6XzKkhFG52wrcqZv-pyfQ7CESRE5w5namZyBHd67EtYpnjdUzzNNeIYbRQidHnnWO44i3v1HgbNFaxMUS-HXEYfYvFIr8KhAMlrPVReAhaEkp1fcnr_fTgJ8KU9ovFCEDVmgM-vWOTzj4lP2otG8AdVaY08vx0vgYn2E84',
        'REVIEWS',
        '8 min read',
        'Tool Master'
    ),
    (
        'Safety First: Workshop Essentials',
        'workshop-safety',
        'Don''t start your next project without this checklist. Essential gear to keep you safe.',
        'A productive workshop is a safe workshop. Accidents happen in split seconds, often due to complacency or lack of proper gear. Before you fire up that saw or swing that hammer, ensure you have these safety essentials in place.

### 1. Eye Protection
This is non-negotiable. Safety glasses should be worn 100% of the time you are in the shop.
*   **Recommendation:** Look for ANSI Z87.1 rated glasses. Anti-fog coatings are a must for humid environments.

### 2. Hearing Protection
Hearing loss is cumulative and permanent. Power tools like routers and table saws can easily exceed 100 decibels.
*   **Recommendation:** Over-ear muffs offer superior protection and are easy to put on/off. For lighter work, quality foam earplugs will suffice.

### 3. Respiratory Protection
Wood dust isn''t just messy; it''s a health hazard. Long-term exposure can cause serious respiratory issues.
*   **Recommendation:** A simple N95 mask is good for sanding. For finishing or painting, use a respirator with replaceable organic vapor cartridges.

### 4. Fire Extinguisher
Sawdust + sparks + chemicals = high fire risk.
*   **Placement:** Mount a 5lb ABC-rated fire extinguisher near the exit of your shop, not right next to the hazard (so you don''t have to reach through fire to get it).

### 5. First Aid Kit
Keep a well-stocked kit visible and accessible.
*   **Must-haves:** Band-aids, sterile gauze, tweezers (for splinters), burn cream, and eye wash solution.

### Safe Habits
*   **Dress the Part:** No loose clothing, jewelry, or long hair that can get caught in rotating machinery.
*   **Clean Up:** A cluttered shop is a dangerous shop. Trip hazards account for a huge number of workshop injuries.
*   **Stay Sharp:** Dull blades require more force to cut and are more likely to bind and kick back.

Remember, the most dangerous tool in the shop is the operator. Stay alert, stay safe, and happy building!',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAY-IGwpPveSo2IIpoQXDqpz5v6eVRZUNznvdEep70CkTVU6C2a7d_VoLSqgExXGcpr_A76KExeeRORfIh06opc1GNh7Pwdl1lfDSh9_GTQXpfaO-CNc6APdrSMhcVaDVVZ13UUFVSh1ToC19lBUhYeAA9LTpltHncpQwTnxaEnaMDZ-noYPKE0x3m8NRa-CnjWJnq3zTnthdnzeqZuuRSfI10RvdIQ07luGnJXI4nhLtek55ruPCLQND2rDCcpkP0i0nMJsZepGT8',
        'SAFETY',
        '3 min read',
        'Safety Inspector'
    )
ON CONFLICT (slug) DO UPDATE
SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    image_url = EXCLUDED.image_url,
    category = EXCLUDED.category,
    read_time = EXCLUDED.read_time;
