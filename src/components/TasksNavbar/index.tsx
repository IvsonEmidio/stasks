import { Nav, Button } from "react-bootstrap";
import { BiRun } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { BsBorderAll } from "react-icons/bs";

export default function TasksNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //Change url nav params when click.
  const handleClick = (link: string) => {
    navigate("/tasks" + link, { replace: true });
  };

  return (
    <Nav>
      {items.map((navItem, i) => {
        let isItemClicked = pathname.includes(navItem.link);

        return (
          <Nav.Link key={i}>
            <Button
              size="sm"
              style={{ background: isItemClicked ? "#8e24aa" : "gray" }}
              onClick={() => handleClick(navItem.link)}
            >
              <i className="me-2 mb-1">{navItem.icon}</i>
              {navItem.name}
            </Button>
          </Nav.Link>
        );
      })}
    </Nav>
  );
}

const items = [
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
