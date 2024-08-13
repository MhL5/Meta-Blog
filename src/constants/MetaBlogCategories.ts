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

export type MetaBlogCategoriesIcon =
  (typeof metaBlogCategoriesIcons)[keyof typeof metaBlogCategoriesIcons];

const metaBlogCategoriesIcons = {
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

export const categoryBgColor = {
  web_development: "bg-blue-200/50 dark:bg-blue-900/50",
  devOps: "bg-red-200/50  dark:bg-red-900/50",
  machine_learning: "bg-yellow-200/50 dark:bg-yellow-900/50",
  data_science: "bg-slate-200/50  dark:bg-slate-900/50",
  cyber_security: " bg-green-200/50  dark:bg-green-900/50 ",
  ui_ux: "bg-pink-200/50 dark:bg-pink-900/50",
  mobile_development: "bg-purple-200/50  dark:bg-purple-900/50",
  game_development: "bg-orange-200/50  dark:bg-orange-900/50",
  artificial_intelligence: "bg-teal-200/50 dark:bg-teal-900/50",
  database_management: "bg-indigo-200/50  dark:bg-indigo-900/50",
  version_control: "bg-cyan-200/50  dark:bg-cyan-900/50",
  testing_and_qa: "bg-lime-200/50 dark:bg-lime-900/50",
  algorithms: "bg-stone-200/50 dark:bg-stone-900/50",
};

/**
 * Works based on prisma types
 * run `npx prisma generate` to update prisma types and this function
 */
const MetaBlogCategories = (
  Object.keys(Categories) as (keyof typeof Categories)[]
).map((category) => {
  return {
    category,
    id: Math.random(),
    CategoryIcon: metaBlogCategoriesIcons[category],
  };
});

export default MetaBlogCategories;
