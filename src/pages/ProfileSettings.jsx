import React, { useState } from 'react';
import {
  AdaptiveText,
  AdaptiveSwitch,
  AdaptiveTextarea,
  AdaptiveButton,
  AdaptiveDialog,
  AdaptiveCard,
  useAdaptive
} from '@aura-adaptive/aura-ui-adaptor';
import { userProfile } from '../data/mockData';

export default function ProfileSettings() {
  const { tokens } = useAdaptive();
  const { spacing } = tokens;
  const [notifications, setNotifications] = useState(userProfile.notifications);
  const [notes, setNotes] = useState("No known allergies other than Penicillin and Peanuts.");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setDialogOpen(true);
  };

  const confirmSave = () => {
    setDialogOpen(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 2, maxWidth: 800, margin: '0 auto' }}>

      <div>
        <AdaptiveText variant="display" weight="bold">Profile Settings</AdaptiveText>
        <AdaptiveText variant="lead" muted>Manage your account preferences and medical notes.</AdaptiveText>
      </div>

      <AdaptiveCard variant="content" detailed className="premium-card">
        <AdaptiveCard.Body style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 1.5 }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${spacing.gapY}px 0`, borderBottom: '1px solid #e2e8f0' }}>
            <div>
              <AdaptiveText variant="h3">Receive Notifications</AdaptiveText>
              <AdaptiveText variant="caption" muted>Get alerts about appointments and test results.</AdaptiveText>
            </div>
            <AdaptiveSwitch
              checked={notifications}
              onChange={setNotifications}
              label={notifications ? "On" : "Off"}
            />
          </div>

          <div style={{ marginTop: spacing.gapY }}>
            <AdaptiveTextarea
              label="Personal Medical Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter any notes you want the doctor to see prior to visits..."
              rows={4}
              helperText="These notes are private and only shared with your selected healthcare providers."
              labelMode="visible"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.gapX, marginTop: spacing.gapY }}>
            <AdaptiveButton variant="primary" onClick={handleSave}>
              Save Changes
            </AdaptiveButton>
            {saveSuccess && (
              <AdaptiveText style={{ color: 'green' }}>Changes saved successfully.</AdaptiveText>
            )}
          </div>

        </AdaptiveCard.Body>
      </AdaptiveCard>

      <AdaptiveDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Confirm Updates"
      >
        <div style={{ marginBottom: spacing.gapY }}>
          <AdaptiveText>Are you sure you want to update your profile settings? This will apply to all future appointments.</AdaptiveText>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: spacing.gapX }}>
          <AdaptiveButton variant="secondary" onClick={() => setDialogOpen(false)}>
            Cancel
          </AdaptiveButton>
          <AdaptiveButton variant="primary" onClick={confirmSave}>
            Confirm Save
          </AdaptiveButton>
        </div>
      </AdaptiveDialog>

    </div>
  );
}
