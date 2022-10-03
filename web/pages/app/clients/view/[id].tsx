import Router, { useRouter } from "next/router";
import LayoutAuthenticated from "../../../../components/layout/layout-authenticated";
import ClientViewer from "../../../../components/client/client-viewer";
import withAuth from "../../../../utils/with-auth-hoc";
import { isNil } from "lodash";

function ViewClient() {
  const router = useRouter();
  const { id } = router.query;
  if (isNil(id)) return null;
  return (
    <LayoutAuthenticated>
      <ClientViewer
        clientId={parseInt(id as string)}
        cancel={() => {
          Router.push("/app/clients");
        }}
      />
    </LayoutAuthenticated>
  );
}
export default withAuth(ViewClient);
