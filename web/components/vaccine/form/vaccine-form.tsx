import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { vaccineSchema } from "./vaccine-validation";
import { Component } from "react";
import { Vaccine } from "../../../model/vaccine";
import { AlertManager, withAlert } from "react-alert";
import { displayError } from "../../../utils/error-displayer";
import { displaySuccess } from "../../../utils/success-displayer";

interface VaccineFormProps {
  initialVaccine: Vaccine;
  submit: (vaccine: Vaccine) => Promise<any>;
  cancel: () => void;
  alert: AlertManager;
}

class VaccineForm extends Component<VaccineFormProps> {
  constructor(props: VaccineFormProps) {
    super(props);
  }

  private async handleSubmit(result: Vaccine, actions) {
    try {
      await this.props.submit(result);
      displaySuccess("Datos guardados", this.props.alert);
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
      <Formik<Vaccine>
        initialValues={
          this.props.initialVaccine || {
            id: "0",
            name: "",
            validity: '',
          }
        }
        onSubmit={this.handleSubmit.bind(this)}
        validationSchema={vaccineSchema}
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
            <Form.Group controlId="validity">
              <Form.Label>Vigencia</Form.Label>
              <Form.Control
                type="text"
                name="validity"
                value={values.validity}
                onChange={handleChange}
                isInvalid={!!touched.validity && !!errors.validity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.validity}
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

export default withAlert<VaccineFormProps>()(VaccineForm);
