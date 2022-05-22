import React from "react";

const Comment = ({ author, date, text, _id }) => {
  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const convertedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    return convertedDate;
  };

  return (
    <div>
      {" "}
      <div className="bg-light p-1 my-1" key={_id}>
        <small className="">
          submited by {author} at date {convertDate(+date)}{" "}
        </small>
        <p className="lead">{text}</p>
      </div>
    </div>
  );
};

export default Comment;
