import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Switch } from "@headlessui/react";

import CloseIcon from "../Svg/CloseIcon";
import Loader from "../../loader/Index";
import DeleteUser from "./DeleteUser";

export const headItems = [
  "S. No.",
  "Name",
  " Contact No",
  "Email",
  // "Block user",
  "total orders",
  "Action",
];

const User = () => {
  const token = JSON.parse(localStorage.getItem("admin_token"));
  const [isRefresh, setRefresh] = useState(false);
  const [allData, setAllData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [Id, setId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const visiblePageCount = 10;
  // const {ad_token, isLoggedIn} = useSelector((state) => state.auth);
  ;

  // console.log(previewData);
  const refreshdata = () => {
    setRefresh(!isRefresh);
  };
  // delete func ----
  const handleDelete = (del_id) => {
    setId(del_id);
    setOpenDelete(true);
  };

  const closeDeleteModal = () => {
    setOpenDelete(false);
  };

  // handle search ----
  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
    searchDataFunc(e.target.value);
  };

  const handleSearch = () => {
    if (searchText) {
      searchDataFunc(searchText.trim());
    }
  };
  const handleKeyDown = (e) => {
    console.log("Pressed key:", e.key);
    if (e.key === "Backspace") {
      // e.preventDefault(); // Prevent the default action
      searchDataFunc(searchText);
    }
  };
  const handleClearSearch = () => {
    refreshdata();
    setSearchText("");
  };
  const searchDataFunc = (search_cate) => {
    const options = {
      method: "GET",
      url: `/api/auth/all-users?search=${search_cate}`,
      headers: {
        Authorization: ad_token,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response?.data);
        if (response.status === 200) {
          setAllData(response?.data);
        } else {
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // preview modal ----
  const handlePreview = async (prev_id) => {
    setIsLoader(true);
    try {
      const res = await axios.get(`/api/auth/getUserById/${prev_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ad_token,
        },
      });
      if (res.data?.success) {
        // console.log(res.data.user);
        setOpenPopup(true);
        setPreviewData(res.data?.user);
        setIsLoader(false);
      } else {
        setIsLoader(false);
        return;
      }
    } catch (error) {
      setIsLoader(false);
      console.error(error);
    }
  };
  const closePreviewModal = () => {
    setOpenPopup(false);
  };

  // get all data ----
  const getAllData = (pageNo) => {
    setIsLoader(true);
    const options = {
      method: "GET",
      url: `http://13.43.174.21:4000/api/auth/all-users?page=${pageNo}&limit=${visiblePageCount}`,
      headers: {
        // Authorization: token,
        "Content-Type": "application/json",
      },
    };
    axios
      .request(options)
      .then((res) => {
        // console.log(res);
        if (res?.data?.success || res.status === 200 ) {
          setIsLoader(false);
          setAllData(res?.data);
        } else {
          setIsLoader(false);
          return;
        }
      })
      .catch((error) => {
        setIsLoader(false);
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    getAllData(1);
  }, [isRefresh]);

  const handleToggleBlocked = async (userId, isBlocked) => {
    if (isBlocked === undefined) return;
    setIsLoader(true);
    try {
      const res = await axios.put(
        `/api/auth/edit-user/${userId}`,
        { isBlocked: !isBlocked },
        {
          headers: { "Content-Type": "application/json", Authorization: ad_token },
        }
      );

      if (res.data?.success) {
        refreshdata()
        return;
      } else {
        console.error("Toggle blocked request failed.");
      }
    } catch (error) {
      console.error("Toggle blocked request failed:", error);
    } finally {
      setIsLoader(false);
    }

    // console.log(userId, { isBlocked: !isBlocked });
  };
  return (
    <>
      {isLoader && <Loader />}
      <section className="w-full">
        <div className=" mx-auto">
          <div className="rounded-[10px] bg-white py-[20px] flexBetween flex-col md:flex-row gap-3 px-[20px] mt-[20px] lg:mt-0">
            <p className=" text-[22px] font-semibold">User list</p>
            <div className="flexCenter gap-x-7 lg:gap-x-5 md:flex-auto flex-wrap gap-y-3 md:justify-end">
              <div className="border border-primary  bg-[#302f2f82]] flexCenter h-[32px] pl-[10px] md:w-auto w-full">
                <input
                  type="text"
                  className="input_search"
                  value={searchText}
                  onChange={handleSearchInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Search by name, contact, email."
                />
                {searchText !== "" ? (
                  <button
                    className="clear_search_btn"
                    onClick={handleClearSearch}
                  >
                    <CloseIcon />
                  </button>
                ) : (
                  ""
                )}
                <button className="search_btn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="outer_table">
              <table className="w-full min-w-[640px] table-auto mt-[20px] ">
                <thead className="">
                  <tr className=" ">
                    {headItems.map((items, inx) => (
                      <th className="table_head" key={inx}>
                        <p className="block text-[13px] font-medium uppercase whitespace-nowrap text-[#72727b]">
                          {items}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(allData?.users) &&
                    allData?.users?.length > 0 &&
                    allData?.users?.map((items, index) => (
                      <tr key={index}>
                        <td className="table_data">{index + 1}</td>
                        <td className="table_data capitalize">
                          {items?.firstname}   {items?.lastname}
                        </td>
                        <td className="table_data">{items?.mobile} </td>
                        <td className="table_data">{items?.email}</td>
                        <td className="table_data">{items?.orders?.length }</td>
                        {/* <td className="table_data">
                          <Switch
                            checked={items?.isBlocked}
                            onChange={() =>
                              handleToggleBlocked(items?._id, items?.isBlocked)
                            }
                            className={`${
                              items?.isBlocked ? "bg-primary" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                items?.isBlocked
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </Switch>
                        </td> */}
                        <td className="table_data">
                          <div className="table_btn_div">
                            {/* <button
                              className="secondary_btn  py-1"
                              onClick={() => handlePreview(items?._id)}
                            >
                              Preview
                            </button> */}
                            <button
                              className="delete_btn py-1"
                              onClick={() => handleDelete(items?._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {Array.isArray(allData?.users) && allData?.users?.length === 0 && (
              <div className="no_data">
                <p className="text-[18px] fontsemibold">No data</p>
              </div>
            )}
          </div>

          {/* {allData?.totalPages > 1 && (
            <Pagination
              currentpage={allData?.currentPage}
              totalCount={allData?.totalPages}
              visiblePageCount={visiblePageCount}
              getAllData={getAllData}
            />
          )} */}
        </div>
      </section>

      {/*---------- Delete popup---------- */}
      <Transition appear show={openDelete} as={Fragment}>
        <Dialog as="div" className="relative z-[11]" onClose={closeDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[500px] transform overflow-hidden rounded-2xl bg-white 2xl:py-10 2xl:px-12 px-8 py-8  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="xl:text-[20px] text-[18px] font-medium leading-6 text-gray-900"
                  >
                    Delete user
                  </Dialog.Title>
                  <DeleteUser
                    closeModal={closeDeleteModal}
                    refreshdata={refreshdata}
                    deleteId={Id}
                    //token={token}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </>
  );
};

export default User;
