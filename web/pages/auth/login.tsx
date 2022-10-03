import LayoutNoAuthenticated, { siteTitle } from "../../components/layout/layout-no-authenticated";
import Login from '../../components/auth/login'

export default function LoginPage() {
  return <>
    <LayoutNoAuthenticated>
      <Login />
    </LayoutNoAuthenticated>
  </>
}
