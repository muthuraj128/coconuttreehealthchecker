import React from 'react';
import { Cpu, Radio, Code2, X } from 'lucide-react';

export default function HardwareGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '680px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ backgroundColor: 'var(--brand-soft-bg)', padding: '0.625rem', borderRadius: '10px', color: 'var(--brand-primary)' }}>
            <Cpu size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              ESP32 & SENSOR HARDWARE GUIDE
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Tree Health Monitor • Device THM-0001 Hardware Setup
            </p>
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-color)', borderRadius: '10px', overflow: 'hidden', marginBottom: '1.25rem' }}>
          <table className="thm-table">
            <thead>
              <tr>
                <th>ESP32 BOARD PIN</th>
                <th>IR SENSOR PIN</th>
                <th>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: '700', color: 'var(--brand-primary)' }}>3V3 / 5V</td>
                <td>VCC</td>
                <td>Power Supply Pin</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '700', color: 'var(--brand-primary)' }}>GND</td>
                <td>GND</td>
                <td>Ground Reference</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '700', color: 'var(--color-info)' }}>GPIO 15</td>
                <td>OUT / Signal</td>
                <td>IR Sensor Digital Output</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '700', color: 'var(--color-error)' }}>GPIO 2</td>
                <td>Status LED</td>
                <td>Onboard Test Active Indicator</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem', fontSize: '0.8rem' }}>
          <div style={{ backgroundColor: '#FAFBFB', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              📚 Required Libraries:
            </div>
            <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.1rem', lineHeight: '1.5' }}>
              <li><code>PubSubClient</code> (by Nick O'Leary)</li>
              <li><code>ArduinoJson</code> (v6 / v7)</li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#FAFBFB', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              📡 MQTT Broker Details:
            </div>
            <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.1rem', lineHeight: '1.5' }}>
              <li>Broker: <code>broker.hivemq.com</code></li>
              <li>Port: <code>1883</code></li>
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--brand-soft-bg)', border: '1px solid var(--border-success)', padding: '0.85rem', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--brand-primary)' }}>
          <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <Code2 size={16} /> ESP32 C++ Code File:
          </div>
          Located in workspace: <code>firmware/esp32_thm/esp32_thm.ino</code>
        </div>

      </div>
    </div>
  );
}
