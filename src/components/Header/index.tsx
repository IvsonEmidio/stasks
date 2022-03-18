import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { items } from "./items";
import logo from "../../images/logo.jpg";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Navbar bg="white" expand="lg">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          <img alt="logo" style={{ height: 50, width: 180 }} src={logo}></img>
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
