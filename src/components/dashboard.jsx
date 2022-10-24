import React from "react";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
    //const { user, logoutUser } = useUserContext();
    const { user, logout } = UserAuth();
  return (
    <div>
      <h1>Dashboard </h1>
      <h2>Name : {user.displayName}</h2>
      <h2>Email : {user.email}</h2>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Dashboard;
