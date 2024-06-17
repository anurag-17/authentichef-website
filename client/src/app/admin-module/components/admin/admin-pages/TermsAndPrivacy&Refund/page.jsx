"use client";
import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "@/config";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TermsandCondition = () => {
  const [refundPolicies, setRefundPolicies] = useState([]);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [policyContent, setPolicyContent] = useState({});
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const { token } = useSelector((state) => state?.auth);

  useEffect(() => {
    axios
      .get(`${config.baseURL}/api/Refund/getRefundPolicies`)
      .then((response) => {
        setRefundPolicies(response.data.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the refund policies!",
          error
        );
      });
  }, []);

  // Handle edit
  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setPolicyContent(policy);
    setModalOpen(true); // Open the modal
  };

  // Handle save
  const handleSave = () => {
    if (editingPolicy) {
      axios
        .put(
          `${config.baseURL}/api/Refund/updateRefundPolicy/${editingPolicy._id}`,
          policyContent,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setRefundPolicies(
            refundPolicies.map((policy) =>
              policy._id === editingPolicy._id ? response.data.data : policy
            )
          );
          setEditingPolicy(null);
          setPolicyContent({});
          setModalOpen(false); // Close the modal after update
        })
        .catch((error) => {
          console.error(
            "There was an error updating the refund policy!",
            error
          );
        });
    } else {
      axios
        .post(
          `${config.baseURL}/api/Refund/createRefundPolicy`,
          policyContent,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setRefundPolicies([...refundPolicies, response.data.data]);
          setPolicyContent({});
          setModalOpen(false); // Close the modal after create
        })
        .catch((error) => {
          console.error(
            "There was an error creating the refund policy!",
            error
          );
        });
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    axios
      .delete(`${config.baseURL}/api/Refund/deleteRefundPolicy/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setRefundPolicies(refundPolicies.filter((policy) => policy._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the refund policy!", error);
      });
  };

  // Function to add a new section in policyContent
  const addNewSection = () => {
    const newSection = { title: "", content: "" };
    setPolicyContent((prevContent) => ({
      ...prevContent,
      sections: [...(prevContent.sections || []), newSection],
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Refund Policies</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
        {refundPolicies.map((policy) => (
          <div key={policy._id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2">{policy.title}</h2>
            <p className="mb-4">{policy.intro}</p>
            <div className="overflow-auto max-h-40 mb-4">
              {policy.sections &&
                policy.sections.map((section) => (
                  <div key={section._id} className="mb-2">
                    <strong>{section.title}:</strong>
                    <div
                      className="mt-1"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    ></div>
                  </div>
                ))}
            </div>
            <p className="mb-2">
              <strong>Queries:</strong> {policy.queries}
            </p>
            <p className="mb-2">
              <strong>Note:</strong> {policy.Note}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => handleEdit(policy)}
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
                onClick={() => handleDelete(policy._id)}
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
                    d="M5 5a1 1 0 011-1h8a1 1 0 011 1v1h2a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h2V5zm5 12a1 1 0 100-2 1 1 0 000 2zM8 9a1 1 0 112 0v6a1 1 0 11-2 0V9zm5 0a1 1 0 10-2 0v6a1 1 0 102 0V9z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for editing */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-lg shadow-lg z-10 px-[40px] py-[40px]  w-[70%] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingPolicy ? "Edit Policy" : "Add Policy"}
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
                value={policyContent.title || ""}
                onChange={(e) =>
                  setPolicyContent({ ...policyContent, title: e.target.value })
                }
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Intro</label>
              <input
                type="text"
                value={policyContent.intro || ""}
                onChange={(e) =>
                  setPolicyContent({ ...policyContent, intro: e.target.value })
                }
                className="border p-2 w-full"
              />
            </div>
            {policyContent.sections &&
              policyContent.sections.map((section, index) => (
                <div key={index} className="mb-4">
                  <label className="block mb-2">{`Section ${
                    index + 1
                  } Title`}</label>
                  <input
                    type="text"
                    value={section.title || ""}
                    onChange={(e) => {
                      const newSections = [...policyContent.sections];
                      newSections[index].title = e.target.value;
                      setPolicyContent({
                        ...policyContent,
                        sections: newSections,
                      });
                    }}
                    className="border p-2 w-full"
                  />
                  <label className="block mb-2">{`Section ${
                    index + 1
                  } Content`}</label>
                  <ReactQuill
                    value={section.content || ""}
                    onChange={(content) => {
                      const newSections = [...policyContent.sections];
                      newSections[index].content = content;
                      setPolicyContent({
                        ...policyContent,
                        sections: newSections,
                      });
                    }}
                    className="mb-4"
                  />
                </div>
              ))}
            <button
              onClick={addNewSection}
              className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
            >
              Add Section
            </button>
            <div className="mb-4">
              <label className="block mb-2">Queries</label>
              <input
                type="text"
                value={policyContent.queries || ""}
                onChange={(e) =>
                  setPolicyContent({
                    ...policyContent,
                    queries: e.target.value,
                  })
                }
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Note</label>
              <input
                type="text"
                value={policyContent.Note || ""}
                onChange={(e) =>
                  setPolicyContent({ ...policyContent, Note: e.target.value })
                }
                className="border p-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {editingPolicy ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsandCondition;
