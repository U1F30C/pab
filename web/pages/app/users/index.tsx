import LayoutAuthenticated from "../../../components/layout/layout-authenticated";
import UserList from "../../../components/user/user-list";
import withAuth from "../../../utils/with-auth-hoc";

function UsersMain() {
  return (
    <LayoutAuthenticated>
      <h1>Usuarios</h1>
      <UserList />
    </LayoutAuthenticated>
  );
}

export default withAuth(UsersMain);
