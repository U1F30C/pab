import Router from "next/router";
import { Component } from "react";
import { Roles } from "../../../constants/roles";
import { userService } from "../../../services/user-service";
import UserForm from "./user-form";
export class UserCreator extends Component {

  private goToList() {
    Router.push("/app/users");
  }

  private async handleSubmit(user) {
    await userService.create(user);
    this.goToList();
  }
  private async handleCancel() {
    this.goToList();
  }
  render() { 
    return (
    <UserForm
      initialUser={{
        fullName: "",
        email: "",
        id: 0,
        name: "",
        lastName: "",
        role: Roles.Inspector,
        active: 'true',
      }}
      submit={this.handleSubmit.bind(this)}
      cancel={this.handleCancel.bind(this)}
    />
  );
  }
  
}
