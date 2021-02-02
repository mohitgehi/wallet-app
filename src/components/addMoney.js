import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router";

function AddMoney(props) {
  const history = useHistory();
  const [addMoney, setAddMoney] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const handleAdd = () => {
    if (window.localStorage.getItem("login") === null) {
      console.log("signin");
      return this.props.history.push("/signin");
    }

    const login = JSON.parse(window.localStorage.getItem("login"));
    console.log("login");
    console.log(login.token);
    axios
      .post(
        "http://localhost:8000/transactions/addmoney",
        {
          amount: amount,
        },
        { headers: { "x-auth-token": login.token } }
      )
      .then((response) => {
        console.log("response");
        console.log(response.data.msg);
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
          setAddMoney(!addMoney);
        }}
      >
        Add Funds
      </Button>
      <br />
      {addMoney ? (
        <div>
          <input
            type="text"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default AddMoney;
