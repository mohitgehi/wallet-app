import React, { Component } from "react";
import axios from "axios";
import NavBar from "./navBar";
import Button from "@material-ui/core/Button";
import AddMoney from "./addMoney";
import SendFund from "./sendFund";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
});

class home extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: {}, message: "Message" };
  }
  componentDidMount() {
    if (window.localStorage.getItem("login") === null) {
      console.log("signin");
      return this.props.history.push("/signin");
    }

    const login = JSON.parse(window.localStorage.getItem("login"));
    console.log("login");
    console.log(login);

    axios
      .get("http://localhost:8000/users/", {
        headers: { "x-auth-token": login.token },
      })
      .then((response) => {
        console.log("response");
        console.log(response);
        this.setState({ userData: response.data });
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }
  response = (message) => {
    this.setState({ message: message });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <NavBar title="Home" />
        <p>{this.state.message}</p>
        <div className={classes.root}>
          <div>Wallet: {this.state.userData.wallet}</div>

          <AddMoney response={this.response} />
          <br />
          <SendFund number={this.state.userData.number} response={this.response}/>
        </div>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(home);
