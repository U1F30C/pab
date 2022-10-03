import { Col, Row } from 'react-bootstrap';
import { SimpleTableProps } from '../table/simple-table';

export interface SimpleGridProps<T>
  extends Omit<SimpleTableProps<T>, 'columnConfiguration'> {
  displayer: (element: T) => React.ReactElement;
}

export function SimpleGrid<T>(props: SimpleGridProps<T>) {
  return (
    <Row>
      {props.data?.map((item) => {
        return (
          <Col md={3} lg={3} xl={3}>
            <div onClick={() => props.onRowClick(item)}>
              {props.displayer(item)}
            </div>
          </Col>
        );
      })}
    </Row>
  );
}
