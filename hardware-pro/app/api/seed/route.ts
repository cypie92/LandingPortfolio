import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = await createClient();

    // 1. Create Categories
    const categories = [
        { name: 'Power Tools', slug: 'power-tools', description: 'Drills, Saws, Sanders', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAsQmUZxInkDJSRECC5Zq0fa4jHVI5wLwRfn_tC6NqG5gPjJ5SJNmhj2-JBb2DxoU3jnlX83Rn4Gt-x4901nuJO2PNUmHdqu60FFJzgoUNyB7he4isPBgyKptfOy4y1d0jumTqxMFlgBaHQVkbOEL9UOmhEtXFPdovdN2AT2gndlOHz_1E9f-FVAyAon_nQhmK49cjmIs8dDeKfdqClAqndOvvb4hUZbDrW1YayT9LeB1f6bsasKmVxxyeW5RHcnEPB-YORr_0o8Y' },
        { name: 'Plumbing', slug: 'plumbing', description: 'Pipes, Wrenches, Fixtures', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU4ylyF6ajz4QdVckQBj276TTBmfVQXMW-sNBySazuXrTrh75lYMJ3tK9yRKCxFwqykZS8txxQMTCDz5i20F78TdBM9_panLRJthamw1bixa7jS2M170myy9bpJyY3GUN5n_cfRSSxJS22Wj230LqcRInUihgh3NB1jmv4YymDa-YBSQjJWWcYfEL9hKg2QXCg92aGlIgii_Hptcj8-FTonDxKx9jwqk9JVjEvl69-eJfSRjaZQHD53jTI_GU29Kz-1DK-xJKSa04' },
        { name: 'Electrical', slug: 'electrical', description: 'Wiring, Outlets, Breakers', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpz_u8jEdOaPtH_u8smaEBVUlgnUH2pmv9uHWIEsAQKVOfn_8nBnzK5yt0Jfza1joksx6X73TbBel34f0mjXQo4YkHFAc_3gdcAhcmgCuLVzpKjXjntG3LJgcEDBvBEjVbpYxvtrSpXzLx0NnA7Yskr0DDO-NnV37y3f7Ep2Rur4uejaOZmeEZ7ESdJjMl8P9DaFjGqOJXeLoe5MxPiHupH1mp_w_ByZZZX76ABpm_jFCFkpzOPg3kh356K1zJyV9Jpb9hOPy1v94' },
        { name: 'Gardening', slug: 'gardening', description: 'Shovels, Rakes, Hoses', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATwFQ2KpZ6AGvPQraJpnU0y0OT-yZqhTTW_PWLJOv-a50DDQjyfi_s8uNqnrS2ZXntDzrCU6oyXWDzMle8Y_gLLsgCRHXQsKyOXxp6Ks2FHaGVwIiDyJRLqXRTcjZzHgBSN7aRi_g5GEFeNVrzJ16esmw2L6Zq5E79z8d95UTaHRJE52oJ-pgKTzcQ28IasPuSCA_a34FcvjfrjBW58lpjoIw3MeJnfKq3NRVE2GCUwF8-Z2G4O21u5nFdpYF56ucZceR1wCF27eM' },
    ];

    const { data: catData, error: catError } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' }).select();

    if (catError) return NextResponse.json({ error: catError.message }, { status: 500 });

    // 2. Create Products
    const products = [
        {
            name: 'X200 Impact Driver',
            slug: 'x200-impact-driver',
            description: 'Brushless motor, 20V battery included.',
            price: 129.99,
            stock: 50,
            images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDUTtNtHLszQvg2N6OS0wyuq4q8qIZX0N-zSLMPKenFdRZ1b0IMP7nU_kcFo3LciOmThb8ZQ54d-IMmHnk7iiz2rf8xRyITyqvcrBKP0FFh38W_KzZHfktfkOH-NmAQFGmGG9YnStwPPoJCS-blfViStLVWBTd5zoubax33GDS9vBRju5KdNCcYT1mPyl74hmV__fgmUZ7hr_hZdFEKLKhcV1Q_nL0COofy2yPFVsdpcFmXWMhIgVdGtKE03LY56t7xISmjXdRSZOY'],
            category_slug: 'power-tools'
        },
        {
            name: 'Titanium Claw Hammer',
            slug: 'titanium-claw-hammer',
            description: 'Shock absorption grip, magnetic nail starter.',
            price: 34.50,
            stock: 100,
            images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBWiyXBXZihGUsBKLZUkXGxNv98qObIU8izWWyGDYgnwQDOvf7e0tmgqWUIm4OxZ3KKg24IuUMkmjencZ-gSjbvrX0FyPVNxCi70PW0wIjdGw9tHq88VGs0vAN5v5AhbZo7GeXiDnVQxWd_B4k1EXZVd9T5iXznMY_X9yzlJnK2GI07vg1NdYyLuv1YZgkR9mi02_lvw0D64RFiRpXglDowXOsMkVWsCcKj29Q8R8BqAmSXFu08HMkrNqFuqiL-3dTDn-B1zwQcBwA'],
            category_slug: 'power-tools' // Assuming hammer goes here for now or Generic
        },
        {
            name: 'ProGuard Safety Glasses',
            slug: 'proguard-safety-glasses',
            description: 'Anti-fog, scratch resistant, UV protection.',
            price: 12.99,
            stock: 200,
            images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBlVz0ya_SvuTLNOaBACCoObcaB-r32POeD0VSxPezJQ87JHtHlS5eQI32lEvx_O3hXTtUiCSMmnPCmMkRt-joC2vdVwpBIxsEYbXD9wqxgaQhHzuoHabU6NIX6AGQ9Kxy1DyjihQGDfIxTBnADtg5hJAWKLRqSHOIjF0WHbrmj0oqKNqHBDkTgZhNW2Z1B1FKanYQj1l3_RdRVmB-2-OuHeGZdGu7rHUCsDyZi63s5IipvSjw5783mOgUeS3tjMUR_XJSouWfm-7I'],
            category_slug: 'power-tools' // Fallback
        },
        {
            name: '25ft Auto-Lock Tape',
            slug: '25ft-auto-lock-tape',
            description: 'Heavy duty casing, magnetic hook.',
            price: 19.99,
            stock: 150,
            images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAB1YIzrBIRXyylKLr116YLn0FaB1evvft2W5OuyZ2AZLUf4-_2sKGgUFPtPhvuHYiA4BvRgPSwU-H_lV_BVYETkQ55ld7XU2X8cdEiRVtiEpbXqYGtseiSxltMVqJzEUjDSRrUKwPqjBO0wx6nc7KyQs-KregnDf7Kqut8DRDLYvwzJF3B6LVpLSw480eFXAtFUYt8dvlNmKDWNp_aB466y5n8e4oNl-ADpXYkBepjVtcasMlwMI9CqV8kv7esnLcAN8VZfqulU0k'],
            category_slug: 'power-tools' // Fallback
        }
    ];

    // Map category slugs to IDs
    const productsWithIds = products.map(p => {
        const cat = catData.find(c => c.slug === p.category_slug);
        return {
            name: p.name,
            slug: p.slug,
            description: p.description,
            price: p.price,
            stock: p.stock,
            images: p.images,
            category_id: cat ? cat.id : null
        };
    });

    const { error: prodError } = await supabase.from('products').upsert(productsWithIds, { onConflict: 'slug' });

    if (prodError) return NextResponse.json({ error: prodError.message }, { status: 500 });

    return NextResponse.json({ success: true, message: 'Database seeded successfully!' });
}
