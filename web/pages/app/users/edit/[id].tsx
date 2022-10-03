import { isNil } from "lodash";
import { useRouter } from "next/router";
import LayoutAuthenticated from "../../../../components/layout/layout-authenticated";
import UserEditor from "../../../../components/user/form/user-editor";
import withAuth from "../../../../utils/with-auth-hoc";

function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  if (isNil(id)) return null;
  return (
    <LayoutAuthenticated>
      <UserEditor userId={parseInt(id as string)} />
    </LayoutAuthenticated>
  );
}
export default withAuth(EditUser);
