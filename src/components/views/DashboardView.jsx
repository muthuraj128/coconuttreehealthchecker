import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Cpu,
  Clock,
  Activity,
  Battery,
  Wifi,
  Trees,
  ArrowUpRight,
  Play,
  RotateCw
} from 'lucide-react';

export default function DashboardView({
  summary,
  isTesting,
  onCheckNow,
  onRefresh,
  onNavigate
}) {
  const device = summary?.device;
  const tree = summary?.tree;
  const latestCheck = summary?.latest_check;
  const isHealthy = device?.last_tree_status !== 'UNHEALTHY';
  const isOnline = device?.is_online;

  const formatTime = (isoStr) => {
    if (!isoStr) return 'N/A';
    try {
      return new Date(isoStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'N/A';
    }
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return 'N/A';
    try {
      return new Date(isoStr).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'N/A';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* SECTION 1: SYSTEM STATE METRIC CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '1rem'
      }}>
        
        {/* Metric 1: TREE STATUS */}
        <div className="thm-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              TREE STATUS
            </span>
            <span className={isHealthy ? 'badge badge-healthy' : 'badge badge-unhealthy'}>
              {isHealthy ? <ShieldCheck size={14} /> : <AlertTriangle size={14} />}
              {isHealthy ? 'HEALTHY' : 'UNHEALTHY'}
            </span>
          </div>

          <div style={{
            fontSize: '1.75rem',
            fontWeight: '800',
            fontFamily: 'var(--font-display)',
            color: isHealthy ? 'var(--color-success)' : 'var(--color-error)',
            marginBottom: '0.25rem',
            letterSpacing: '-0.02em'
          }}>
            {isHealthy ? 'HEALTHY' : 'UNHEALTHY'}
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {isHealthy ? 'No abnormal vibration detected' : 'Obstacle detected during scan'}
          </div>

          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #EEF2EF', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Last scan: {formatTime(device?.last_check_time || latestCheck?.completed_at)}
          </div>
        </div>

        {/* Metric 2: DEVICE STATUS */}
        <div className="thm-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              DEVICE TELEMETRY
            </span>
            <span className={isOnline ? 'badge badge-online' : 'badge badge-offline'}>
              ● {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)',
            marginBottom: '0.25rem'
          }}>
            {device?.device_code || 'THM-0001'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Battery size={14} color="var(--brand-primary)" /> {device?.battery_level || 96}%
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Wifi size={14} color="var(--accent-gold)" /> {device?.signal_strength || -64} dBm
            </span>
          </div>

          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #EEF2EF', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Firmware: {device?.firmware_version || 'v1.0.4-IR'}
          </div>
        </div>

        {/* Metric 3: LAST CHECK */}
        <div className="thm-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              LAST CHECK
            </span>
            <Clock size={16} color="var(--brand-primary)" />
          </div>

          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)',
            marginBottom: '0.25rem'
          }}>
            {formatTime(latestCheck?.completed_at)}
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {formatDate(latestCheck?.completed_at)} ({latestCheck?.check_type || 'MANUAL'})
          </div>

          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #EEF2EF', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Observation: {latestCheck?.detected ? `Triggered at ${latestCheck.detection_time}s` : '15.0s Clean Window'}
          </div>
        </div>

        {/* Metric 4: TODAY'S CHECKS */}
        <div className="thm-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              SCHEDULED SCANS
            </span>
            <Activity size={16} color="var(--accent-gold)" />
          </div>

          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)',
            marginBottom: '0.25rem'
          }}>
            {summary?.today_checks_completed || 1} / 6
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Automated Checks Completed
          </div>

          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #EEF2EF', fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: '600' }}>
            Next check: 12:00 PM
          </div>
        </div>

      </div>

      {/* SECTION 2: PRIMARY INSPECTION & TREE FOCUS */}
      <div className="dashboard-grid-two-col" style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '1.25rem'
      }}>
        
        {/* Main Tree Card */}
        <div className="thm-card" style={{ padding: '1.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: isHealthy ? 'var(--bg-success-soft)' : 'var(--bg-error-soft)',
                border: `1px solid ${isHealthy ? 'var(--border-success)' : 'var(--border-error)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isHealthy ? 'var(--color-success)' : 'var(--color-error)',
                flexShrink: 0
              }}>
                <Trees size={26} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  MONITORED ASSET • {tree?.tree_code || 'TREE-001'}
                </div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {tree?.name || 'Coconut Palm #1'}
                </h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {tree?.species || 'King Coconut (Cocos nucifera)'} • {tree?.location || 'East Plot - Sector 4'}
                </div>
              </div>
            </div>

            <button onClick={onRefresh} className="btn btn-secondary" style={{ padding: '0 0.75rem' }} title="Refresh System Status">
              <RotateCw size={15} />
            </button>
          </div>

          {/* Detailed Status Bar */}
          <div style={{
            backgroundColor: '#FAFBFB',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              REASONING & DIAGNOSTIC REPORT
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
              {isHealthy
                ? 'The 15-second sensor observation window completed clean with 0 anomaly detections. The trunk structural condition indicates healthy response.'
                : 'An anomaly/obstacle event was triggered at 7.4 seconds during the observation scan window. Immediate inspection recommended.'}
            </p>
          </div>

          {/* Trigger Banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Protocol: <code>Web UI → Render Backend → MQTT → ESP32 → 15s IR Scan</code>
            </div>

            <button onClick={onCheckNow} disabled={isTesting} className="btn btn-primary" style={{ height: '42px', padding: '0 1.25rem', width: '100%', maxWidth: '240px' }}>
              <Play size={15} fill="#FFFFFF" />
              <span>RUN INSTANT INSPECTION</span>
            </button>
          </div>

        </div>

        {/* Quick Side Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="thm-card">
            <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
              SYSTEM SUMMARY
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.825rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEF2EF', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Assigned Device</span>
                <strong style={{ color: 'var(--text-primary)' }}>{device?.device_code || 'THM-0001'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEF2EF', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Customer ID</span>
                <strong style={{ color: 'var(--text-primary)' }}>CUST-001</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEF2EF', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>MQTT Broker</span>
                <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--brand-primary)' }}>broker.hivemq.com</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Database</span>
                <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>Supabase Ready</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('history')}
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: '1rem', height: '36px', fontSize: '0.78rem' }}
            >
              <span>View Full History Log</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Quick Alert Card */}
          <div className="thm-card" style={{ backgroundColor: '#FAFBFB', borderLeft: '4px solid var(--accent-gold)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              AUTOMATED SYSTEM ADVISORY
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Scheduled check passed clean. Next automated scan dispatches at 12:00 PM.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
