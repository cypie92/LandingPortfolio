import { createClient } from "@/utils/supabase/server";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Database } from "@/types/database.types";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/app/components/AddToCartButton";
import Reveal from "../../components/animations/Reveal";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const supabase = await createClient();
    const { slug } = await params;

    const { data: product } = await supabase
        .from("products")
        .select(`
            *,
            category:categories(*)
        `)
        .eq("slug", slug)
        .single();

    if (!product) {
        notFound();
    }

    // Fetch Related Products (same category, excluding current)
    const { data: relatedProducts } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", product.category_id)
        .neq("id", product.id)
        .limit(4);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                {/* Breadcrumbs */}
                <Reveal>
                    <div className="text-sm text-text-secondary mb-8">
                        <Link href="/categories" className="hover:text-primary">Categories</Link>
                        <span className="mx-2">/</span>
                        <Link href={`/categories/${product.category?.slug}`} className="hover:text-primary">{product.category?.name}</Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-900 dark:text-white font-medium">{product.name}</span>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {/* Image Gallery */}
                    <Reveal delay={0.1} className="h-full">
                        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark p-2 md:p-8 flex items-center justify-center aspect-square md:aspect-auto h-full">
                            {product.images?.[0] ? (
                                <img src={product.images[0]} alt={product.name} className="max-h-[500px] w-full object-contain" />
                            ) : (
                                <div className="text-gray-300">
                                    <span className="material-symbols-outlined text-9xl">image</span>
                                </div>
                            )}
                        </div>
                    </Reveal>

                    {/* Product Info */}
                    <div className="flex flex-col h-full">
                        <Reveal delay={0.2}>
                            <h1 className="text-3xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">{product.name}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                {product.sale_price ? (
                                    <>
                                        <span className="text-4xl font-bold text-red-500">${product.sale_price.toFixed(2)}</span>
                                        <span className="text-2xl text-text-secondary line-through">${product.price.toFixed(2)}</span>
                                        <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-sm font-bold uppercase">Sale</span>
                                    </>
                                ) : (
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
                                )}
                            </div>

                            <div className="prose dark:prose-invert text-text-secondary mb-8">
                                <p>{product.description}</p>
                            </div>
                        </Reveal>

                        {/* Specs Table */}
                        {product.specs && Object.keys(product.specs).length > 0 && (
                            <Reveal delay={0.3}>
                                <div className="mb-8 p-6 bg-gray-50 dark:bg-[#1A1D21] rounded-xl">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Specifications</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        {Object.entries(product.specs as Record<string, any>).map(([key, value]) => (
                                            <div key={key}>
                                                <span className="text-text-secondary capitalize">{key.replace(/_/g, " ")}:</span>
                                                <span className="block font-medium text-slate-900 dark:text-white">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        )}

                        <div className="mt-auto">
                            <Reveal delay={0.4}>
                                <div className="flex flex-col gap-4">
                                    <AddToCartButton product={product} />

                                    <p className="text-xs text-text-secondary flex items-center gap-2 mt-4 ml-1">
                                        <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                        {product.stock > 0 ? "In Stock & Ready for Pickup" : "Out of Stock"}
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-border-dark pt-12">
                        <Reveal>
                            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-8">You May Also Like</h2>
                        </Reveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((item, index) => (
                                <Reveal key={item.id} delay={index * 0.1} className="h-full">
                                    <Link href={`/products/${item.slug}`} className="group block h-full bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark overflow-hidden hover:shadow-lg transition-all">
                                        <div className="aspect-square bg-gray-100 dark:bg-[#1A1D21] relative flex items-center justify-center p-4">
                                            {item.images?.[0] ? (
                                                <img src={item.images[0]} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                                            ) : (
                                                <span className="material-symbols-outlined text-4xl text-gray-300">image</span>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-slate-900 dark:text-white truncate mb-1">{item.name}</h3>
                                            <p className="font-bold text-primary">${(item.sale_price || item.price).toFixed(2)}</p>
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
