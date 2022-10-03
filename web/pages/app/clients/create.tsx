import withAuth from "../../../utils/with-auth-hoc";
import LayoutAuthenticated from '../../../components/layout/layout-authenticated';
import { ClientCreator } from "../../../components/client/form/client-creator";

function CreateClientComponent() {
  return <LayoutAuthenticated>
    <ClientCreator />
  </LayoutAuthenticated>
}

export default withAuth(CreateClientComponent);

