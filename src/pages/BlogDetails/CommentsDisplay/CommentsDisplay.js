import React from "react";

const CommentsDisplay = ({ comment }) => {

  return (
    <div className="mt-6 px-4">
      <div className="flex gap-2">
        <img
          src={comment.userPhoto}
          alt="userPhoto"
          className="w-11 h-11 rounded-full"
        />
        <div className="w-full">
          <small>@{comment.userName}</small>
          <p className="text-[15px]">{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentsDisplay;
