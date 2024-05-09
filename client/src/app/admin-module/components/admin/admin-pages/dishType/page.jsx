import React, { Fragment, useEffect, useState } from "react";
import CloseIcon from "../Svg/CloseIcon";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import DeleteDishtype from "./modal/deleteDishtype";
import UpdateDishtype from "./modal/updateDishtype";
import AddDishtype from "./modal/addDishtype";


export const headItems = [
  "S. No.",
  "Dietary Name",
  // "description",
  "Images",
  "Action",
];

const DishType = () => {
  const token = JSON.parse(localStorage.getItem("admin_token"));
  const [addNewDietary, setAddNewDietary] = useState(false);
  const [allData, setAllData] = useState("");
  const [searchText, setSearchText] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [Id, setId] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [isDrawerOpenO, setIsDrawerOpenO] = useState(false);
  const [dietaryEdit, setDietaryEdit] = useState("");
  const [isLoader, setLoader] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const closeEditPopup = () => {
    setOpenEdit(false);
  };

  const handleDelete = (del_id) => {
    setId(del_id);
    setOpenDelete(true);
  };

  const closeDeleteModal = () => {
    setOpenDelete(false);
  };
  const refreshData = () => {
    setRefresh(!isRefresh);
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
      searchDataFunc(searchText);
    }
  };
  // get all data ----
  useEffect(() => {
    getAllData();
  }, [isRefresh]);

  const getAllData = (pageNo) => {
    setLoader(true);
    const options = {
      method: "GET",
      url: "http://localhost:4000/api/DishType/dishTypes",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    axios
      .request(options)
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          setAllData(res?.data?.dishTypes);
          console.log(res?.data, "gjhkkgk");
          setLoader(false);
        } else {
          setLoader(false);
          return;
        }
      })
      .catch((error) => {
        setLoader(false);
        console.error("Error:", error);
      });
  };

  const openDrawerO = async (_id) => {
    console.log(_id);
    setLoader(true);
    setDietaryEdit(_id);
    try {
      const options = {
        method: "GET",
        url: `http://localhost:4000/api/DishType/dishTypes/${_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.request(options);
      if (response.status === 200) {
        setEditData(response?.data);
        // console.log(response?.data);

        setIsDrawerOpenO(true);
        setLoader(false);
      } else {
        console.error("Error: Unexpected response status");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const closeDrawerO = () => {
    setIsDrawerOpenO(false);
  };

  return (
    <>
      <section className="w-full">
        <div className=" mx-auto">
          <div className="rounded-[10px] bg-white py-[20px] flexBetween  md:flex-row gap-3 px-[20px] mt-[20px] lg:mt-0">
            <p className=" text-[22px] font-semibold">DishType List</p>
            <div className="flexCenter gap-x-7 lg:gap-x-5 md:flex-auto gap-y-3 ">
              <div className="border rounded border-primary  bg-[#302f2f82]] flexCenter h-[32px] pl-[10px] md:w-auto w-full">
                <input
                  type="text"
                  className="input_search"
                  //   value={searchText}
                  //   onChange={handleSearchInput}
                  //   onKeyDown={handleKeyDown}
                  placeholder="Search by name, contact, email."
                />
                {searchText !== "" ? (
                  <button
                    className="clear_search_btn"
                    // onClick={handleClearSearch}
                  >
                    <CloseIcon />
                  </button>
                ) : (
                  ""
                )}
                <button
                  className="search_btn"
                  // onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="">
              <button className="primary_btn py-2" onClick={openDrawer}>
                Add new DishType
              </button>
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
                  {Array.isArray(allData) &&
                    allData?.length > 0 &&
                    allData?.map((items, index) => (
                      <tr key={index}>
                        {/* {console.log(items)} */}
                        <td className="table_data">{index + 1}</td>
                        <td className="table_data capitalize">
                          {items?.title}
                        </td>
                        {/* <td className="table_data">{items?.description} </td> */}

                        <td className="table_data">
                          <img
                            src={items?.ProfileImage}
                            className="w-10 rounded-md"
                          />
                        </td>

                        <td className="table_data">
                          <div className="table_btn_div">
                            {/* <button
                              className="secondary_btn"
                              onClick={() => handlePreview(items?._id)}
                            >
                              Preview
                            </button> */}
                            <button
                              className="secondary_btn py-1"
                              onClick={() => openDrawerO(items?._id)}
                            >
                              Edit
                            </button>
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
            {Array.isArray(allData?.menuItems) &&
              allData?.menuItems?.length === 0 && (
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
                  <DeleteDishtype
                    closeModal={closeDeleteModal}
                    refreshData={refreshData}
                    deleteId={Id}
                    token={token}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isDrawerOpenO} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-2/3 sm:w-full sm:max-w-[700px]  transform overflow-hidden rounded-2xl bg-white p-4  sm:px-8 lg:px-8 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end">
                    <button onClick={closeDrawerO}>X</button>
                  </div>
                  <UpdateDishtype
                    dietaryEdit={dietaryEdit}
                    closeDrawerO={closeDrawerO}
                    refreshData={refreshData}
                    editData={editData}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isDrawerOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-1 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-2/3 sm:w-[600px] 2xl:w-[800px] transform overflow-hidden rounded-2xl bg-white sm:py-6 p-4  sm:px-8 lg:px-8 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end">
                    <button onClick={closeDrawer}>X</button>
                  </div>
                  <AddDishtype
                    closeDrawer={closeDrawer}
                    refreshData={refreshData}
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

export default DishType;
