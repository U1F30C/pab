import { Formik } from "formik";
import Link from "next/link";
import Router from "next/router";
import { Component } from "react";
import { AlertManager, withAlert } from "react-alert";
import { Button, Col, Form, Row } from "react-bootstrap";
import { LoginModel } from "../../model/login-model";
import { authenticationService } from "../../services/authentication-service";
import { displayError } from "../../utils/error-displayer";
import { loginSchema } from "./login-validation";

interface LoginFormComponentProps {
  alert: AlertManager;
}
interface LoginState {
  loading: boolean;
}

class LoginIternal extends Component<LoginFormComponentProps, LoginState> {
  constructor(props: LoginFormComponentProps) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    
    Router.push("/app/pets");
    const isAuthenticated = await authenticationService.ensureToken();
    if (isAuthenticated) {
      Router.push("/app/dashboard");
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  async handleSubmit(result, actions) {
    try {
      await authenticationService.authenticate(result);
      Router.push("/app/dashboard");
    } catch (error) {
      displayError(error, this.props.alert);
    }
    actions.setSubmitting(false);
  }

  render() {
    if (this.state.loading) {
      return <div>Cargando</div>;
    }
    return (
      <Formik<LoginModel>
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={this.handleSubmit.bind(this)}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="email">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!touched.password && !!errors.password}
                    required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Button disabled={isSubmitting} variant="primary" type="submit">
                  Ingresar
                </Button>
              </Col>
              <Col md={1}></Col>
              <Col md={4}>
                <Link href="/auth/forgot-password">
                  <a className="float-right">Olvidé mi contraseña</a>
                </Link>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withAlert()(LoginIternal);
