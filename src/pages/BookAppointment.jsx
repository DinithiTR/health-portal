import React, { useState } from 'react';
import {
  AdaptiveCard,
  AdaptiveText,
  AdaptiveInput,
  AdaptiveSelect,
  AdaptiveButton,
  AdaptiveAlert,
  AdaptiveCheckbox,
  AdaptiveGrid,
  useAdaptive
} from '@aura-adaptive/aura-ui-adaptor';

export default function BookAppointment() {
  const { tokens } = useAdaptive();
  const { spacing } = tokens;
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    reason: '',
    reminders: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ doctor: '', date: '', reason: '', reminders: true });
    }, 4000);
  };

  const doctorOptions = [
    { label: 'Dr. Sarah Jenkins (Cardiology)', value: 'jenkins' },
    { label: 'Dr. Michael Chen (General)', value: 'chen' },
    { label: 'Dr. Emily Smith (ENT)', value: 'smith' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 2, maxWidth: 800, margin: '0 auto' }}>

      <div>
        <AdaptiveText variant="display" weight="bold">Schedule an Appointment</AdaptiveText>
        <AdaptiveText variant="lead" muted>Select a doctor and preferred time to book your visit.</AdaptiveText>
      </div>

      <AdaptiveCard variant="content" className="premium-card">
        <AdaptiveCard.Body>
          {submitted && (
            <div style={{ marginBottom: spacing.gapY }}>
              <AdaptiveAlert
                variant="success"
                title="Appointment Confirmed"
                message="Your appointment has been successfully booked. We have sent an email confirmation."
                filled
              />
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 1.5 }}>

            <AdaptiveSelect
              label="Select Doctor or Specialist"
              options={doctorOptions}
              value={formData.doctor}
              onChange={(val) => setFormData(prev => ({ ...prev, doctor: val }))}
              required
              helperText="Choose the medical professional you wish to see."
              labelMode="visible"
            />

            <AdaptiveGrid columns={2} minColumnWidth={200} withContainerPadding>
              <AdaptiveInput
                type="date"
                label="Preferred Date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
                labelMode="visible"
              />
              <AdaptiveInput
                type="text"
                label="Reason for Visit"
                placeholder="e.g. Annual Checkup, Refill Medication"
                value={formData.reason}
                onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                required
                fullWidth
                labelMode="visible"
              />
            </AdaptiveGrid>

            <AdaptiveCheckbox
              label="Send me SMS and Email reminders before the appointment"
              checked={formData.reminders}
              onChange={(checked) => setFormData(prev => ({ ...prev, reminders: checked }))}
            />

            <div style={{ marginTop: spacing.gapY }}>
              <AdaptiveButton type="submit" variant="primary">
                Confirm Booking
              </AdaptiveButton>
            </div>
          </form>
        </AdaptiveCard.Body>
      </AdaptiveCard>

    </div>
  );
}
