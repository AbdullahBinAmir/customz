import React, { useState } from "react";
import ImageEditorModal from "./image-cropper";
import axios from "axios";
import { medusaUrl } from "../../../../services/config";

const CustomizerSection = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleImageClick = (image) => {
    setSelectedImage(image); // Open modal with clicked image
  };

  const handleSaveCroppedData = async (croppedData, imageId) => {
    try {
      setLoading(true); // Start loading
      const response = await axios.post(`${medusaUrl}/store/custom/updateImageData`, {
        id: imageId,
        metadata: croppedData
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error updating metadata:', error.response ? error.response.data : error.message);
      alert("error while updating image")
    }
    finally {
      setSelectedImage(null); // Close modal after saving
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      {/* Image List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Image ${index}`}
            className="cursor-pointer hover:opacity-75 transition"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {/* Open Modal when an image is clicked */}
      {selectedImage && (
        <ImageEditorModal
          selectedImage={selectedImage}
          onSave={handleSaveCroppedData}
          setSelectedImage={setSelectedImage}
          loading={loading}
        />
      )}
    </div>
  );
};

export default CustomizerSection;