import React from 'react';
import './Examples.css';

const Examples = ({id, image, title, content, alt,link=null }) => {
    return (
        <div id={id} className="bottom-section">
            <div className="text-container">
                <h2 className='title'>{title}</h2>
                <p>{content}</p>
            </div>
            <div className="image-container">
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <img src={image} alt={alt} />
                </a>
            </div>
        </div>
    );
};

export default Examples;
