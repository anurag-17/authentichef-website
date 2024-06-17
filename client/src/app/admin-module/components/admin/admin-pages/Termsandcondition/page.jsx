"use client";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "@/config";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TermsCondition = () => {
  const [terms, setTerms] = useState([]);
  const [editingTerm, setEditingTerm] = useState(null);
  const [termContent, setTermContent] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const { token } = useSelector((state) => state?.auth);
  const [isRefresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`${config.baseURL}/api/Termsandservices/findAll`)
      .then((response) => {
        setTerms(response.data.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the terms and conditions!",
          error
        );
      });
  }, [isRefresh]);

  const handleEdit = (term) => {
    setEditingTerm(term);
    setTermContent(term);
    setModalOpen(true);
  };

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const handleSave = () => {
    if (editingTerm) {
      axios
        .put(
          `${config.baseURL}/api/Termsandservices/update/${editingTerm._id}`,
          termContent,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setEditingTerm(null);
          setTermContent({});
          setModalOpen(false);
          refreshData();
        })
        .catch((error) => {
          console.error("There was an error updating the term!", error);
        });
    } else {
      axios
        .post(`${config.baseURL}/api/Termsandservices/create`, termContent, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setTermContent({});
          setModalOpen(false);
          refreshData();
        })
        .catch((error) => {
          console.error("There was an error creating the term!", error);
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`${config.baseURL}/api/Termsandservices/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        refreshData();
      })
      .catch((error) => {
        console.error("There was an error deleting the term!", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
        {terms.map(
          (term) =>
            term && (
              <div key={term._id} className="border rounded-lg p-4 shadow-md">
                <h2 className="text-lg font-semibold mb-2">{term.title}</h2>
                <div className="overflow-auto max-h-40 mb-4">
                  <div className="mb-2">
                    <div
                      className="mt-1"
                      dangerouslySetInnerHTML={{ __html: term.Description }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleEdit(term)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 3.293a1 1 0 011.414 1.414l-9 9a1 1 0 01-.872.266l-3.5-1A1 1 0 010 11.5v-3a1 1 0 01.559-.895l3.5-1a1 1 0 01.872.267l9-9zM10 7.414L12.586 10 11 11.586 8.414 9 10 7.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(term._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 5a1 1 0 011-1h8a1 1 0 011 1v1h2a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h2V5zm5 12a1 1 0 100-2 1 1 0 000 2zM8 9a1 1 112 0v6a1 1 11-2 0V9zm5 0a1 1 10-2 0v6a1 1 102 0V9z"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            )
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg z-10 px-[40px] py-[40px] w-[70%] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingTerm ? "Edit Term" : "Add Term"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={termContent.title || ""}
                onChange={(e) =>
                  setTermContent({ ...termContent, title: e.target.value })
                }
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <ReactQuill
                value={termContent.Description || ""}
                onChange={(content) =>
                  setTermContent({ ...termContent, Description: content })
                }
                className="mb-4"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {editingTerm ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsCondition;
