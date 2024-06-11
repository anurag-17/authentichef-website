'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "@/config";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import the styles

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState({
    Name: "",
    Description: "",
    Profile_Image: "",
    Rating: 1,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const { token } = useSelector((state) => state?.auth);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = () => {
    axios
      .get(`${config.baseURL}/api/Testimonial/testimonals`)
      .then((response) => setTestimonials(response.data))
      .catch((error) => console.error("Error fetching testimonials:", error));
  };

  const openModal = () => {
    setCurrentTestimonial({
      Name: "",
      Description: "",
      Profile_Image: "",
      Rating: 1,
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setSelectedFile(null);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTestimonial({ ...currentTestimonial, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", currentTestimonial.Name);
    formData.append("Description", currentTestimonial.Description);
    formData.append("Rating", currentTestimonial.Rating);
    if (selectedFile) {
      formData.append("Profile_Image", selectedFile);
    }

    const url = isEditModalOpen
      ? `${config.baseURL}/api/Testimonial/testimonals/${currentTestimonial._id}`
      : `${config.baseURL}/api/Testimonial/createTestimonal`;

    const method = isEditModalOpen ? "PUT" : "POST";

    axios({
      method,
      url,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: ` ${token}`,
      },
      data: formData,
    })
      .then((response) => {
        const data = response.data;
        if (isEditModalOpen) {
          setTestimonials(
            testimonials.map((testimonial) =>
              testimonial._id === data._id ? data : testimonial
            )
          );
        } else {
          setTestimonials([...testimonials, data]);
        }
        closeModal();
        closeEditModal();
      })
      .catch((error) => console.error("Error submitting testimonial:", error));
  };

  const handleDeleteTestimonial = (testimonialId) => {
    axios
      .delete(
        `${config.baseURL}/api/Testimonial/testimonals/${testimonialId}`,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      )
      .then(() => {
        setTestimonials(
          testimonials.filter(
            (testimonial) => testimonial._id !== testimonialId
          )
        );  
      })
      .catch((error) => console.error("Error deleting testimonial:", error));
  };

  const handleDescriptionChange = (value) => {
    setCurrentTestimonial({
      ...currentTestimonial,
      Description: value,
    });
  };

  return (
    <div className="w-full mx-auto mt-10 px-5">
      <div
        className="bg-white rounded-lg shadow-lg p-5"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
            onClick={openModal}
          >
            Add New Testimonial
          </button>
        </div>
        {testimonials.length > 0 ? (
          <table className="min-w-full bg-white text-center">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Profile Image</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial, index) => (
                <tr key={testimonial._id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{testimonial.Name}</td>
                  <td className="px-4 py-2">
                  
                  {/* {testimonial.Description} */}
                  <div dangerouslySetInnerHTML={{ __html: testimonial?.Description }}  >

                  </div>
                  </td>
                  <td className="px-4 py-2">
                    <img
                      src={testimonial.Profile_Image}
                      alt={testimonial.Name}
                      className="w-16 h-16 rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2">{testimonial.Rating}</td>
                  <td className="px-4 py-2 space-y-2">
                    <div className="flex flex-col space-y-2">
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded mx-auto"
                        onClick={() => openEditModal(testimonial)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mx-auto"
                        onClick={() => handleDeleteTestimonial(testimonial._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No testimonials available.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-white rounded-lg p-8 shadow-lg z-10 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Testimonial</h2>
              <button onClick={closeModal} className="text-gray-500">
                &times;
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="Name"
                  value={currentTestimonial.Name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <ReactQuill
                  value={currentTestimonial.Description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter chef's bio"
                  className="login-input w-full mt-1"   
                  style={{ height: "200px" }} 
                />
              </div>
              <div className="mb-4 mt-11">
                <label className="block mb-2 ">Profile Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Rating</label>
                <input
                  type="number"
                  name="Rating"
                  value={currentTestimonial.Rating}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="1"
                  max="5"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Testimonial
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
          <div className="bg-white rounded-lg p-8 shadow-lg z-10 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Testimonial</h2>
              <button onClick={closeEditModal} className="text-gray-500">
                &times;
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="Name"
                  value={currentTestimonial.Name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <ReactQuill
                  value={currentTestimonial.Description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter chef's bio"
                  className="login-input w-full mt-1"
                  style={{ height: "200px" }} 
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Profile Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Rating</label>
                <input
                  type="number"
                  name="Rating"
                  value={currentTestimonial.Rating}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="1"
                  max="5"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Testimonial
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;
