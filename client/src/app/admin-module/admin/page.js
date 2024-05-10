"use client";
// import protectedRoute from "@/config/protectedRoute";
import React from "react";
import AdminDashboard from "../components/admin/AdminDashboard";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const page = () => {
  return (
    <Provider store={store}>
      <AdminDashboard />
      {/* Other components */}
    </Provider>
  );
};

export default page;
