import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/modal.css";
import ModalCard from "./ModalCard";

function Modal({ closeModal, id }) {
  const [comment, setComment] = useState("");
  const [movieComment, setMovieComment] = useState([]);

  const addComment = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:4000/addmoviereview",
        {
          review: comment,
          movieId: id,
        },
        {
          withCredentials: true,
        }
      )
      .then(
        (res) => {
          if (res.data === "success") {
            setComment("");
          }
        },
        () => {
          console.log("Failure");
        }
      );

    await axios
      .get(`http://localhost:4000/getmoviereview/${id}`, {
        withCredentials: true,
      })
      .then(
        (res) => {
          if (res.data) {
            // console.log(res.data);
            setMovieComment(res.data);
          }
        },
        () => {
          console.log("Failure");
        }
      );
  };

  


  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <input
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            name="comment"
            className="modalInput"
            placeholder="your comment"
            type="text"
          />
          <div className="inputBtnContainer">
            <button onClick={() => closeModal(false)} className="modalCloseBtn">
              Close
            </button>
            <button onClick={addComment} className="modalAddBtn">
              Add
            </button>
          </div>
        </div>

        <div className="body">
        
          <ModalCard movieComment={movieComment} id={id} />
        </div>
      </div>
    </div>
  );
}

export default Modal;