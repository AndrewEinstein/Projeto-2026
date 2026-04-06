import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import {
  LayoutDashboard,
  Package,
  Users,
  Receipt,
  Ticket,
  ShoppingCart,
  Menu
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/produtos', label: 'Produtos', icon: Package },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/pedidos', label: 'Pedidos', icon: Receipt },
  { to: '/cupons', label: 'Cupons', icon: Ticket },
  { to: '/carrinho', label: 'Carrinho', icon: ShoppingCart },
]

export default function Sidebar() {
  const { items: cartItems } = useCart()
  const [collapsed, setCollapsed] = useState(false)

  const count = Array.isArray(cartItems)
    ? cartItems.reduce((s, i) => s + (i.quantity || 0), 0)
    : 0

  // ripple effect
  const createRipple = (e) => {
    const button = e.currentTarget
    const circle = document.createElement('span')
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`
    circle.style.position = 'absolute'
    circle.style.borderRadius = '50%'
    circle.style.background = 'rgba(255,255,255,0.3)'
    circle.style.transform = 'scale(0)'
    circle.style.animation = 'ripple 0.6s linear'
    circle.style.pointerEvents = 'none'

    const ripple = button.getElementsByClassName('ripple')[0]
    if (ripple) ripple.remove()

    circle.classList.add('ripple')
    button.appendChild(circle)
  }

  return (
    <div style={{
      width: collapsed ? 80 : 260,
      height: '100vh',
      background: 'linear-gradient(180deg, #020617, #020617)',
      color: '#fff',
      padding: 16,
      transition: '0.3s',
      position: 'relative',
      boxShadow: '4px 0 20px rgba(0,0,0,0.5)'
    }}>

      {/* KEYFRAMES RIPPLE */}
      <style>
        {`
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* TOGGLE */}
      <div style={{
        display: 'flex',
        justifyContent: collapsed ? 'center' : 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        {!collapsed && (
          <h2 style={{
            fontWeight: 800,
            background: 'linear-gradient(90deg, #22d3ee, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Meu Sistema
          </h2>
        )}

        <Menu
          size={22}
          style={{ cursor: 'pointer' }}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* SEARCH */}
      {!collapsed && (
        <input
          placeholder="Buscar..."
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 8,
            border: '1px solid #1e293b',
            background: '#020617',
            color: '#fff',
            marginBottom: 16
          }}
        />
      )}

      {/* CARRINHO */}
      {!collapsed && (
        <div style={{
          fontSize: 12,
          color: '#94a3b8',
          marginBottom: 16
        }}>
          {count > 0 ? `Carrinho: ${count} itens` : 'Carrinho vazio'}
        </div>
      )}

      {/* NAV */}
      <nav>
        {NAV_ITEMS.map(i => {
          const Icon = i.icon

          return (
            <NavLink key={i.to} to={i.to} style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <div
                  onClick={createRipple}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    padding: '12px',
                    borderRadius: 12,
                    marginBottom: 8,
                    background: isActive
                      ? 'linear-gradient(90deg, #1e293b, #0f172a)'
                      : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)'
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#0f172a'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}>
                    <Icon
                      size={20}
                      color={isActive ? '#22d3ee' : '#cbd5f5'}
                      style={{
                        filter: isActive
                          ? 'drop-shadow(0 0 6px #22d3ee)'
                          : 'none'
                      }}
                    />

                    {!collapsed && (
                      <span style={{
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#fff' : '#cbd5f5',
                        textShadow: isActive
                          ? '0 0 8px rgba(34,211,238,0.6)'
                          : 'none'
                      }}>
                        {i.label}
                      </span>
                    )}
                  </div>

                  {!collapsed && i.to === '/carrinho' && count > 0 && (
                    <div style={{
                      background: '#22c55e',
                      padding: '4px 10px',
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                      boxShadow: '0 0 8px rgba(34,197,94,0.6)'
                    }}>
                      {count}
                    </div>
                  )}
                </div>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* USER */}
      {!collapsed && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 16,
          right: 16,
          borderTop: '1px solid #1e293b',
          paddingTop: 12
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}>
              A
            </div>

            <div>
              <div style={{ fontWeight: 700 }}>Admin</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>
                admin@email.com
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}