"use client"
import React from "react";
import Login from "../../components/admin/auth-component/Login";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

const page = () => {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
};

export default page;
