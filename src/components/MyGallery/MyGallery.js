import React, { useState, useEffect, useCallback } from 'react';
import MyModal from '../MyModal/MyModal';
import './MyGallery.css';

function MyGallery({ images }) {
    // State hooks to manage the custom modal and selected image
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState({});
    // useCallback hook to 'memoize' the 'getGridColumns' function
    const getGridColumns = useCallback(() => {
        let width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        if (width < 900) {
            return 1;
        } else if (width > 900 && width < 1200) {
            return 2;
        } else {
            return images.length > 3 ? 3 : images.length;
        }
    }, [images]);

    // State hook to manage the number of grid columns based on the window width
    const [gridColumns, setGridColumns] = useState(getGridColumns());

    // Effect hook to update the number of grid columns on window resize
    useEffect(() => {
        function handleResize() {
            setGridColumns(getGridColumns());
        }

        // Add event listener to window for resize events
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        }
      
    }, [getGridColumns, images.length]);

    // Function to open the modal and set the selected image
    const openModal = img => {
        setIsModalOpen(true);
        setSelectedImage(img);
    }

    // Function to close the modal and reset the selected image
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage({});
    }

    return (
        <div className={`gallery-container ${isModalOpen && "modal-active"}`} style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
            {/* Map over the images array and create a div for each */}
            {images.map((image, index) => (
                <div key={image.id} className="gallery-item">
                    {/* Render the image with an onClick event to open the modal */}
                    <img src={image.url} alt={image.title} onClick={openModal}/>
                </div>
            ))}
            {/* Render the modal if it's open */}
            {isModalOpen && <MyModal image={selectedImage} close={closeModal} />}
        </div>
        );
    }

export default MyGallery;