import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  return (
    <div style={{maxWidth:600,margin:'80px auto',textAlign:'center'}} className="card">
      <h2 style={{marginBottom:8}}>A tela de login foi removida</h2>
      <p style={{color:'var(--muted)'}}>O painel agora abre diretamente. Use a interface para testar funcionalidades.</p>
    </div>
  )
}
