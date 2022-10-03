import { Formik } from "formik";
import Router from "next/router";
import { Component } from "react";
import { AlertManager, withAlert } from "react-alert";
import { Button, Form, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import { LoginModel } from "../../model/login-model";
import { userService } from "../../services/user-service";
import { displayError } from "../../utils/error-displayer";

interface PasswordRecoveryProps {
  alert: AlertManager;
}
interface PasswordRecoveryState {
  loading: boolean;
}

const recoveryValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
});

class PasswordRecovery extends Component<
  PasswordRecoveryProps,
  PasswordRecoveryState
> {
  constructor(props: PasswordRecoveryProps) {
    super(props);
    this.state = {
      loading: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  async handleSubmit(result: Pick<LoginModel, "email">, actions) {
    try {
      await userService.recoverPassword(result.email);
      Router.push("/auth/login");
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
      <Formik<Pick<LoginModel, "email">>
        initialValues={{
          email: "",
        }}
        onSubmit={this.handleSubmit}
        validationSchema={recoveryValidationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
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
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Button disabled={isSubmitting} variant="primary" type="submit">
                  Recuperar contraseña
                </Button>
              </Col>
              <Col md={2}></Col>

              <Col md={3}>
                <a href="#" onClick={() => Router.back()}>
                  Regresar
                </a>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withAlert()(PasswordRecovery);
