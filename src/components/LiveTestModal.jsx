import React, { useState, useEffect } from 'react';
import {
  Radio,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  X
} from 'lucide-react';

export default function LiveTestModal({
  isOpen,
  onClose,
  latestResult,
  onTriggerObstacle
}) {
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [testPhase, setTestPhase] = useState('INITIATING'); // INITIATING, TESTING, COMPLETED
  const [obstacleSimulated, setObstacleSimulated] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(15);
      setTestPhase('INITIATING');
      setObstacleSimulated(false);
      return;
    }

    setTestPhase('TESTING');
    setSecondsLeft(15);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTestPhase('COMPLETED');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (latestResult && testPhase === 'TESTING') {
      setTestPhase('COMPLETED');
    }
  }, [latestResult]);

  if (!isOpen) return null;

  const progressPercent = ((15 - secondsLeft) / 15) * 100;
  const isHealthyResult = latestResult?.result === 'HEALTHY' || (!latestResult && secondsLeft === 0 && !obstacleSimulated);
  const isUnhealthyResult = latestResult?.result === 'UNHEALTHY' || obstacleSimulated;

  const handleSimulateObstacleClick = () => {
    setObstacleSimulated(true);
    setTestPhase('COMPLETED');
    if (onTriggerObstacle) onTriggerObstacle();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Radio size={22} color="var(--brand-primary)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            SENSOR OBSERVATION SCAN
          </h3>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Monitoring Target Device: <strong>THM-0001</strong> • 15.0-Second Inspection Window
        </p>

        {testPhase === 'TESTING' && (
          <div>
            {/* Animated Gauge */}
            <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 1.5rem auto' }}>
              <svg width="150" height="150" viewBox="0 0 150 150">
                <circle cx="75" cy="75" r="65" stroke="#E1E8E4" strokeWidth="10" fill="none" />
                <circle
                  cx="75"
                  cy="75"
                  r="65"
                  stroke="var(--brand-primary)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="408"
                  strokeDashoffset={408 - (408 * progressPercent) / 100}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s linear', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div style={{ fontSize: '2.25rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--brand-primary)' }}>
                  {String(secondsLeft).padStart(2, '0')}s
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                  REMAINING
                </div>
              </div>
            </div>

            {/* Protocol Steps */}
            <div style={{ backgroundColor: '#FAFBFB', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                COMMUNICATION DISPATCH SEQUENCE:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', fontSize: '0.725rem', textAlign: 'center' }}>
                <div style={{ backgroundColor: 'var(--bg-success-soft)', padding: '0.4rem', borderRadius: '6px', color: 'var(--color-success)', fontWeight: '600' }}>✓ Web UI</div>
                <div style={{ backgroundColor: 'var(--bg-success-soft)', padding: '0.4rem', borderRadius: '6px', color: 'var(--color-success)', fontWeight: '600' }}>✓ Backend</div>
                <div style={{ backgroundColor: 'var(--bg-success-soft)', padding: '0.4rem', borderRadius: '6px', color: 'var(--color-success)', fontWeight: '600' }}>✓ MQTT</div>
                <div style={{ backgroundColor: '#E0F2FE', padding: '0.4rem', borderRadius: '6px', color: '#0284C7', fontWeight: '700' }}>📡 ESP32 Scan</div>
              </div>
            </div>

            {/* Simulated Trigger Control */}
            <div style={{ backgroundColor: 'var(--bg-error-soft)', border: '1px dashed var(--border-error)', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-error)', fontWeight: '700', marginBottom: '0.25rem' }}>
                🧪 Prototype Demo Controller:
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Simulate an IR obstacle detection at 7.4 seconds (Triggers UNHEALTHY result):
              </p>
              <button onClick={handleSimulateObstacleClick} className="btn btn-danger" style={{ width: '100%', height: '36px', fontSize: '0.8rem' }}>
                <AlertTriangle size={14} /> Simulate IR Obstacle Detection (Unhealthy)
              </button>
            </div>
          </div>
        )}

        {testPhase === 'COMPLETED' && (
          <div style={{ padding: '0.5rem 0' }}>
            <div style={{
              backgroundColor: isUnhealthyResult ? 'var(--bg-error-soft)' : 'var(--bg-success-soft)',
              border: `1px solid ${isUnhealthyResult ? 'var(--border-error)' : 'var(--border-success)'}`,
              padding: '1.5rem',
              borderRadius: '14px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                {isUnhealthyResult ? <XCircle size={52} color="var(--color-error)" /> : <CheckCircle2 size={52} color="var(--color-success)" />}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: isUnhealthyResult ? 'var(--color-error)' : 'var(--color-success)', marginBottom: '0.25rem' }}>
                {isUnhealthyResult ? 'TREE STATUS: UNHEALTHY' : 'TREE STATUS: HEALTHY'}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                {isUnhealthyResult
                  ? `IR Obstacle Detected at ${latestResult?.detection_time || '7.4'} seconds!`
                  : 'Full 15.0-second scan completed with 0 obstacle events detected.'}
              </p>
            </div>

            <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
              RETURN TO DASHBOARD
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
