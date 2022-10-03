import Router from "next/router";
import { Component } from "react";
import { Button } from "react-bootstrap";
import { RolesDisplayNameMap } from "../../constants/roles";
import { Vaccine } from "../../model/vaccine";
import { vaccineService } from "../../services/vaccine-service";
import { ApiQuery } from "../../utils/querying/api-query";
import AppTable, { ColumnConfiguration } from "../shared/table/app-table";

interface VaccineListState {
  query: ApiQuery;
  vaccines: Vaccine[];
  count: number;
}

const vaccineTableColumns: ColumnConfiguration<Vaccine> = {
  columns: [
    {
      displayName: "Nombre",
      property: "name",
    },
    {
      displayName: "Acción",
      propertyExtractor: (item: Vaccine) => {
        return (
          <Button
            variant="secondary"
            onClick={() => {
              Router.push("/app/vaccines/edit/" + item.id);
            }}
          >
            Editar
          </Button>
        );
      },
    },
  ],
  keySelector: (item: Vaccine) => item.id.toString(),
  classSelector: (item: Vaccine) => "",
};
export default class VaccineList extends Component<any, VaccineListState> {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        pageIndex: 0,
        pageSize: 10,
      },
      count: 0,
      vaccines: [],
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }
  private async fetchData() {
    const data = await vaccineService.getAll(this.state.query);
    this.setState({
      vaccines: data?.data,
      count: data?.count,
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
      <AppTable
        columnConfiguration={vaccineTableColumns}
        data={this.state.vaccines}
        count={this.state.count}
        query={this.state.query}
        onQueryChange={this.handleQueryChange}
      >
        <Button
          className={"float-right"}
          onClick={() => Router.push("/app/vaccines/create")}
        >
          Agregar institución
        </Button>
      </AppTable>
    );
  }
}
