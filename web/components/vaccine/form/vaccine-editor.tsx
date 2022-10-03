import { Component } from "react";
import { Vaccine } from "../../../model/vaccine";
import { vaccineService } from "../../../services/vaccine-service";
import VaccineForm from "./vaccine-form";
import Router from "next/router";

interface VaccineEditorProps {
  vaccineId: number;
}

interface VaccineEditorState {
  vaccine: Vaccine;
}

export default class VaccineEditor extends Component<
  VaccineEditorProps,
  VaccineEditorState
> {
  constructor(props: VaccineEditorProps) {
    super(props);
    this.state = {
      vaccine: undefined,
    };
  }

  async componentDidMount() {
    await this.fetchVaccine.bind(this)();
  }

  async fetchVaccine() {
    const vaccine = await vaccineService.get(this.props.vaccineId);
    this.setState({
      vaccine: vaccine,
    });
  }

  async handleSubmit(vaccineToUpdate) {
    await vaccineService.update(this.props.vaccineId, vaccineToUpdate);
    this.goToList();
  }

  private goToList() {
    Router.push("/app/vaccines");
  }

  async handleCancel() {
    this.goToList();
  }

  render() {
    return (
      <>
        {!this.state.vaccine ? (
          <div>Cargando...</div>
        ) : (
          <VaccineForm
            initialVaccine={this.state.vaccine}
            submit={this.handleSubmit.bind(this)}
            cancel={this.handleCancel.bind(this)}
          />
        )}
      </>
    );
  }
}
