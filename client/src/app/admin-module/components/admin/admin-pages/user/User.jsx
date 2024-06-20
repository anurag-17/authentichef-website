import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "@/config";
import CloseIcon from "../Svg/CloseIcon";
import Loader from "../../loader/Index";
import DeleteUser from "./DeleteUser";
import protectedRoute from "@/app/admin-module/config/protectedRoute";
import { ToastContainer, toast } from "react-toastify";

export const headItems = [
  "S. No.",
  "Name",
  "Email",
  "Total Orders",
  "Created Time",
  "Action",
];

const User = () => {
  const { token } = useSelector((state) => state?.auth);
  console.log(token, "token");
  const [isRefresh, setRefresh] = useState(false);
  const [allData, setAllData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [Id, setId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const visiblePageCount = 10;

  const refreshdata = () => {
    setRefresh(!isRefresh);
  };

  const handleDelete = (del_id) => {
    setId(del_id);
    setOpenDelete(true);
  };

  const closeDeleteModal = () => {
    setOpenDelete(false);
  };

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
    searchDataFunc(e.target.value.trim(), currentPage);
  };

  const handleSearch = () => {
    if (searchText) {
      searchDataFunc(searchText.trim(), currentPage);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      searchDataFunc(searchText.trim(), currentPage);
    }
  };

  const handleClearSearch = () => {
    refreshdata();
    setSearchText("");
    getAllData(currentPage);
  };

  const searchDataFunc = (search_cate, pageNo) => {
    setIsLoader(true);
    const options = {
      method: "GET",
      url: `${config.baseURL}/api/auth/all-users?search=${search_cate}&page=${pageNo}&limit=${visiblePageCount}`,
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          setAllData(response?.data?.users);
          setTotalPages(response?.data?.totalPages);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoader(false);
      });
  };

  const handlePreview = async (prev_id) => {
    setIsLoader(true);
    try {
      const res = await axios.get(`/api/auth/getUserById/${prev_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (res.data?.success) {
        setOpenPopup(true);
        setPreviewData(res.data?.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoader(false);
    }
  };

  const closePreviewModal = () => {
    setOpenPopup(false);
  };

  const getAllData = (pageNo) => {
    setIsLoader(true);
    const options = {
      method: "GET",
      url: `${config.baseURL}/api/auth/all-users?page=${pageNo}&limit=${visiblePageCount}`,
      headers: {
        authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .request(options)
      .then((res) => {
        if (res?.data?.success || res.status === 200) {
          setAllData(res?.data?.users);
          setTotalPages(res?.data?.totalPages);
        } else {
          console.error("Error: Unsuccessful response");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoader(false);
      });
  };

  useEffect(() => {
    getAllData(currentPage);
  }, [!isRefresh, currentPage]);

  const handleToggleBlocked = async (userId, isBlocked) => {
    if (isBlocked === undefined) return;
    setIsLoader(true);
    try {
      const res = await axios.put(
        `/api/auth/edit-user/${userId}`,
        { isBlocked: !isBlocked },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (res.data?.success) {
        refreshdata();
      }
    } catch (error) {
      console.error("Toggle blocked request failed:", error);
    } finally {
      setIsLoader(false);
    }
  };

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
    if (searchText.trim()) {
      searchDataFunc(searchText.trim(), pageNo);
    } else {
      getAllData(pageNo);
    }
  };

  const [selectedID, setSelectedID] = useState([]);

  console.log(selectedID, "selectedID");
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedID((prevSelectedID) => {
      if (checked) {
        return [...prevSelectedID, value];
      } else {
        return prevSelectedID.filter((id) => id !== value);
      }
    });
  };
  const handleSelectDelete = async () => {
    try {
      const response = await axios.delete(
        `${config.baseURL}/api/auth/MultipleUsers`,
        {
          data: { ids: selectedID },
          headers: {
            authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Users Removed Successfully");
        refreshdata();
      } else {
        toast.error("Failed Please Try Again");
      }
    } catch (error) {
      toast.error( "No Users Are Selected");
    }
  };
  

  return (
    <>
    <ToastContainer autoClose={1000}/>
      {isLoader && <Loader />}
      <section className="w-full">
        <div className="mx-auto">
          <div className="rounded-[10px] bg-white py-[20px] flexBetween flex-col md:flex-row gap-3 px-[20px] mt-[20px] lg:mt-0">
            <p className="text-[22px] font-semibold">User List</p>
            <div className="flexCenter gap-x-7 lg:gap-x-5 md:flex-auto flex-wrap gap-y-3 md:justify-end">
              <div className="border border-primary bg-[#302f2f82]] flexCenter h-[32px] pl-[10px] md:w-auto w-full">
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
            <div className="table_btn_div flex justify-end  mr-10 my-5">
              <button className="delete_btn py-1" onClick={handleSelectDelete}>
                Delete Selected
              </button>
            </div>
            <div className="outer_table">
              <table className="w-full min-w-[640px] table-auto mt-[20px]">
                <thead>
                  <tr>
                    <th></th>
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
                    allData
                      .slice() // Create a copy to avoid mutating the original array
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((items, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              className="checkbox rounded-md w-[15px] h-[15px] xl:w-[18px] xl:h-[18px] 2xl:w-[22px] 2xl:h-[22px]"
                              value={items?._id}
                              onChange={handleCheckboxChange}
                            />
                          </td>
                          <td className="table_data">
                            {index + 1 + (currentPage - 1) * visiblePageCount}
                          </td>
                          <td className="table_data capitalize">
                            {items?.firstname} {items?.lastname}
                          </td>
                          <td className="table_data">{items?.email}</td>
                          <td className="table_data">
                            {items?.orderCount}
                          </td>{" "}
                          {/* Display order count */}
                          <td className="table_data">
                            {new Date(items?.createdAt).toLocaleString()}
                          </td>
                          <td className="table_data">
                            <div className="table_btn_div">
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
            {Array.isArray(allData) && allData.length === 0 && (
              <div className="no_data">
                <p className="text-[18px] fontsemibold">No data</p>
              </div>
            )}
          </div>
          <div className="pagination flex justify-center items-center mt-4 gap-6 text-[25px]">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
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
                <Dialog.Panel className="w-full max-w-[500px] transform overflow-hidden rounded-2xl bg-white 2xl:py-10 2xl:px-12 px-8 py-8 text-left align-middle shadow-xl transition-all">
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
                    token={token}
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

export default protectedRoute(User);
