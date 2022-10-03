import withAuth from "../../../utils/with-auth-hoc";
import LayoutAuthenticated from '../../../components/layout/layout-authenticated';
import { UserCreator } from "../../../components/user/form/user-creator";

function CreateUserComponent() {
  return <LayoutAuthenticated>
    <UserCreator />
  </LayoutAuthenticated>
}

export default withAuth(CreateUserComponent);

