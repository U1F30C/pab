import Router, { useRouter } from "next/router";
import LayoutAuthenticated from "../../../../components/layout/layout-authenticated";
import VaccineEditor from "../../../../components/vaccine/form/vaccine-editor";
import withAuth from "../../../../utils/with-auth-hoc";
import { isNil } from "lodash";

function EditVaccine() {
  const router = useRouter();
  const { id } = router.query;
  if (isNil(id)) return null;
  return (
    <LayoutAuthenticated>
      <VaccineEditor vaccineId={parseInt(id as string)} />
    </LayoutAuthenticated>
  );
}
export default withAuth(EditVaccine);
