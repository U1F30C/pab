import Router from "next/router";
import { Component } from "react";
import LayoutNoAuthenticated from "../components/layout/layout-no-authenticated";
import { authenticationService } from "../services/authentication-service";

export default function withAuth(ComponentToAuthenticate) {
  return class Authenticated extends Component<any, { loggedIn: boolean }> {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: false,
      };
    }

    async componentDidMount() {
      let successfull = await authenticationService.ensureToken();
      this.setState({
        loggedIn: successfull,
      });
      if (!successfull) {
        Router.push("/auth/login");
      }
    }

    render() {
      return (
        <div>
          {this.state.loggedIn ? (
            <ComponentToAuthenticate {...this.props} />
          ) : (
            <LayoutNoAuthenticated>
              <div>No authenticated</div>
            </LayoutNoAuthenticated>
          )}
        </div>
      );
    }
  };
}
