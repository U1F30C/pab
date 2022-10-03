import React from "react";
import { Card } from "react-bootstrap";

export function SimpleCard(props: { children; title: string }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <>{props.children}</>
      </Card.Body>
    </Card>
  );
}
