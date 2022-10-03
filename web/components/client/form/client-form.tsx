import { Formik } from 'formik';
import { Component } from 'react';
import { AlertManager, withAlert } from 'react-alert';
import { Button, Form } from 'react-bootstrap';
import { Client } from '../../../model/client';
import { displayError } from '../../../utils/error-displayer';
import { displaySuccess } from '../../../utils/success-displayer';
import { clientSchema } from './client-validation';

interface ClientFormProps {
  initialClient: Client;
  submit: (client: Client) => Promise<any>;
  cancel: () => void;
  alert: AlertManager;
}

class ClientForm extends Component<ClientFormProps, {}> {
  constructor(props: ClientFormProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {}

  private async handleSubmit(result: Client, actions) {
    try {
      result['active'] = result['active'] === 'true';
      await this.props.submit(result);
      displaySuccess('Datos guardados', this.props.alert);
    } catch (errors) {
      displayError(errors, this.props.alert);
    }
    actions.setSubmitting(false);
  }

  private handleCancel() {
    this.props.cancel();
  }

  render() {
    return (
      <Formik<Client>
        initialValues={
          this.props.initialClient || {
            id: '0',
            email: '',
            description: '',
            name: '',
            phoneNumber: '',
            address: '',
          }
        }
        onSubmit={this.handleSubmit.bind(this)}
        validationSchema={clientSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
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

            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={!!touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                isInvalid={!!touched.description && !!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="address"
                name="address"
                value={values.address}
                onChange={handleChange}
                isInvalid={!!touched.address && !!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="phoneNumber">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="phoneNumber"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                isInvalid={!!touched.phoneNumber && !!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Button disabled={isSubmitting} variant="primary" type="submit">
              Guardar
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={this.handleCancel.bind(this)}
              variant="secondary"
              className="ml-2"
              type="button"
            >
              Cancelar
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withAlert<ClientFormProps>()(ClientForm);
