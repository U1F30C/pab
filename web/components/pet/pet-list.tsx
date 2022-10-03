import { debounce } from 'lodash';
import Router from 'next/router';
import { Component } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Pet } from '../../model/pet';
import { petService } from '../../services/pet-service';
import { ApiQuery } from '../../utils/querying/api-query';
import AppGrid from '../shared/grid/app-grid';
import { ColumnConfiguration } from '../shared/table/app-table';

interface PetListState {
  query: ApiQuery;
  pets: Pet[];
  totalCount: number;
}

const petTableColumns: ColumnConfiguration<Pet> = {
  columns: [
    {
      displayName: 'Id',
      property: 'id',
    },
    {
      displayName: 'Nombre',
      property: 'name',
    },
    {
      displayName: 'Descripción',
      property: 'description',
    },
    {
      displayName: 'Especie',
      property: 'species',
    },
    {
      displayName: 'Acción',
      propertyExtractor: (item: Pet) => {
        return (
          <Button
            variant="secondary"
            onClick={() => {
              Router.push('/app/pets/view/' + item.id);
            }}
          >
            Ver
          </Button>
        );
      },
    },
  ],
  keySelector: (item: Pet) => item.id.toString(),
  classSelector: (item: Pet) => '',
};

export default class PetList extends Component<any, PetListState> {
  onRowClick(elementClicked: Pet) {}
  constructor(props) {
    super(props);
    this.state = {
      query: {
        pageIndex: 0,
        pageSize: 10,
      },
      pets: [],
      totalCount: 0,
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.fetchData = debounce(this.fetchData, 500);
  }

  componentDidMount() {
    this.fetchData();
  }
  private async fetchData() {
    const data = await petService.getAll(this.state.query);
    this.setState({
      pets: data?.data,
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
      },
    );
  }

  render() {
    return (
      <>
        <AppGrid
          displayer={(item) => {
            return (
              <>
                <Card style={{ width: '13rem' }}>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Id: {item.id}</Card.Text>
                    <Card.Text>{item.description}</Card.Text>
                    <Button variant="primary">Adóptame!</Button>
                  </Card.Body>
                </Card>
              </>
            );
          }}
          data={this.state.pets}
          query={this.state.query}
          onQueryChange={this.handleQueryChange}
          onRowClick={this.onRowClick}
          count={this.state.totalCount}
        ></AppGrid>
      </>
    );
  }
}
