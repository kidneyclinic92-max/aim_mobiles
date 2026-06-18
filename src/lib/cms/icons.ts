import {
  Award,
  Clock,
  Globe,
  Headphones,
  Mail,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Shield,
  Smartphone,
  Target,
  Truck,
  Users,
  Watch,
  Zap,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  shield: Shield,
  refresh: RefreshCw,
  headphones: Headphones,
  target: Target,
  award: Award,
  users: Users,
  globe: Globe,
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  clock: Clock,
  smartphone: Smartphone,
  watch: Watch,
  zap: Zap,
  package: Package,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Globe;
}
