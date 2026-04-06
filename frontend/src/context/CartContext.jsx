import React, { createContext, useContext, useState } from 'react'
import api from '../services/api'

const CartContext = createContext()

export function CartProvider({ children }){
  const [items, setItems] = useState([])

  function addToCart(product, quantity = 1){
    setItems(prev => {
      const found = prev.find(i => i.product.id === product.id)
      if(found) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      return [...prev, { product, quantity }]
    })
  }

  function updateQuantity(productId, quantity){
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i))
  }

  function removeItem(productId){
    setItems(prev => prev.filter(i => i.product.id !== productId))
  }

  function clear(){ setItems([]) }

  async function checkout(customer){
    const payload = {
      customer,
      items: items.map(i => ({ productId: i.product.id, quantity: i.quantity }))
    }
    const res = await api.post('/checkout', payload)
    return res
  }

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeItem, clear, checkout }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
