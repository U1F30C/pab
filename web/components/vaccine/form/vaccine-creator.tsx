import Router from "next/router";
import { Component } from "react";
import { Roles } from "../../../constants/roles";
import { vaccineService } from "../../../services/vaccine-service";
import VaccineForm from "./vaccine-form";
export class VaccineCreator extends Component {
  private goToList() {
    Router.push("/app/vaccines");
  }

  private async handleSubmit(vaccine) {
    await vaccineService.create(vaccine);
    this.goToList();
  }
  private async handleCancel() {
    this.goToList();
  }
  render() {
    return (
      <VaccineForm
        initialVaccine={{
          id: '0',
          name: "",
        }}
        submit={this.handleSubmit.bind(this)}
        cancel={this.handleCancel.bind(this)}
      />
    );
  }
}
