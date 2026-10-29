import {
  Activity,
  ChartPie,
  LayoutDashboard,
  Tags,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { fa } from '@/i18n/fa';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  /** Only active on an exact URL match (used for the dashboard at "/"). */
  end?: boolean;
  /** Feature the backend does not support yet; shows a "coming soon" badge. */
  comingSoon?: boolean;
}

export const navItems: NavItem[] = [
  { to: '/', label: fa.nav.dashboard, icon: LayoutDashboard, end: true },
  { to: '/leads', label: fa.nav.leads, icon: Users },
  { to: '/categories', label: fa.nav.categories, icon: Tags },
  { to: '/analytics', label: fa.nav.analytics, icon: ChartPie },
  { to: '/activities', label: fa.nav.activities, icon: Activity, comingSoon: true },
  { to: '/profile', label: fa.nav.profile, icon: UserRound },
];
