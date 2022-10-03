import LayoutAuthenticated from '../../../components/layout/layout-authenticated';
import PetList from '../../../components/pet/pet-list';
import withAuth from '../../../utils/with-auth-hoc';

function PetsMain() {
  return (
    <LayoutAuthenticated>
      <h1>Mascotas</h1>
      <PetList />
    </LayoutAuthenticated>
  );
}

export default withAuth(PetsMain);
