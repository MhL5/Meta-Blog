import {
  BotIcon,
  BrainIcon,
  CodeIcon,
  Container,
  DatabaseZap,
  FileSearch2,
  Gamepad2Icon,
  GitGraphIcon,
  Paintbrush,
  ShieldCheck,
  Smartphone,
  TestTube,
  WebhookIcon,
} from "lucide-react";
import { Categories } from "@prisma/client";

const icons = {
  web_development: WebhookIcon,
  machine_learning: BrainIcon,
  devOps: Container,
  algorithms: CodeIcon,
  database_management: DatabaseZap,
  data_science: FileSearch2,
  cyber_security: ShieldCheck,
  ui_ux: Paintbrush,
  artificial_intelligence: BotIcon,
  game_development: Gamepad2Icon,
  version_control: GitGraphIcon,
  testing_and_qa: TestTube,
  mobile_development: Smartphone,
} as const;

/**
 * Works based on prisma types
 * run `npx prisma generate` to update prisma types and this function
 */
const MetaBlogCategories = (
  Object.keys(Categories) as (keyof typeof Categories)[]
).map((category) => {
  return { category, id: Math.random(), CategoryIcon: icons[category] };
});

export default MetaBlogCategories;
