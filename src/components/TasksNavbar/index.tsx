import { Nav, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { items } from "./items";

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
