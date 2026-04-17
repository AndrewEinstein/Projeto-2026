import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function OfflineBanner(){
  const [online, setOnline] = useState(true)

  useEffect(()=>{
    let mounted = true
    async function check(){
      try{
        await api.get('/admin/metrics')
        if(mounted) setOnline(true)
      }catch(e){ if(mounted) setOnline(false) }
    }

    check()
    const id = setInterval(check, 10000)
    return ()=>{ mounted=false; clearInterval(id) }
  },[])

  if(online) return null

  return (
    <div style={{background:'#fee2e2',color:'#b91c1c',padding:12,borderRadius:8,marginBottom:12}}>
      Conexão perdida com o backend — some funcionalidades estarão indisponíveis.
    </div>
  )
}
