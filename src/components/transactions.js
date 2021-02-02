import React from "react";
import NavBar from "./navBar";
import { useHistory } from "react-router";
import axios from "axios";
import TransactionCard from "./transactionCard";

function Transactions() {
  const history = useHistory();
  const [userData, setUserData] = React.useState({});
  const [transactions, setTransactions] = React.useState([]);
  React.useEffect(() => {
    if (window.localStorage.getItem("login") === null) {
      console.log("signin");
      return history.push("/signin");
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
        setUserData(response.data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
    axios
      .get("http://localhost:8000/transactions/viewtransactions", {
        headers: { "x-auth-token": login.token },
      })
      .then((response) => {
        console.log("response transactions");
        console.log(response.data);
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }, []);
  return (
    <>
      <NavBar title="Transactions" />
      {transactions.map((transaction) => (
        <TransactionCard userData={userData} transaction={transaction} />
      ))}
    </>
  );
}

export default Transactions;
