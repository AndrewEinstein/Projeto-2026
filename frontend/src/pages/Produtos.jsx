import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import api from '../services/api'
import Modal from '../components/Modal'
import { useCart } from '../context/CartContext'

export default function Produtos(){
  const [produtos,setProdutos]=useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name:'', price:'', stock:'' })
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { addToCart } = useCart()

  useEffect(()=>{fetchProducts()},[])

  async function fetchProducts(){
    setLoading(true)
    setError(null)
    try{
      const data = await api.get('/products')
      setProdutos(data)
    }catch(err){
      console.error(err)
      setError('Erro ao carregar produtos — verifique o backend')
    }finally{
      setLoading(false)
    }
  }

  function handleCreate(){
    setEditId(null)
    setForm({ name:'', price:'', stock:'' })
    setShowModal(true)
  }

  function handleEdit(produto){
    setEditId(produto.id)
    setForm({
      name: produto.name,
      price: produto.price,
      stock: produto.stock
    })
    setShowModal(true)
  }

  async function submitForm(e){
    e.preventDefault()

    const name = form.name.trim()
    const price = Number(form.price || 0)
    const stock = Number(form.stock || 0)

    if(!name) return alert('Nome é obrigatório')

    try{
      if(editId){
        await api.put(`/products/${editId}`, { name, price, stock })
      } else {
        await api.post('/products', { name, price, stock })
      }

      fetchProducts()
      setShowModal(false)
      setForm({ name:'', price:'', stock:'' })
      setEditId(null)

    }catch(err){
      console.error(err)
      alert('Erro ao salvar produto')
    }
  }

  function handleAddToCart(p){
    addToCart(p,1)
    alert('Adicionado ao carrinho')
  }

  return (
    <div>

      <Modal 
        open={showModal} 
        title={editId ? "Editar produto" : "Novo produto"} 
        onClose={()=>setShowModal(false)}
      >
        <form onSubmit={submitForm}>
          <div style={{marginBottom:8}}>
            <label>Nome</label>
            <input 
              value={form.name} 
              onChange={e=>setForm({...form,name:e.target.value})} 
              style={{width:'100%',padding:8}} 
            />
          </div>

          <div style={{display:'flex',gap:8}}>
            <div style={{flex:1}}>
              <label>Preço</label>
              <input 
                value={form.price} 
                onChange={e=>setForm({...form,price:e.target.value})} 
                style={{width:'100%',padding:8}} 
              />
            </div>

            <div style={{width:120}}>
              <label>Estoque</label>
              <input 
                value={form.stock} 
                onChange={e=>setForm({...form,stock:e.target.value})} 
                style={{width:'100%',padding:8}} 
              />
            </div>
          </div>

          <div style={{marginTop:12,display:'flex',justifyContent:'flex-end',gap:8}}>
            <button type="button" className="btn secondary" onClick={()=>setShowModal(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn">
              {editId ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </Modal>

      <div className="header">
        <h1>Produtos</h1>
        <button className="btn" onClick={handleCreate}>
          Novo produto
        </button>
      </div>

      <div className="card">
        {error && (
          <div style={{ background: '#ffe6e6', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 12 }}>
            {error}
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
                <tr><td colSpan={4}><div style={{display:'flex',alignItems:'center',gap:8}}><Spinner size={18}/> Carregando produtos...</div></td></tr>
            ) : produtos.length === 0 ? (
              <tr><td colSpan={4}>Nenhum produto</td></tr>
            ) : (
              produtos.map(p=> (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>R$ {p.price}</td>
                <td>{p.stock}</td>

                <td style={{display:'flex',gap:8}}>
                  <button className="btn" onClick={()=>handleAddToCart(p)}>
                    Adicionar
                  </button>

                  <button 
                    className="btn secondary"
                    onClick={()=>handleEdit(p)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}