import Router from 'next/router';
import { Component } from 'react';
import { clientService } from '../../../services/client-service';
import ClientForm from './client-form';
export class ClientCreator extends Component {
  private goToList() {
    Router.push('/app/clients');
  }

  private async handleSubmit(client) {
    await clientService.create(client);
    this.goToList();
  }
  private async handleCancel() {
    this.goToList();
  }
  render() {
    return (
      <ClientForm
        initialClient={{
          id: '0',
          email: '',
          description: '',
          name: '',
          phoneNumber: '',
          address: '',
        }}
        submit={this.handleSubmit.bind(this)}
        cancel={this.handleCancel.bind(this)}
      />
    );
  }
}
