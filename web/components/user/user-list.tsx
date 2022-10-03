import Router from 'next/router';
import { Component } from 'react';
import { Button } from 'react-bootstrap';
import { RolesDisplayNameMap } from '../../constants/roles';
import { User, UserStates } from '../../model/user';
import { userService } from '../../services/user-service';
import { ApiQuery } from '../../utils/querying/api-query';
import AppTable, { ColumnConfiguration } from '../shared/table/app-table';

interface UserListState {
  query: ApiQuery;
  users: User[];
  count: number;
}

const userTableColumns: ColumnConfiguration<User> = {
  columns: [
    {
      displayName: 'Nombre',
      property: 'name',
    },
    {
      displayName: 'Correo',
      property: 'email',
    },
    {
      displayName: 'Puesto',
      property: 'jobRole',
    },
    {
      displayName: 'Acción',
      propertyExtractor: (item: User) => {
        return (
          <Button
            variant="secondary"
            onClick={() => {
              Router.push('/app/users/edit/' + item.id);
            }}
          >
            Editar
          </Button>
        );
      },
    },
  ],
  keySelector: (item: User) => item.id.toString(),
  classSelector: (item: User) =>
    item.state == UserStates.Active ? '' : 'inactive-row',
};
export default class UserList extends Component<any, UserListState> {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        pageIndex: 0,
        pageSize: 10,
      },
      count: 0,
      users: [],
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }
  private async fetchData() {
    const data = await userService.getAll(this.state.query);
    this.setState({
      users: data?.data,
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
      },
    );
  }

  render() {
    return (
      <AppTable
        columnConfiguration={userTableColumns}
        data={this.state.users}
        count={this.state.count}
        query={this.state.query}
        onQueryChange={this.handleQueryChange}
      >
        <Button
          className={'float-right'}
          onClick={() => Router.push('/app/users/create')}
        >
          Agregar usuario
        </Button>
      </AppTable>
    );
  }
}
