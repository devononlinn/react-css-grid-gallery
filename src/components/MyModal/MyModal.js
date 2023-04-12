import React from 'react';
import './MyModal.css';

function MyModal(props) {
    // Destructure the props object to get the image and close props
    const { image } = props;
    const { close } = props;

    return (
        <div className="modal-container">
            {/* Create a modal body with the background image of the selected image */}
            <div className="modal-body" style={{backgroundImage: `url(${image.target.src})`}}>
                {/* Create a modal title with the alt text of the selected image */}
                <div className="modal-title">
                    {/* Create a button to close the modal on click */}
                    <h1>{image.target.alt}</h1><button type="button" onClick={close}></button>
                </div>
            </div>
        </div>
        );
    }

export default MyModal;