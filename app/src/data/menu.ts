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
        icon: "home",
        name: "Inicio",
        path: "/",
      },
      {
        id: 1,
        code: "findamateProfile",
        icon: "face",
        name: "Mi cuenta",
        path: "/profile",
      },
      {
        id: 2,
        code: "findamateTopics",
        icon: "rocket_launch",
        name: "Foro",
        path: "/topic",
      },
      {
        id: 3,
        code: "findamateMedia",
        icon: "image",
        name: "Media",
        path: "/media",
      },
    ],
  },
];
