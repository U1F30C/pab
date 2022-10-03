import { Table } from "react-bootstrap";
import { AppTableColumn } from "../../shared/table/app-table";

export interface DetailDisplayerProps<T> {
  item: T;
  properties: AppTableColumn[];
}

function getValue<T>(item: T, rowDefinition: AppTableColumn) {
  if (rowDefinition.property) return item[rowDefinition.property];
  else return rowDefinition.propertyExtractor(item);
}

export function DetailDisplayer<T>(props: DetailDisplayerProps<T>) {
  return (
    <Table hover>
      <thead></thead>
      <tbody>
        {props.properties.map((rowDefinition, i) => (
          <tr>
            <td key={rowDefinition.displayName}>{rowDefinition.displayName}</td>
            <td key={i}>{getValue(props.item, rowDefinition)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
