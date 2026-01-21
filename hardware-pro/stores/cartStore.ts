import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Database } from '@/types/database.types'

type Product = Database['public']['Tables']['products']['Row']

export interface CartItem extends Product {
    quantity: number
}

interface CartState {
    items: CartItem[]
    isOpen: boolean
    addItem: (product: Product) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    toggleCart: () => void
    totalItems: () => number
    totalPrice: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (product) => {
                const { items } = get()
                const existingItem = items.find((item) => item.id === product.id)

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true,
                    })
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }], isOpen: true })
                }
            },
            removeItem: (productId) => {
                set({ items: get().items.filter((item) => item.id !== productId) })
            },
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId)
                    return
                }
                set({
                    items: get().items.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                })
            },
            clearCart: () => set({ items: [] }),
            toggleCart: () => set({ isOpen: !get().isOpen }),
            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: () =>
                get().items.reduce((acc, item) => acc + (item.sale_price || item.price) * item.quantity, 0),
        }),
        {
            name: 'hardware-cart-storage',
        }
    )
)
