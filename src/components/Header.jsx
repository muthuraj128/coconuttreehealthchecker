import React from 'react';
import { Cpu, HelpCircle, Radio, Bell, Play, Loader2, Menu } from 'lucide-react';

export default function Header({
  title,
  device,
  isTesting,
  onCheckNow,
  onOpenSimulator,
  onOpenGuide,
  onToggleMobileMenu
}) {
  const isOnline = device?.is_online;

  return (
    <header className="header-container" style={{
      height: '70px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 90,
      boxShadow: 'var(--shadow-subtle)'
    }}>
      
      {/* Title & Mobile Hamburger Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={onToggleMobileMenu}
          className="mobile-menu-btn"
          title="Open Menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            lineHeight: 1.2
          }}>
            {title}
          </h1>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Monitor: <strong>{device?.device_code || 'THM-0001'}</strong></span>
          </div>
        </div>
      </div>

      {/* Quick Action Toolbar */}
      <div className="header-actions-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
        
        {/* Connection Status Badge */}
        <div className={isOnline ? 'badge badge-online' : 'badge badge-offline'} style={{ height: '36px' }}>
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: isOnline ? 'var(--color-success)' : 'var(--text-muted)'
          }}></span>
          <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
        </div>

        {/* Simulator Modal Trigger */}
        <button
          onClick={onOpenSimulator}
          className="btn btn-secondary"
          style={{ height: '36px', fontSize: '0.8rem', padding: '0 0.75rem' }}
          title="Hardware Simulator Configuration"
        >
          <Cpu size={15} color="var(--brand-primary)" />
          <span className="header-btn-text">Simulator</span>
        </button>

        {/* Hardware Circuit Guide Trigger */}
        <button
          onClick={onOpenGuide}
          className="btn btn-secondary"
          style={{ height: '36px', fontSize: '0.8rem', padding: '0 0.75rem' }}
          title="ESP32 Wiring & Firmware Guide"
        >
          <HelpCircle size={15} color="var(--accent-gold)" />
          <span className="header-btn-text">Guide</span>
        </button>

        {/* Primary Action Button: CHECK NOW */}
        <button
          onClick={onCheckNow}
          disabled={isTesting}
          className="btn btn-primary"
          style={{
            height: '36px',
            padding: '0 1rem',
            fontSize: '0.825rem',
            boxShadow: '0 2px 8px rgba(23, 107, 77, 0.25)'
          }}
        >
          {isTesting ? (
            <>
              <Loader2 size={15} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
              <span className="header-btn-text">RUNNING...</span>
            </>
          ) : (
            <>
              <Play size={14} fill="#FFFFFF" />
              <span>CHECK NOW</span>
            </>
          )}
        </button>

      </div>

    </header>
  );
}
