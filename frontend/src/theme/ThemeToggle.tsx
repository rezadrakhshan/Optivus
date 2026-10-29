import { Monitor, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { fa } from '@/i18n/fa';
import { useTheme } from './theme-context';
import type { ThemePreference } from './theme-storage';

const options: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: fa.theme.light, icon: Sun },
  { value: 'dark', label: fa.theme.dark, icon: Moon },
  { value: 'system', label: fa.theme.system, icon: Monitor },
];

function isThemePreference(value: string): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

/** Light / dark / system menu in the top bar. */
export function ThemeToggle() {
  const { preference, resolved, setPreference } = useTheme();
  const TriggerIcon = preference === 'system' ? Monitor : resolved === 'dark' ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={fa.theme.choose}>
          <TriggerIcon className="size-5" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{fa.theme.label}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={preference}
          onValueChange={(value) => {
            if (isThemePreference(value)) setPreference(value);
          }}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              <option.icon className="text-muted-foreground" aria-hidden="true" />
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
