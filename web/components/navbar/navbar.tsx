import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { authenticationService } from "../../services/authentication-service";
import Router from "next/router";
import { Roles } from "../../constants/roles";

export default function AppNavbar() {
  const user = authenticationService.user;
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="#home" className="mx-3">
        PRACCISS
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            href="#"
            onClick={(event) => {
              Router.push("/app/dashboard");
            }}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            href="#"
            onClick={(event) => {
              Router.push("/app/users");
            }}
          >
            Usuarios
          </Nav.Link>
          {user.role == Roles.GlobalAdmin && (
            <Nav.Link
              href="#"
              onClick={(event) => {
                Router.push("/app/vaccines");
              }}
            >
              Instituciones
            </Nav.Link>
          )}
          <Nav.Link
            href="#"
            onClick={(event) => {
              Router.push("/app/clients");
            }}
          >
            Pacientes
          </Nav.Link>
          <Nav.Link
            href="#"
            onClick={(event) => {
              Router.push("/app/config/ranges");
            }}
          >
            Rangos
          </Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={user.name} id="collasible-nav-dropdown">
            <NavDropdown.Item
              href="#"
              onClick={(event) => {
                event.preventDefault();
                authenticationService.logOff();
                Router.push("/auth/login");
              }}
            >
              Salir
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
