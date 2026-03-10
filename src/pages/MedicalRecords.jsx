import React, { useMemo } from 'react';
import {
  AdaptiveText,
  AdaptiveTable,
  AdaptiveTooltip,
  AdaptiveCard,
  useAdaptive
} from '@aura-adaptive/aura-ui-adaptor';
import { medicalRecords } from '../data/mockData';

export default function MedicalRecords() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;

  // Custom renderer for diagnosis to show tooltip
  const DiagnosisCell = ({ value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <AdaptiveText>{value}</AdaptiveText>
      {value === 'Hypertension' && (
        <AdaptiveTooltip 
          placement="bottom"
          text="High blood pressure, a common condition where the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems."
        >
          <span style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: colors.secondary,
            color: colors.onSecondary || '#fff',
            fontSize: 12,
            cursor: 'help'
          }}>i</span>
        </AdaptiveTooltip>
      )}
    </div>
  );

  const columns = useMemo(() => [
    { id: 'date', header: 'Date', accessor: 'date', sortable: true },
    { id: 'doctor', header: 'Doctor', accessor: 'doctor', sortable: true },
    {
      id: 'diagnosis',
      header: 'Diagnosis',
      accessor: 'diagnosis',
      cell: (row) => <DiagnosisCell value={row.diagnosis} />
    },
    { id: 'prescription', header: 'Prescription', accessor: 'prescription' },
    { id: 'notes', header: 'Doctor Notes', accessor: 'notes' },
  ], []);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 2 }}>
      <div>
        <AdaptiveText variant="display" weight="bold">Medical Records & Prescriptions</AdaptiveText>
        <AdaptiveText variant="lead" muted>Review your health history, doctor notes, and active prescriptions.</AdaptiveText>
      </div>

      <AdaptiveCard variant="content" detailed className="premium-card">
        <AdaptiveTable
          columns={columns}
          data={medicalRecords}
          rowKey="id"
          variant="bordered"
          caption="A list of recent medical records"
        />
      </AdaptiveCard>

    </div>
  );
}
