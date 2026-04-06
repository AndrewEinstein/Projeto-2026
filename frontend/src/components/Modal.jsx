import React from 'react'

export default function Modal({ open, title, children, onClose }){
  if(!open) return null
  return (
    <div style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:60}}>
      <div style={{position:'absolute',inset:0,background:'rgba(2,6,23,0.6)'}} onClick={onClose} />
      <div style={{position:'relative',width:480,maxWidth:'90%'}} className="card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <h3 style={{margin:0}}>{title}</h3>
          <button className="btn secondary" onClick={onClose}>Fechar</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
