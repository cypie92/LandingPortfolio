import { createClient } from "@/utils/supabase/server";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Database } from "@/types/database.types";
import { notFound } from "next/navigation";
import Reveal from "../../components/animations/Reveal";
import EmptyState from "../../components/EmptyState";

type Product = Database["public"]["Tables"]["products"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

export default async function CategoryProductPage({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ sort?: string; minPrice?: string; maxPrice?: string }>
}) {
    const supabase = await createClient();
    const { slug } = await params;
    const resolvedSearchParams = await searchParams;

    // 1. Get Category ID from Slug
    const { data: category } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!category) {
        notFound();
    }

    // 2. Build Query
    let query = supabase
        .from("products")
        .select("*")
        .eq("category_id", category.id);

    // 3. Apply Filters
    if (resolvedSearchParams.minPrice) {
        query = query.gte("price", resolvedSearchParams.minPrice);
    }
    if (resolvedSearchParams.maxPrice) {
        query = query.lte("price", resolvedSearchParams.maxPrice);
    }

    // 4. Apply Sorting
    if (resolvedSearchParams.sort === "price_asc") {
        query = query.order("price", { ascending: true });
    } else if (resolvedSearchParams.sort === "price_desc") {
        query = query.order("price", { ascending: false });
    } else {
        query = query.order("created_at", { ascending: false }); // Default: Newest
    }

    const { data: products, error } = await query;

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <Navbar />

            {/* Header */}
            <div className="bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-border-dark py-12">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <Reveal>
                            <div className="text-sm text-text-secondary mb-2">
                                <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link> / {category.name}
                            </div>
                            <h1 className="text-4xl font-bold font-display text-slate-900 dark:text-white">{category.name}</h1>
                        </Reveal>

                        {/* Sort Dropdown */}
                        <Reveal delay={0.1}>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-text-secondary">Sort by:</span>
                                <div className="flex gap-2">
                                    <Link href={{ query: { ...resolvedSearchParams, sort: 'newest' } }} className={`px-3 py-1 text-sm rounded-full ${!resolvedSearchParams.sort || resolvedSearchParams.sort === 'newest' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-[#1A1D21] text-text-secondary'}`}>Newest</Link>
                                    <Link href={{ query: { ...resolvedSearchParams, sort: 'price_asc' } }} className={`px-3 py-1 text-sm rounded-full ${resolvedSearchParams.sort === 'price_asc' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-[#1A1D21] text-text-secondary'}`}>Price Low</Link>
                                    <Link href={{ query: { ...resolvedSearchParams, sort: 'price_desc' } }} className={`px-3 py-1 text-sm rounded-full ${resolvedSearchParams.sort === 'price_desc' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-[#1A1D21] text-text-secondary'}`}>Price High</Link>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-12">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 shrink-0 space-y-8">
                    <Reveal delay={0.2} x={-20} y={0}>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Price Range</h3>
                            <div className="space-y-2">
                                <Link href={{ query: { ...resolvedSearchParams, minPrice: 0, maxPrice: 50 } }} className="block text-text-secondary hover:text-primary">Under $50</Link>
                                <Link href={{ query: { ...resolvedSearchParams, minPrice: 50, maxPrice: 100 } }} className="block text-text-secondary hover:text-primary">$50 - $100</Link>
                                <Link href={{ query: { ...resolvedSearchParams, minPrice: 100, maxPrice: 500 } }} className="block text-text-secondary hover:text-primary">$100 - $500</Link>
                                <Link href={{ query: { ...resolvedSearchParams, minPrice: 500 } }} className="block text-text-secondary hover:text-primary">$500+</Link>
                                {(resolvedSearchParams.minPrice || resolvedSearchParams.maxPrice) && (
                                    <Link href={{ query: { ...resolvedSearchParams, minPrice: undefined, maxPrice: undefined } }} className="block mt-4 text-sm text-red-500 hover:underline">Clear Filter</Link>
                                )}
                            </div>
                        </div>
                    </Reveal>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product, index) => (
                                <Reveal key={product.id} delay={index * 0.1} className="h-full">
                                    <Link href={`/products/${product.slug}`} className="group block h-full bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark overflow-hidden hover:shadow-xl transition-all">
                                        <div className="aspect-[4/3] bg-gray-100 dark:bg-[#1A1D21] relative overflow-hidden">
                                            {product.images?.[0] ? (
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="flex items-center justify-center w-full h-full text-gray-300">
                                                    <span className="material-symbols-outlined text-4xl">image</span>
                                                </div>
                                            )}
                                            {/* Sale Badge */}
                                            {product.sale_price && (
                                                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                                    Sale
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 truncate group-hover:text-primary transition-colors">{product.name}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                {product.sale_price ? (
                                                    <>
                                                        <span className="text-lg font-bold text-red-500">${product.sale_price.toFixed(2)}</span>
                                                        <span className="text-sm text-text-secondary line-through">${product.price.toFixed(2)}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-lg font-bold text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No products found"
                            description="We couldn't find any products in this category at the moment. Please check back later."
                            actionLabel="Browse all categories"
                            actionLink="/categories"
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
