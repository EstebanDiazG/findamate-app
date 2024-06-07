import path from "path";
import LogoLarge from "@/components/ui/LogoLarge";

interface IMenu {
  option: IOption[];
}

interface IOption {
  id: number;
  code: string;
  name: string;
  path?: string;
}

export const menu = [
  {
    id: 1,
    code: "findamate",
    icon: "rocket_launch",
    seccion: "Findamate",
    option: [
      {
        id: 0,
        code: "findamateHome",
        name: "Inicio",
        path: "/",
      },
      {
        id: 1,
        code: "findamateProfile",
        name: "Mi cuenta",
        path: "/profile",
      },
      {
        id: 2,
        code: "findamateTopics",
        name: "Foro",
        path: "/topics",
      },
    ],
  },
];
