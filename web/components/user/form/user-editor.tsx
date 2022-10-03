import { Component } from "react";
import { User } from "../../../model/user";
import { userService } from "../../../services/user-service";
import UserForm from "./user-form";
import Router from "next/router";

interface UserEditorProps {
  userId: number;
}

interface UserEditorState {
  user: User;
}

export default class UserEditor extends Component<
  UserEditorProps,
  UserEditorState
> {
  constructor(props: UserEditorProps) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  async componentDidMount() {
    await this.fetchUser.bind(this)();
  }

  async fetchUser() {
    const user = await userService.get(this.props.userId);
    this.setState({
      user: user,
    });
  }

  async handleSubmit(userToUpdate) {
    await userService.update(this.props.userId, userToUpdate);
    this.goToList();
  }

  private goToList() {
    Router.push("/app/users");
  }

  async handleCancel() {
    this.goToList();
  }

  render() {
    return (
      <>
        {!this.state.user ? (
          <div>Cargando...</div>
        ) : (
          <UserForm
            initialUser={this.state.user}
            submit={this.handleSubmit.bind(this)}
            cancel={this.handleCancel.bind(this)}
          />
        )}
      </>
    );
  }
}
