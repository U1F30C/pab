import withAuth from "../../../utils/with-auth-hoc";
import LayoutAuthenticated from '../../../components/layout/layout-authenticated';
import { VaccineCreator } from "../../../components/vaccine/form/vaccine-creator";

function CreateVaccineComponent() {
  return <LayoutAuthenticated>
    <VaccineCreator />
  </LayoutAuthenticated>
}

export default withAuth(CreateVaccineComponent);

