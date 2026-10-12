import { ChatsCircle, Compass, GraduationCap, Globe, Lifebuoy, Path, Plant, UsersThree } from "@phosphor-icons/react/dist/ssr";

const icons = {
  onboarding: Compass,
  "hr-assistant": ChatsCircle,
  learning: GraduationCap,
  culture: Globe,
  manager: UsersThree,
  wellbeing: Plant,
  crisis: Lifebuoy,
  career: Path,
} as const;

export function AgentIcon({ slug, size = 24, className = "" }: { slug: string; size?: number; className?: string }) {
  const Icon = icons[slug as keyof typeof icons] ?? Compass;
  return <Icon size={size} weight="light" aria-hidden="true" className={className} />;
}
