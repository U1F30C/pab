import { noop } from "lodash";
import { Table } from "react-bootstrap";

export interface AppTableColumn<T = any> {
  displayName: string;
  property?: string;
  propertyExtractor?: (item: T) => any;
}

export interface ColumnConfiguration<T> {
  columns: AppTableColumn[];
  keySelector: (item: any) => string;
  classSelector: (item: any) => string;
}

export interface SimpleTableProps<T> {
  columnConfiguration: ColumnConfiguration<T>;
  data: T[];
  onRowClick?: (elementClicked: T) => void;
}

function getRows<T>(
  data: T[],
  columnConfiguration: ColumnConfiguration<T>,
  onRowClick: (elementClicked: any) => void = noop
) {
  if (!data) {
    return [];
  }
  return data.map((item) => {
    let className = "";
    if (columnConfiguration.classSelector) {
      className = columnConfiguration.classSelector(item);
    }
    return (
      <tr
        key={columnConfiguration.keySelector(item)}
        className={className}
        onClick={() => onRowClick(item)}
      >
        {columnConfiguration.columns.map((columnDefinition) => {
          let value;
          if (columnDefinition.property) {
            value = item[columnDefinition.property];
          } else {
            value = columnDefinition.propertyExtractor(item);
          }
          return <td key={columnDefinition.property}>{value}</td>;
        })}
      </tr>
    );
  });
}

export function SimpleTable<T>(props: SimpleTableProps<T>) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {props.columnConfiguration.columns.map((columnDefinition, index) => (
            <th key={columnDefinition.property || index}>
              {columnDefinition.displayName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {getRows(props.data, props.columnConfiguration, props.onRowClick)}
      </tbody>
    </Table>
  );
}
