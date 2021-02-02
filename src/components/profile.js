import React from "react";
import NavBar from "./navBar";
import UserDataCard from "./userDataCard";
import axios from "axios";

import { useHistory } from "react-router";

function Profile() {
  const history = useHistory();
  const [userData, setUserData] = React.useState({});
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
  }, []);
  return (
    <>
      {console.log("profile")}

      <NavBar title={Profile} />
      <h1>Profile</h1>
      <UserDataCard
        firstName={userData.firstName}
        lastName={userData.lastName}
        email={userData.email}
        number={userData.number}
        address={userData.address}
        city={userData.city}
        state={userData.state}
        pincode={userData.pincode}
        country={userData.country}
        wallet={userData.wallet}
      />
    </>
  );
}

export default Profile;
