import { debounce } from "lodash";
import Router from "next/router";
import { Component } from "react";
import { Button } from "react-bootstrap";
import { Client } from "../../model/client";
import { clientService } from "../../services/client-service";
import { ApiQuery } from "../../utils/querying/api-query";
import AppTable, { ColumnConfiguration } from "../shared/table/app-table";

interface ClientListState {
  query: ApiQuery;
  clients: Client[];
  totalCount: number;
}

const clientTableColumns: ColumnConfiguration<Client> = {
  columns: [
    {
      displayName: "Nombre",
      property: "name",
    },
    {
      displayName: "Apellido",
      property: "lastName",
    },
    {
      displayName: "Correo",
      property: "email",
    },
    {
      displayName: "Acción",
      propertyExtractor: (item: Client) => {
        return (
          <Button
            variant="secondary"
            onClick={() => {
              Router.push("/app/clients/view/" + item.id);
            }}
          >
            Ver
          </Button>
        );
      },
    },
  ],
  keySelector: (item: Client) => item.id.toString(),
  classSelector: (item: Client) => "",
};

export default class ClientList extends Component<any, ClientListState> {
  onRowClick(elementClicked: Client) {
  }
  constructor(props) {
    super(props);
    this.state = {
      query: {
        pageIndex: 0,
        pageSize: 10,
      },
      clients: [],
      totalCount: 0,
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.fetchData = debounce(this.fetchData, 500);
  }

  componentDidMount() {
    this.fetchData();
  }
  private async fetchData() {
    const data = await clientService.getAll(this.state.query);
    this.setState({
      clients: data?.data,
      totalCount: data?.count,
    });
  }

  private handleQueryChange(apiQuery: ApiQuery) {
    this.setState(
      {
        query: apiQuery,
      },
      () => {
        this.fetchData();
      }
    );
  }

  render() {
    return (
      <>
        <AppTable
          columnConfiguration={clientTableColumns}
          data={this.state.clients}
          query={this.state.query}
          onQueryChange={this.handleQueryChange}
          onRowClick={this.onRowClick}
          count={this.state.totalCount}
        >
        <Button
          className={'float-right'}
          onClick={() => Router.push('/app/clients/create')}
        >
          Registrar cliente
        </Button></AppTable>
      </>
    );
  }
}
