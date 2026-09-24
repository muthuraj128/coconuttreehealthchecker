import React from 'react';
import { Cpu, Wifi, Battery, Radio, Sliders, CheckCircle2, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

export default function DevicesView({
  summary,
  onOpenSimulator,
  onOpenGuide
}) {
  const device = summary?.device;
  const isOnline = device?.is_online;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            REGISTERED IOT HARDWARE DEVICES
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Physical ESP32 microcontrollers and virtual simulators assigned to your customer account
          </p>
        </div>

        <button onClick={onOpenSimulator} className="btn btn-secondary">
          <Sliders size={16} /> Configure Simulator
        </button>
      </div>

      {/* Main Device Grid Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        
        {/* Device 1: THM-0001 */}
        <div className="thm-card" style={{ borderTop: '4px solid var(--brand-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: 'var(--brand-soft-bg)',
                color: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Cpu size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {device?.device_code || 'THM-0001'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Assigned Tree: <strong>{summary?.tree?.tree_code || 'TREE-001'}</strong>
                </div>
              </div>
            </div>

            <span className={isOnline ? 'badge badge-online' : 'badge badge-offline'}>
              ● {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          <hr style={{ borderColor: 'var(--border-color)', margin: '1rem 0' }} />

          {/* Device Telemetry Rows */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.825rem', marginBottom: '1.25rem' }}>
            <div style={{ backgroundColor: '#FAFBFB', padding: '0.75rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                BATTERY LEVEL
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Battery size={16} /> {device?.battery_level || 96}%
              </div>
            </div>

            <div style={{ backgroundColor: '#FAFBFB', padding: '0.75rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                WI-FI SIGNAL
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Wifi size={16} color="var(--accent-gold)" /> {device?.signal_strength || -64} dBm
              </div>
            </div>

            <div style={{ backgroundColor: '#FAFBFB', padding: '0.75rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                FIRMWARE
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                {device?.firmware_version || 'v1.0.4-IR'}
              </div>
            </div>

            <div style={{ backgroundColor: '#FAFBFB', padding: '0.75rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                OBSERVATION SENSOR
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--brand-primary)' }}>
                IR Trigger (Prototype)
              </div>
            </div>
          </div>

          <button onClick={onOpenGuide} className="btn btn-secondary" style={{ width: '100%', height: '38px', fontSize: '0.825rem' }}>
            <Radio size={14} /> View Hardware Wiring & MQTT Schema
          </button>
        </div>

      </div>

      {/* MQTT Channel Info */}
      <div className="thm-card" style={{ backgroundColor: '#FAFBFB' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          📡 ENTERPRISE MQTT PROTOCOL MAP
        </h3>
        <table className="thm-table" style={{ background: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <thead>
            <tr>
              <th>CHANNEL DIRECTION</th>
              <th>MQTT TOPIC STRING</th>
              <th>QOS LEVEL</th>
              <th>PAYLOAD CONTENT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Backend → ESP32</td>
              <td><code>devices/THM-0001/command</code></td>
              <td>QoS 1</td>
              <td><code>{"{\"action\":\"START_TEST\"}"}</code></td>
            </tr>
            <tr>
              <td>ESP32 → Backend</td>
              <td><code>devices/THM-0001/result</code></td>
              <td>QoS 1</td>
              <td><code>{"{\"device_id\":\"THM-0001\",\"result\":\"HEALTHY\",\"detected\":false}"}</code></td>
            </tr>
            <tr>
              <td>ESP32 → Backend</td>
              <td><code>devices/THM-0001/status</code></td>
              <td>QoS 0</td>
              <td><code>{"{\"device_id\":\"THM-0001\",\"online\":true,\"rssi\":-64}"}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
