export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    full_name: string | null
                    phone: string | null
                    address: Json | null
                    role: 'user' | 'admin'
                }
                Insert: {
                    id: string
                    full_name?: string | null
                    phone?: string | null
                    address?: Json | null
                    role?: 'user' | 'admin'
                }
                Update: {
                    id?: string
                    full_name?: string | null
                    phone?: string | null
                    address?: Json | null
                    role?: 'user' | 'admin'
                }
            }
            categories: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    image_url: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    image_url?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    image_url?: string | null
                    created_at?: string
                }
            }
            products: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    price: number
                    stock: number
                    category_id: string | null
                    images: string[] | null
                    specs: Json | null
                    sale_price: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    price: number
                    stock?: number
                    category_id?: string | null
                    images?: string[] | null
                    specs?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    price?: number
                    stock?: number
                    category_id?: string | null
                    images?: string[] | null
                    specs?: Json | null
                    created_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    user_id: string | null
                    guest_info: Json | null
                    order_code: string | null
                    status: string | null
                    total_amount: number
                    pickup_details: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    guest_info?: Json | null
                    order_code?: string | null
                    status?: string | null
                    total_amount: number
                    pickup_details?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    guest_info?: Json | null
                    order_code?: string | null
                    status?: string | null
                    total_amount?: number
                    pickup_details?: Json | null
                    created_at?: string
                }
            }
            order_items: {
                Row: {
                    id: string
                    order_id: string
                    product_id: string
                    quantity: number
                    price_at_time: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    product_id: string
                    quantity: number
                    price_at_time: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    product_id?: string
                    quantity?: number
                    price_at_time?: number
                    created_at?: string
                }
            }
            wishlist: {
                Row: {
                    id: string
                    user_id: string
                    product_id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    product_id: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    product_id?: string
                    created_at?: string
                }
            }
            posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    excerpt: string | null
                    content: string | null
                    image_url: string | null
                    category: string | null
                    read_time: string | null
                    published_at: string | null
                    author: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    excerpt?: string | null
                    content?: string | null
                    image_url?: string | null
                    category?: string | null
                    read_time?: string | null
                    published_at?: string | null
                    author?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    excerpt?: string | null
                    content?: string | null
                    image_url?: string | null
                    category?: string | null
                    read_time?: string | null
                    published_at?: string | null
                    author?: string | null
                    created_at?: string
                }
            }
        }
    }
}
