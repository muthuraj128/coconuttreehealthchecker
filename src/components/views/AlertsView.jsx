import React from 'react';
import { Bell, AlertTriangle, ShieldCheck, Cpu, Info, CheckCircle2 } from 'lucide-react';

export default function AlertsView({ summary }) {
  const device = summary?.device;

  const sampleAlerts = [
    {
      id: 'alt-1',
      title: 'Automated Inspection Completed',
      message: 'THM-0001 completed morning automated scan. Tree status: HEALTHY.',
      time: '10:00 AM',
      type: 'INFO',
      icon: ShieldCheck,
      color: 'var(--color-success)'
    },
    {
      id: 'alt-2',
      title: 'Device Heartbeat Received',
      message: 'THM-0001 hardware telemetry pinged. Battery: 96%, RSSI: -64 dBm.',
      time: '10:42 AM',
      type: 'SYSTEM',
      icon: Cpu,
      color: 'var(--brand-primary)'
    },
    {
      id: 'alt-3',
      title: 'Observation Window Calibrated',
      message: '15-second IR observation scan protocol initialized clean.',
      time: '08:00 AM',
      type: 'INFO',
      icon: Info,
      color: 'var(--color-info)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          SYSTEM ADVISORIES & ALERTS
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Real-time notifications, threshold alerts, and device status updates
        </p>
      </div>

      <div className="thm-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {sampleAlerts.map((alert, idx) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  borderBottom: idx < sampleAlerts.length - 1 ? '1px solid #EEF2EF' : 'none'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: alert.type === 'INFO' ? 'var(--bg-success-soft)' : 'var(--bg-info-soft)',
                  color: alert.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={20} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {alert.title}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alert.time}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {alert.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
