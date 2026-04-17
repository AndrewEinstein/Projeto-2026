import React from 'react'

export default function Spinner({ size = 36 }){
  const s = size
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <svg width={s} height={s} viewBox="0 0 50 50" style={{margin:'12px'}}>
        <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <path d="M45 25a20 20 0 0 1-20 20" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" fill="none">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  )
}
