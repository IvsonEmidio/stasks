import { BiRun } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { BsBorderAll } from "react-icons/bs";

export const items = [
  {
    name: "Todas",
    link: "/all",
    icon: <BsBorderAll />,
  },
  {
    name: "Em andamento",
    link: "/doing",
    icon: <BiRun />,
  },
  {
    name: "Canceladas",
    link: "/canceled",
    icon: <MdOutlineCancel />,
  },
];
