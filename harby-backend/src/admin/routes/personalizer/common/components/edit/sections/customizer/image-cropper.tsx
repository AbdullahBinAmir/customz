import React, { useState, createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageEditorModal = ({ selectedImage, onSave, setSelectedImage, loading }) => {
    const [cropData, setCropData] = useState(null); // Cropped data coordinates
    const cropperRef = createRef<ReactCropperElement>(); // Reference for cropper
    // Get crop data (coordinates) relative to image size
    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const cropper = cropperRef.current.cropper;
            const cropBoxData = cropper.getCropBoxData(); // Get crop box dimensions
            const canvasData = cropper.getCanvasData(); // Get original image dimensions
            const imageDimensions = {
                width: canvasData.naturalWidth,
                height: canvasData.naturalHeight,
            };

            const cropDetails = {
                x: cropBoxData.left,
                y: cropBoxData.top,
                width: cropBoxData.width,
                height: cropBoxData.height,
                imageDimensions,
            };
            setCropData(cropDetails);
        }
    };

    const handleSave = () => {
        getCropData();
        if (cropData) {
            onSave(cropData, selectedImage.id); // Send cropped coordinates back to parent
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
          <div className="bg-white rounded-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl p-4">
                <h2 className="text-xl font-bold mb-4">Crop Image</h2>

                {/* Cropper */}
                {selectedImage.url && (
                    <div className="w-[600px] h-[600px] overflow-auto mx-auto">
                        <Cropper
                            ref={cropperRef}
                            style={{ height: 660, width: 600 }}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={selectedImage.url}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            guides={true}
                        />
                    </div>
                )}

                {/* Save/Cancel Buttons */}
                <div className="mt-4 flex justify-between">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        onClick={() => {
                            setCropData(null)
                            setSelectedImage(null)
                        }} // Reset on cancel
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleSave}
                    >
                        {loading ? "Saving..." : "Save"} {/* Show loading text */}

                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageEditorModal;