import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addEntity,
  updateEntity,
  setEditingId,
  setFormData,
} from "../features/entity/entitiesSlice";

const EntityForm = () => {
  const dispatch = useDispatch();
  const editingId = useSelector((state) => state.entities.editingId);
  const formData = useSelector((state) => state.entities.formData);
  const entities = useSelector((state) => state.entities.entities);

  const [localFormData, setLocalFormData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    dateofbirth: "",
  });

  // Helper function to format date and adjust for timezone offset
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      // Adjust for timezone offset
      return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
    } else {
      // Handle invalid date
      console.error("Invalid date:", dateString);
      return "Invalid date";
    }
  };

  useEffect(() => {
    if (editingId) {
      const entity = entities.find((entity) => entity.id === editingId);
      console.log(entity.dateofbirth);

      setLocalFormData({
        ...entity,
        dateofbirth: formatDate(entity.dateofbirth),
      });
    } else {
      setLocalFormData({
        name: "",
        email: "",
        mobilenumber: "",
        dateofbirth: "",
      });
    }
  }, [editingId, entities]);

  const handleChange = (e) => {
    setLocalFormData({ ...localFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...localFormData,
      dateofbirth: localFormData.dateofbirth.split("T")[0], // Ensure only the date part is stored
    };
    if (editingId) {
      axios
        .put(`http://localhost:5000/api/${editingId}`, formattedData)
        .then((response) => {
          dispatch(updateEntity(response.data));
          dispatch(setEditingId(null));
          setLocalFormData({
            name: "",
            email: "",
            mobilenumber: "",
            dateofbirth: "",
          });
        })
        .catch((error) =>
          console.error("There was an error updating the entity!", error)
        );
    } else {
      axios
        .post("http://localhost:5000/api/", formattedData)
        .then((response) => {
          dispatch(addEntity(response.data));
          setLocalFormData({
            name: "",
            email: "",
            mobilenumber: "",
            dateofbirth: "",
          });
        })
        .catch((error) =>
          console.error("There was an error creating the entity!", error)
        );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 bg-gray-800 text-white p-6 rounded-lg"
    >
      <h1 className="text-xl text-center font-bold mb-4">Add Entity</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={localFormData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={localFormData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Mobile Number</label>
          <input
            type="text"
            name="mobilenumber"
            value={localFormData.mobilenumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateofbirth"
            value={localFormData.dateofbirth}
            onChange={handleChange}
            className="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default EntityForm;
