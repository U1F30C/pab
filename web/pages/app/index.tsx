import Router from 'next/router';
import { Button, Card, Col, Row } from 'react-bootstrap';

import LayoutNoAuthenticated from '../../components/layout/layout-no-authenticated';
import Login from '../../components/auth/login';

export default function Home() {
  return (
    <LayoutNoAuthenticated>
      <Login />
    </LayoutNoAuthenticated>
  );
}
