import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router";

function SendFund(props) {
  const [sendMoney, setSendMoney] = React.useState(false);

  const [to, setTo] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const history = useHistory();

  const send = () => {
    if (window.localStorage.getItem("login") === null) {
      console.log("signin");
      return this.props.history.push("/signin");
    }

    const login = JSON.parse(window.localStorage.getItem("login"));
    console.log("login");
    console.log(login.token);
    axios
      .post(
        "http://localhost:8000/transactions/sendmoney",
        { from: props.number, to: to, amount: amount },
        { headers: { "x-auth-token": login.token } }
      )
      .then((response) => {
        console.log("response");
        console.log(response.data.msg);
        //setSendMoney(false);
        props.response(response.data.msg);
        // setAddMoney(false);

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSendMoney(!sendMoney);
        }}
      >
        Send Funds
      </Button>

      <br />
      {sendMoney ? (
        <div>
          <p>To: </p>
          <input
            type="text"
            onChange={(e) => {
              setTo(e.target.value);
            }}
          />

          <p>Amount: </p>
          <input
            type="text"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <br />
          <br />
          <Button variant="contained" color="primary" onClick={send}>
            Send
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default SendFund;
