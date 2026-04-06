import React from 'react'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart(){
  const { items, updateQuantity, removeItem, clear } = useCart()
  const navigate = useNavigate()

  const subtotal = items.reduce((s,i)=> s + i.product.price * i.quantity, 0)

  return (
    <div>
      <div className="header"><h1>Carrinho</h1></div>
      <div className="card">
        {items.length === 0 && <p>Seu carrinho está vazio. <Link to="/produtos">Ver produtos</Link></p>}
        {items.length > 0 && (
          <div>
            <table className="table">
              <thead><tr><th>Produto</th><th>Preço</th><th>Quantidade</th><th></th></tr></thead>
              <tbody>
                {items.map(i=> (
                  <tr key={i.product.id}>
                    <td>{i.product.name}</td>
                    <td>R$ {i.product.price}</td>
                    <td>
                      <input type="number" min={1} value={i.quantity} onChange={e=>updateQuantity(i.product.id, Number(e.target.value))} style={{width:80}} />
                    </td>
                    <td><button className="btn secondary" onClick={()=>removeItem(i.product.id)}>Remover</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
              <div>Subtotal: <strong>R$ {subtotal.toFixed(2)}</strong></div>
              <div>
                <button className="btn secondary" onClick={()=>{clear(); navigate('/produtos')}}>Limpar</button>
                <button className="btn" style={{marginLeft:8}} onClick={()=>navigate('/checkout')}>Finalizar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
