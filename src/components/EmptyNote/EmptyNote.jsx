import React from "react";
import no_note from "../../assets/no_note.svg";

const EmptyNote = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <img src={no_note} alt="No notes" className="mb-4 w-[20%] h-50" />
      <span className="text-gray-600 text-[1.5rem]">
        Notes that you add appear here
      </span>
    </div>
  );
};

export default EmptyNote;
