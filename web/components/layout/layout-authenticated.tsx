import { Container } from "react-bootstrap";
import AppNavbar from "../navbar/navbar";
interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  home?: boolean;
}

export default function LayoutAuthenticated({ children, home }: LayoutProps) {
  return (
    <>
      <AppNavbar />
      <Container className="main-container">
        <main>{children}</main>
      </Container>
    </>
  );
}
