import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  AdaptiveNavbar,
  AdaptiveText,
  AdaptiveButton,
  AdaptiveGrid,
  useAdaptive
} from '@aura-adaptive/aura-ui-adaptor';
import {
  LayoutDashboard,
  CalendarPlus,
  FileText,
  Settings,
  HeartPulse
} from 'lucide-react';
import { userProfile } from '../data/mockData';

export default function Layout() {
  const { pathname } = useLocation();
  const { tokens } = useAdaptive();
  const { spacing, colors, flags } = tokens;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/appointments', label: 'Book Appointment', icon: CalendarPlus },
    { path: '/records', label: 'Medical Records', icon: FileText },
    { path: '/profile', label: 'Profile', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdaptiveNavbar sticky bordered className="glass-nav">
        <AdaptiveNavbar.Brand>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
            <HeartPulse color={colors.primary} size={28} />
            <AdaptiveText variant="h3">HealthPortal</AdaptiveText>
          </Link>
        </AdaptiveNavbar.Brand>

        <AdaptiveNavbar.Nav>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
              <AdaptiveNavbar.Item as="button" active={pathname.startsWith(item.path)}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <item.icon size={18} />
                  {flags.layoutSimplification ? null : <AdaptiveText>{item.label}</AdaptiveText>}
                  {flags.layoutSimplification && <AdaptiveText>{item.label}</AdaptiveText>}
                </span>
              </AdaptiveNavbar.Item>
            </Link>
          ))}
        </AdaptiveNavbar.Nav>

        <AdaptiveNavbar.Spacer />

        <AdaptiveNavbar.Actions maxVisible={2}>
          <AdaptiveText variant="caption" muted>
            Patient: {userProfile.name}
          </AdaptiveText>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <AdaptiveButton variant="secondary">My Profile</AdaptiveButton>
          </Link>
        </AdaptiveNavbar.Actions>
      </AdaptiveNavbar>

      <main style={{
        flex: 1,
        padding: spacing.pagePaddingX || spacing.padX * 2,
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <Outlet />
      </main>
    </div>
  );
}
