import { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Client } from '../../model/client';
import { clientService } from '../../services/client-service';
import { AppTableColumn } from '../shared/table/app-table';
import { DetailDisplayer } from '../shared/table/detail-viewer';

const customStyles = {
  height: 'fit-content',
  width: '50%',
  minWidth: '320px',
  margin: '0 auto',
};
interface ClientViewerProps {
  clientId: number;
  cancel: () => void;
}
interface ClientViewerState {
  client: Client;
  isLoading: boolean;
}

const properties: AppTableColumn<Client>[] = [
  { displayName: 'Correo', property: 'email' },
  { displayName: 'Teléfono', property: 'phoneNumber' },
  {
    displayName: 'Descripción',
    property: 'description',
  },
  { displayName: 'Teléfono', property: 'phoneNumber' },
];
export default class ClientViewer extends Component<
  ClientViewerProps,
  ClientViewerState
> {
  constructor(props: ClientViewerProps) {
    super(props);
    this.state = {
      isLoading: true,
      client: null,
    };
    this.handleCancel = this.handleCancel.bind(this);
  }
  async fetchData(clientId: number) {
    const client = await clientService.findById(clientId);
    this.setState({ client, isLoading: false });
  }

  async componentDidUpdate(
    prevProps: ClientViewerProps,
    _prevState: ClientViewerState,
  ) {
    if (this.props.clientId && this.props.clientId !== prevProps.clientId) {
      await this.fetchData(this.props.clientId);
    }
  }
  componentDidMount() {
    return this.fetchData(this.props.clientId);
  }

  private handleCancel() {
    this.props.cancel();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Cargando</div>;
    }
    return (
      <>
        <h1>{this.state.client.name}</h1>
        <DetailDisplayer item={this.state.client} properties={properties} />

        <Button
          onClick={this.handleCancel}
          variant="secondary"
          className="ml-2 mt-3"
          type="button"
        >
          Regresar
        </Button>
      </>
    );
  }
}
