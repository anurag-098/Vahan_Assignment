// src/components/EntityList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setEntities,
  setEditingId,
  setFormData,
  deleteEntity,
} from "../features/entity/entitiesSlice";

const EntityList = () => {
  const dispatch = useDispatch();
  const entities = useSelector((state) => state.entities.entities);
  const editingId = useSelector((state) => state.entities.editingId);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/")
      .then((response) => {
        dispatch(setEntities(response.data));
      })
      .catch((error) =>
        console.error("There was an error fetching the entities!", error)
      );
  }, [dispatch, editingId]);

  const handleEdit = (entity) => {
    dispatch(setFormData(entity));
    dispatch(setEditingId(entity.id));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/${id}`)
      .then(() => {
        dispatch(deleteEntity(id));
      })
      .catch((error) =>
        console.error("There was an error deleting the entity!", error)
      );
  };

  return (
    <div className="mt-8">
      <div className="bg-gray-700 p-4 rounded-md">
        <div className="grid grid-cols-5 gap-4 text-white text-center font-bold md:gap-2 sm:gap-1">
          <div>Name</div>
          <div>Email</div>
          <div>Mobile Number</div>
          <div>Date of Birth</div>
          <div>Actions</div>
        </div>
      </div>
      {entities.map((entity) => (
        <div key={entity.id} className="bg-gray-800 p-4 mt-2 rounded-md grid grid-cols-5 gap-4 md:gap-2 sm:gap-1 items-center">
          <div className="flex justify-center">{entity.name}</div>
          <div className="flex justify-center">{entity.email}</div>
          <div className="flex justify-center">{entity.mobilenumber}</div>
          <div className="flex justify-center">
            {new Date(entity.dateofbirth).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
          <div className="flex justify-center">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => handleEdit(entity)}
                className="border border-gray-500 text-white hover:bg-gray-700 px-2 py-1 rounded-l-md"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(entity.id)}
                className="border border-gray-500 text-white hover:bg-gray-700 px-2 py-1 rounded-r-md"
              >
                ❌
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntityList;
