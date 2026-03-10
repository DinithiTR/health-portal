import React, { useMemo } from 'react';
import {
  AdaptiveGrid,
  AdaptiveCard,
  AdaptiveText,
  AdaptiveTable,
  AdaptiveButton,
  useAdaptive
} from '@aura-adaptive/aura-ui-adaptor';
import { Activity, Thermometer, Droplets, Heart } from 'lucide-react';
import { appointments, userProfile } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { tokens } = useAdaptive();
  const { colors, spacing } = tokens;
  const navigate = useNavigate();

  const vitalCards = [
    { label: 'Heart Rate', value: '72 bpm', icon: Heart, desc: 'Normal range' },
    { label: 'Blood Pressure', value: '118/75', icon: Activity, desc: 'Optimal' },
    { label: 'Temperature', value: '98.4 °F', icon: Thermometer, desc: 'Normal' },
    { label: 'Blood Sugar', value: '95 mg/dL', icon: Droplets, desc: 'Fasting' },
  ];

  const appointmentCols = useMemo(() => [
    { id: 'date', header: 'Date', accessor: 'date' },
    { id: 'time', header: 'Time', accessor: 'time' },
    { id: 'doctor', header: 'Doctor', accessor: 'doctor' },
    { id: 'specialty', header: 'Specialty', accessor: 'specialty' },
    { id: 'status', header: 'Status', accessor: 'status' }
  ], []);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 2 }}>

      <div className="hero-gradient" style={{ 
        marginBottom: spacing.gapY,
        padding: '2.5rem',
        borderRadius: '20px',
        background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary || colors.primary}10 100%)`,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        border: '1px solid rgba(0,0,0,0.03)'
      }}>
        <AdaptiveText variant="display" weight="bold">Welcome back, {userProfile.name}</AdaptiveText>
        <AdaptiveText variant="lead" muted>Here is a summary of your current health metrics and upcoming appointments.</AdaptiveText>
      </div>

      <AdaptiveText variant="h2" weight="bold">Recent Vitals</AdaptiveText>

      <AdaptiveGrid columns={3} minColumnWidth={240} maxColumns={4} withContainerPadding>
        {vitalCards.map((vital, idx) => (
          <AdaptiveCard key={idx} variant="data" className="premium-card">
            <AdaptiveCard.Body>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.gapX, marginBottom: spacing.gapY }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: `${colors.primary}20`
                }}>
                  <vital.icon color={colors.primary} size={24} />
                </div>
                <AdaptiveText variant="h3" weight="semibold">{vital.label}</AdaptiveText>
              </div>
              <AdaptiveText variant="display" weight="bold">{vital.value}</AdaptiveText>
              <AdaptiveText variant="caption" muted maxLines={2}>{vital.desc}</AdaptiveText>
            </AdaptiveCard.Body>
          </AdaptiveCard>
        ))}
      </AdaptiveGrid>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.gapY * 2 }}>
        <AdaptiveText variant="h2">Upcoming Appointments</AdaptiveText>
        <AdaptiveButton variant="secondary" onClick={() => navigate('/appointments')}>
          Book New
        </AdaptiveButton>
      </div>

      <AdaptiveCard variant="content" className="premium-card">
        <AdaptiveTable
          columns={appointmentCols}
          data={appointments}
          rowKey="id"
          variant="zebra"
          caption="Your upcoming and past medical appointments"
        />
      </AdaptiveCard>

    </div>
  );
}
