import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getAllNotes, deleteNote } from "../../redux/dataSlice";
import AddModel from "../AddModel/AddModel";
import EmptyNote from "../EmptyNote/EmptyNote";
import NoteCart from "../NoteCart/NoteCart";
import SkeletonLoader from "../Skeleton/SkeletonLoader";

const MyNote = () => {
  const loading = useSelector((data) => data.notes.loading);
  const [isOpen, setOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const notes = useSelector((data) => data.notes.notes);
  const isSearch = useSelector((data) => data.notes.isSearch);
  const searchNote = useSelector((data) => data.notes.searchNote);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotes());
  }, [dispatch]);

  // Handle Delete Click Function
  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "Do you want to delete this note?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await dispatch(deleteNote(id));
      await dispatch(getAllNotes());
      Swal.fire({
        title: "Deleted!",
        text: "Your note has been deleted.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const openEditModal = (note) => {
    setNoteToEdit(note);
    setOpen(true);
  };

  const modelOpenAndClose = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <div className="flex justify-center mt-10 p-4 lg:p-5">
        <div className="bg-white border border-gray-300 rounded-lg w-[95%] sm:w-[90%] md:w-[85%] lg:w-[70%] lg:p-6">
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, index) => <SkeletonLoader key={index} />)
          ) : searchNote.length > 0 ? (
            <NoteCart
              notes={searchNote}
              handleDeleteClick={handleDeleteClick}
              openEditModal={openEditModal}
            />
          ) : isSearch && searchNote.length === 0 ? (
            <p className="text-center text-gray-700">No data available</p>
          ) : (
            <NoteCart
              notes={notes}
              handleDeleteClick={handleDeleteClick}
              openEditModal={openEditModal}
            />
          )}
        </div>
      </div>

      {isOpen && (
        <AddModel
          modelOpenAndClose={modelOpenAndClose}
          noteToEdit={noteToEdit}
        />
      )}
    </>
  );
};

export default MyNote;
