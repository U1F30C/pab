import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { userSchema } from './user-validation';
import { Roles, RolesDisplayNameMap } from '../../../constants/roles';
import { Component } from 'react';
import { User, UserStates } from '../../../model/user';
import { AlertManager, withAlert } from 'react-alert';
import { displayError } from '../../../utils/error-displayer';
import { displaySuccess } from '../../../utils/success-displayer';
import { authenticationService } from '../../../services/authentication-service';

interface UserFormProps {
  initialUser: User;
  submit: (user: User) => Promise<any>;
  cancel: () => void;
  alert: AlertManager;
}

class UserForm extends Component<UserFormProps, {}> {
  constructor(props: UserFormProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {}

  private async handleSubmit(result: User, actions) {
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
    const adminData = authenticationService.user;

    return (
      <Formik<User>
        initialValues={
          this.props.initialUser || {
            id: '0',
            email: '',
            name: '',
            phoneNumber: '',
            jobRole: '',
            state: UserStates.Active,
            address: '',
            username: '',
            password: '',
          }
        }
        onSubmit={this.handleSubmit.bind(this)}
        validationSchema={userSchema}
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

            <Form.Group controlId="jobRole">
              <Form.Label>Puesto</Form.Label>
              <Form.Control
                type="jobRole"
                name="jobRole"
                value={values.jobRole}
                onChange={handleChange}
                isInvalid={!!touched.jobRole && !!errors.jobRole}
              />
              <Form.Control.Feedback type="invalid">
                {errors.jobRole}
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

            <Form.Group controlId="username">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={!!touched.username && !!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label as="legend" column sm={2}>
                Activo
              </Form.Label>
              <Form.Check
                type="radio"
                label="Si"
                value={UserStates.Active}
                checked={values.state === UserStates.Active}
                onChange={handleChange}
                name="active"
              />
              <Form.Check
                type="radio"
                value={UserStates.Inactive}
                label="No"
                checked={values.state === UserStates.Inactive}
                onChange={handleChange}
                name="active"
              />
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

export default withAlert<UserFormProps>()(UserForm);
