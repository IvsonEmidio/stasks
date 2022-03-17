import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Stasks
        </Navbar.Brand>
        <Navbar.Toggle>
          <AiOutlineMenu />
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="me-auto">
            {
              //Render all nav items.
              items.map((navItem, i) => {
                //Determine if need to be enabled.
                let isNavActive = pathname.includes(navItem.link);

                return (
                  <Nav.Link
                    key={i}
                    active={isNavActive}
                    onClick={() => navigate(navItem.link)}
                  >
                    <span className="me-2">{navItem.icon}</span>
                    {navItem.name}
                  </Nav.Link>
                );
              })
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const items = [
  {
    name: "Tarefas",
    icon: <FaTasks />,
    link: "/tasks/all",
  },
  {
    name: "Perfil",
    icon: <CgProfile />,
    link: "/profile",
  },
];
