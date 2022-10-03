import ClientList from "../../../components/client/client-list";
import LayoutAuthenticated from "../../../components/layout/layout-authenticated";
import withAuth from "../../../utils/with-auth-hoc";

function ClientsMain() {
  return (
    <LayoutAuthenticated>
      <h1>Client</h1>
      <ClientList />
    </LayoutAuthenticated>
  );
}

export default withAuth(ClientsMain);
