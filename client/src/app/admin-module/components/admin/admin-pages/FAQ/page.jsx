"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "@/config";
import { useSelector } from "react-redux";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({
    title: "",
    Queries: [{ question: "", answer: "" }],
  });
  const { token } = useSelector((state) => state?.auth);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = () => {
    axios
      .get(`${config.baseURL}/api/faq/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setFaqs(response.data))
      .catch((error) => console.error("Error fetching FAQs:", error));
  };

  const openModal = () => {
    setCurrentFaq({ title: "", Queries: [{ question: "", answer: "" }] });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (faq) => {
    setCurrentFaq(faq);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFaq({ ...currentFaq, [name]: value });
  };

  const handleQueryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQueries = currentFaq.Queries.map((query, i) =>
      i === index ? { ...query, [name]: value } : query
    );
    setCurrentFaq({ ...currentFaq, Queries: updatedQueries });
  };

  const handleAddQuery = () => {
    setCurrentFaq({
      ...currentFaq,
      Queries: [...currentFaq.Queries, { question: "", answer: "" }],
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const url = isEditModalOpen
      ? `${config.baseURL}/api/faq/${currentFaq._id}`
      : `${config.baseURL}/api/faq/create`;

    const method = isEditModalOpen ? "PUT" : "POST";

    axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      data: currentFaq,
    })
      .then((response) => {
        const data = response.data;
        if (isEditModalOpen) {
          setFaqs(faqs.map((faq) => (faq._id === data._id ? data : faq)));
        } else {
          setFaqs([...faqs, data]);
        }
        closeModal();
        closeEditModal();
      })
      .catch((error) => console.error("Error submitting FAQ:", error));
  };

  const handleDeleteQuestion = (questionId) => {
    axios
      .delete(`${config.baseURL}/api/faq/${questionId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(() => {
        setFaqs(faqs.filter((faq) => faq._id !== questionId));
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const [maxHeight, setMaxHeight] = useState("950px");

  useEffect(() => {
    const screenHeight = window.innerHeight;
    const calculatedMaxHeight = screenHeight * 0.9;
    setMaxHeight(`${calculatedMaxHeight}px`);
  }, []);

  return (
    <div className="w-full mx-auto mt-10 px-5">
      <div className="w-full mx-auto mt-10 px-5">
        <div
          className="bg-white rounded-lg shadow-lg p-5"
          style={{ maxHeight: maxHeight, marginTop: "4px", overflowY: "auto" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              Frequently Asked Questions
            </h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={openModal}
            >
              Add New FAQ
            </button>
          </div>
          {faqs.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Question</th>
                  <th className="px-4 py-2">Answer</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq, faqIndex) =>
                  faq.Queries.map((query, queryIndex) => (
                    <tr key={`${faq._id}-${query._id}`} className="border-t">
                      <td className="px-4 py-2">
                        {faqIndex + 1}.{queryIndex + 1}
                      </td>
                      <td className="px-4 py-2">{faq.title}</td>
                      <td className="px-4 py-2">{query.question}</td>
                      <td className="px-4 py-2">{query.answer}</td>
                      <td className="px-4 py-2 space-y-2">
                        <div className="flex flex-col space-y-2">
                          <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
                            onClick={() => openEditModal(faq)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                            onClick={() => handleDeleteQuestion(faq._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <p>No FAQs available.</p>
          )}
        </div>
      </div>    

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-white rounded-lg p-8 shadow-lg z-10 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New FAQ</h2>
              <button onClick={closeModal} className="text-gray-500">
                &times;
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentFaq.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div
                className={`${
                  currentFaq.Queries.length > 2 ? "grid grid-cols-2 gap-4" : ""
                }`}
              >
                {currentFaq.Queries.map((query, index) => (
                  <div key={index} className="mb-4">
                    <label className="block mb-2">Question</label>
                    <input
                      type="text"
                      name="question"
                      value={query.question}
                      onChange={(e) => handleQueryChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                    <label className="block mb-2 mt-2">Answer</label>
                    <textarea
                      name="answer"
                      value={query.answer}
                      onChange={(e) => handleQueryChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-6 mx-2 rounded mb-4"
                onClick={handleAddQuery}
              >
                Add Another Question
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
              >
                Save FAQ
              </button>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeEditModal}
          ></div>
          <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-[1000px] max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit FAQ</h2>
                <button onClick={closeEditModal} className="text-gray-500">
                  &times;
                </button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={currentFaq.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div
                  className={`${
                    currentFaq.Queries.length > 2
                      ? "grid grid-cols-2 gap-4"
                      : ""
                  }`}
                >
                  {currentFaq.Queries.map((query, index) => (
                    <div key={index} className="mb-4">
                      <label className="block mb-2">Question</label>
                      <input
                        type="text"
                        name="question"
                        value={query.question}
                        onChange={(e) => handleQueryChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                      <label className="block mb-2 mt-2">Answer</label>
                      <textarea
                        name="answer"
                        value={query.answer}
                        onChange={(e) => handleQueryChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded mb-4"
                  onClick={handleAddQuery}
                >
                  Add Another Question
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save FAQ
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQs;
