import Router from 'next/router';
import { Component } from 'react';
import { Roles } from '../../../constants/roles';
import { UserStates } from '../../../model/user';
import { userService } from '../../../services/user-service';
import UserForm from './user-form';
export class UserCreator extends Component {
  private goToList() {
    Router.push('/app/users');
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
          id: '0',
          email: '',
          name: '',
          phoneNumber: '',
          jobRole: '',
          state: UserStates.Active,
          address: '',
          username: '',
          password: '',
        }}
        submit={this.handleSubmit.bind(this)}
        cancel={this.handleCancel.bind(this)}
      />
    );
  }
}
