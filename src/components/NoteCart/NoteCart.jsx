import React from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import SkeletonLoader from "../Skeleton/SkeletonLoader";
import { useSelector } from "react-redux";
const NoteCart = ({ notes, handleDeleteClick, openEditModal }) => {
  const loading = useSelector((data) => data.notes.loading);
  const totalNote = useSelector((data) => data.notes.notes);

  return (
    <div>
      {loading ? (
        Array(totalNote.length)
          .fill(0)
          .map((_, index) => <SkeletonLoader key={index} />)
      ) : notes.length === 0 ? (
        <div className="h-[80vh] flex justify-center items-center">
          <p className="text-gray-500 text-center">No notes available.</p>
        </div>
      ) : (
        notes.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-start mb-2 bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-md"
          >
            <div className="w-[90%] lg:w-[80%]">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 ">{item.content}</p>
            </div>
            <div className="w-[20%] flex justify-end gap-4 items-center">
              <span
                onClick={() => handleDeleteClick(item.id)}
                className="text-red-500 hover:text-red-600 cursor-pointer transition-transform transform hover:scale-110"
                aria-label={`Delete note titled ${item.title}`}
              >
                <MdDelete size={25} />
              </span>
              <span
                onClick={() => openEditModal(item)}
                className="text-green-500 hover:text-green-600 cursor-pointer transition-transform transform hover:scale-110"
                aria-label={`Edit note titled ${item.title}`}
              >
                <FaRegEdit size={25} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteCart;
