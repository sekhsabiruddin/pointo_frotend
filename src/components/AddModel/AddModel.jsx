import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createNote, updateNote } from "../../redux/dataSlice";
import Swal from "sweetalert2";
const AddModel = ({ modelOpenAndClose, noteToEdit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleAddOrUpdate = () => {
    if (!title || !content) {
      alert("Input should not be empty");
      return;
    }

    if (noteToEdit) {
      dispatch(updateNote({ id: noteToEdit.id, title, content }));
      Swal.fire({
        title: "Updated!",
        text: "Your note has been updated.",
        icon: "success",
        timer: 500,
        showConfirmButton: false,
      }).then(() => {
        modelOpenAndClose();
      });
    } else {
      dispatch(createNote({ title, content }));
      Swal.fire({
        title: "Added!",
        text: "Your note has been added.",
        icon: "success",
        timer: 500,
        showConfirmButton: false,
      }).then(() => {
        modelOpenAndClose();
      });
    }

    modelOpenAndClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
          {noteToEdit ? "Edit Note" : "Add Note"}
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-lg font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              placeholder="Enter the note title..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="content"
              className="text-lg font-medium text-gray-700"
            >
              Content:
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="content"
              placeholder="Enter the content..."
              className="px-4 py-2 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none "
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={modelOpenAndClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddOrUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {noteToEdit ? "Update Note" : "Add Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModel;
