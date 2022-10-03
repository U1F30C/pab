import LayoutAuthenticated from "../../../components/layout/layout-authenticated";
import VaccineList from "../../../components/vaccine/vaccine-list";
import withAuth from "../../../utils/with-auth-hoc";

function VaccinesMain() {
  return (
    <LayoutAuthenticated>
      <h1>Vacunas</h1>
      <VaccineList />
    </LayoutAuthenticated>
  );
}

export default withAuth(VaccinesMain);
