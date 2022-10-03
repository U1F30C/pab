import { Navbar } from "react-bootstrap";
import styles from './layout-authenticated.module.css';

export const siteTitle = 'Next.js Sample Website'

interface LayoutProps {
  children: JSX.Element | JSX.Element[],
  home?: boolean
}

export default function LayoutNoAuthenticated({ children, home }: LayoutProps) {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="#home" className="mx-3">Pick a buddy</Navbar.Brand>
      </Navbar>
      <div className={styles.container}>
        <main>{children}</main>
      </div>
    </>
  );
}
