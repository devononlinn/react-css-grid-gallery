import React, { useState, useEffect } from 'react';
import './App.css';
import MyGallery from './components/MyGallery/MyGallery';
import deer from './assets/deer.jpg';
import elephant from './assets/elephant.jpg';
import fox from './assets/fox.jpg';
import tiger from './assets/tiger.jpg';
import turtle from './assets/turtle.jpg';
import owl from './assets/owl.jpg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faShuffle);

function App() {
  // Define a function to generate random object ids - kept simple to practice code convention only
  const generateObjectId = () => {
    return Math.floor(Math.random() * .9);
  }

  // Define an array of images as objects with id, title and url properties
  const images = [
    { id: `${generateObjectId()}md`, title: "Majestic Deer", url: deer},
    { id: `${generateObjectId()}we`, title: "Wild Elephant", url: elephant},
    { id: `${generateObjectId()}sf`, title: "Sleeping Fox", url: fox},
    { id: `${generateObjectId()}pt`, title: "Powerful Tiger", url: tiger},
    { id: `${generateObjectId()}wo`, title: "Wise Owl", url: owl},
    { id: `${generateObjectId()}vt`, title: "Vibrant Turtle", url: turtle}
  ];

  // Use the useState hook to define a state for active images, set the initial state to images array
  const [activeImages, setActiveImage] = useState(images);

  // Define afunction to update the active images state based on the input value
  const updateFilter = str => {
    let filteredImgs = images.filter(img => img.title.toLowerCase().includes(str.target.value.toLowerCase()));
    setActiveImage(filteredImgs);
  }

  // Define a function to shuffle the active images state
  const shuffleImages = () => {
    let newActiveImages = [...activeImages].sort((a,b) => 0.5 - Math.random());
    setActiveImage(newActiveImages);
  }

  // Use the useEffect hook to define an effect when activeImages state is updated
  useEffect(() => {}, [activeImages]);
  

  return (
    <div className="App">
      {/* Filter container with search input and shuffle button */}
      <div className="filter-container">
        <input type="search" placeholder="Search" onChange={updateFilter} />
        <button type="submit" onClick={shuffleImages}><FontAwesomeIcon icon="fa-solid fa-shuffle" /></button>
      </div>
      {/* MyGallery component to render the activeImages state */}
      <MyGallery images={activeImages} />
    </div>
  );
}

export default App;