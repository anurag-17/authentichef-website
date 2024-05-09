"use client"
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const DeleteDishtype = ({ deleteId, closeModal, refreshData }) => {
  const [isLoading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("admin_token"));

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "DELETE",
      url: `http://13.43.174.21:4000/api/DishType/dishTypes/${deleteId}`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    axios
      .request(options)
      .then(function (res) {
        if (res.data?.success || res.status === 200) {
          setLoading(false);
          toast.success("Deleted successfully!");
          closeModal();
          refreshData();
        } else {
          setLoading(false);
          toast.error("Failed. something went wrong!");
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        toast.error("Server error!");
      });
  };
  return (
    <>
      <div className="mt-2">
        <p className=" text-[16px] font-normal leading-[30px] text-gray-500 mt-4">
          Are you sure you want to delete this user ?
        </p>
      </div>

      <div className="mt-8">
        <div className="flex md:flex-row flex-col gap-3 justify-between gap-x-5">
          <button className="w-full secondary_btn" onClick={() => closeModal()}>
            No, Keep It
          </button>

          <button
            className={`w-full 
              ${isLoading ? "text-[gray]" : "delete_btn"}`}
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading ? "Loading..." : "Yes, Delete It"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteDishtype;
