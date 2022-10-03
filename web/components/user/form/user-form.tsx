import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { userSchema } from './user-validation';
import { Roles, RolesDisplayNameMap } from '../../../constants/roles';
import { Component } from 'react';
import { User } from '../../../model/user';
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
    if (props.initialUser) {
      props.initialUser.active = props.initialUser.active ? 'true' : 'false';
      props;
    }
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

    const globalAdminIsEditingGlobalAdmin =
      this.props.initialUser?.role == Roles.GlobalAdmin;
    return (
      <Formik<User>
        initialValues={
          this.props.initialUser || {
            id: 0,
            email: '',
            fullName: '',
            name: '',
            lastName: '',
            role: Roles.Inspector,
            active: 'true',
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

            <Form.Group controlId="lastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isInvalid={!!touched.lastName && !!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="role">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                as="select"
                type="role"
                name="role"
                value={values.role}
                onChange={handleChange}
                isInvalid={!!touched.role && !!errors.role}
                disabled={globalAdminIsEditingGlobalAdmin}
              >
                <option value={Roles.Inspector}>
                  {RolesDisplayNameMap[Roles.Inspector]}
                </option>
                <option value={Roles.Admin}>
                  {RolesDisplayNameMap[Roles.Admin]}
                </option>
                {globalAdminIsEditingGlobalAdmin && (
                  <option value={Roles.GlobalAdmin}>
                    {RolesDisplayNameMap[Roles.GlobalAdmin]}
                  </option>
                )}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.role}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label as="legend" column sm={2}>
                Activo
              </Form.Label>
              <Form.Check
                type="radio"
                label="Si"
                value={'true'}
                checked={values.active === 'true'}
                onChange={handleChange}
                name="active"
              />
              <Form.Check
                type="radio"
                value={'false'}
                label="No"
                checked={values.active === 'false'}
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
