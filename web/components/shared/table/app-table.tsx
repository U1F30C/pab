import { debounce } from "lodash";
import { Component } from "react";
import { FormControl, Row, Col } from "react-bootstrap";
import { ApiQuery } from "../../../utils/querying/api-query";
import AppPaginator from "./app-paginator";
import { SimpleTable, SimpleTableProps } from "./simple-table";

export interface AppTableColumn<T = any> {
  displayName: string;
  property?: string;
  propertyExtractor?: (item: T) => any;
}

export interface ColumnConfiguration<T> {
  columns: AppTableColumn<T>[];
  keySelector: (item: T) => string;
  classSelector: (item: T) => string;
}
export interface AppTableProps<T> extends SimpleTableProps<T> {
  query: ApiQuery;
  count: number;
  onQueryChange: (query: ApiQuery) => void;
}

interface AppTableState {
  queryString: string;
}

export const PAGE_SIZE = 10;
export const FIRST_PAGE = 0;

export default class AppTable<T> extends Component<
  AppTableProps<T>,
  AppTableState
> {
  constructor(props: AppTableProps<T>) {
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
              className={"float-left form-control w-50"}
              type="text"
              name="searchQuery"
              value={this.state.queryString || ""}
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
          <SimpleTable
            columnConfiguration={this.props.columnConfiguration}
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
