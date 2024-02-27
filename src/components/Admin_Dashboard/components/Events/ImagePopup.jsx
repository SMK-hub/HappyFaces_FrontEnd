/* eslint-disable jsx-a11y/img-redundant-alt */
// ImagePopup.js
import React from "react";
import "./ImagePopup.css";

const ImagePopup = ({ images, onClose }) => {
  return (
    <div className="image-popup">
      <span className="close-icon" onClick={onClose}>
        &times;
      </span>
      <div className="image-container">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>
      <div className="title">HappyFaces#1</div>
    </div>
  );
};

export default ImagePopup;
