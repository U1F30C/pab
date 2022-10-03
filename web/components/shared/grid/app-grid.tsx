import { debounce } from 'lodash';
import { Component } from 'react';
import { Col, FormControl, Row } from 'react-bootstrap';
import { ApiQuery } from '../../../utils/querying/api-query';
import AppPaginator from '../table/app-paginator';
import { AppTableState } from '../table/app-table';
import { SimpleGrid, SimpleGridProps } from './simple-grid';

export interface AppGridProps<T> extends SimpleGridProps<T> {
  query: ApiQuery;
  count: number;
  onQueryChange: (query: ApiQuery) => void;
}

interface AppGridState extends AppTableState {}

export const PAGE_SIZE = 10;
export const FIRST_PAGE = 0;

export default class AppGrid<T> extends Component<
  AppGridProps<T>,
  AppGridState
> {
  constructor(props: AppGridProps<T>) {
    super(props);
    this.state = {
      queryString: props.query.queryString,
    };
    this.debouncedCallback = debounce(this.props.onQueryChange.bind(this), 500);
  }

  debouncedCallback: (query: ApiQuery) => void;

  handleQueryChange(query: ApiQuery) {
    if (this.props.query.queryString != query.queryString) {
      query.pageIndex = 0;
      this.debouncedCallback(query);
    } else {
      this.props.onQueryChange(query);
    }
  }

  render() {
    return (
      <div>
        <Row className="d-flex justify-content-between">
          <Col md={6} sm={6}>
            <FormControl
              className={'float-left form-control w-50'}
              type="text"
              name="searchQuery"
              value={this.state.queryString || ''}
              placeholder="Buscar"
              onChange={(event) => {
                const newText = event.target.value;
                this.setState({
                  queryString: newText,
                });
                this.handleQueryChange({
                  ...this.props.query,
                  queryString: newText,
                });
              }}
            />
          </Col>
          <Col md={6} sm={5} className="d-flex justify-content-end">
            {this.props.children}
          </Col>
        </Row>
        <div className="clearfix"></div>
        <div className="mt-3">
          <SimpleGrid
            displayer={this.props.displayer}
            data={this.props.data}
            onRowClick={this.props.onRowClick}
          />
          <AppPaginator
            pageIndex={this.props.query.pageIndex}
            pageSize={this.props.query.pageSize}
            totalCount={this.props.count}
            onPaginationChange={(pageIndex) => {
              this.handleQueryChange({
                ...this.props.query,
                pageIndex,
              });
            }}
          />
        </div>
      </div>
    );
  }
}
