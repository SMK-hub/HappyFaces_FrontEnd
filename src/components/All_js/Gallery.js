// components/Gallery.js
import React , { useRef }from 'react';
import ReactSwipe from 'react-swipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../All_css/Gallery.css';
import Header from './Header';
import playImage from "../../Images/image1_0_Play.jpg";
import prayImage from "../../Images/image0_0_Pray.jpg";
import studyImage from "../../Images/image0_0_Study.jpg";
import sleepImage from "../../Images/sleepChild.jpeg";
import eatImage from "../../Images/eatChild.jpeg";
import M4 from "../../Images/M4.jpg";
import M5 from "../../Images/M5.jpg";
import M6 from "../../Images/M6.jpg";
import M7 from "../../Images/M7.jpg";
import M8 from "../../Images/M8.jpg";
import M10 from "../../Images/M10.jpg";
import Footer from './Footer';
// import { Header } from 'tar';


const Gallery = () => {
  // Example gallery images (replace with your own images and captions)
  const galleryImages = [
    { id: 1, src: playImage, caption: 'Create a compassionate website highlighting the transformative power of education for orphaned children. Showcase success stories, educational programs, and ways for visitors to support and get involved' },
    { id: 2, src: prayImage, caption: 'Step into the serene world of our orphanage as captured in heartfelt moments of children in prayer. Explore our gallery to witness the spiritual resilience and shared moments of reflection, highlighting the importance of faith in shaping their lives. Join us in embracing a community where prayer becomes a source of solace and unity.' },
    { id: 3, src: studyImage, caption: 'Experience the joyous spirit of childhood in our orphanage playground! Dive into our gallery to witness the laughter, friendships, and playful adventures of orphaned children. Discover how a vibrant and safe play environment fosters happiness and holistic development. Join us in celebrating the simple pleasures that make every child\'s journey special.' },
    // Add more images as needed
  ];

   const slideImages = [
    { id: 1, src: M4},
      { id: 2, src: M5},
      { id: 3, src: M6},
      { id: 4, src:M7},
      {id:5, src:M8},
      {ID:6, src:M10},
   ];

  const reactSwipeEl = useRef(null);

  const handleNext = () => {
    if (reactSwipeEl.current) {
      reactSwipeEl.current.next();
    }
  };

  const handlePrev = () => {
    if (reactSwipeEl.current) {
      reactSwipeEl.current.prev();
    }
  };

  const handleSwipeLeft = () => {
    handleNext();
  };

  const handleSwipeRight = () => {
    handlePrev();
  };
 

  return (
    <div className='gallery'>
      <Header/>
    <div>
      <p className='para'>Gallery</p>
    <div className='gallery_page'>
      <div className="gallery-container">
        {galleryImages.map((image, index) => (
          <div key={image.id} className={index % 2 === 0? 'row-even':'row-odd'} >
            <div className='image-container hover'>
            <figure><img src={image.src} style={{objectPosition:'center'}} alt= {`_Image_:${image.caption}`}/></figure>
            </div>
            <div className='caption-container' >
            <p>{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="carousel_buttons">
    <FontAwesomeIcon icon={faArrowLeft} className="carousel_button" onClick={handlePrev} />
        <div className='carousel_border'>
        <ReactSwipe
          className="carousel"
          swipeOptions={{ continuous: true,callback: (index) => console.log(`Current slide index: ${index}`),
          threshold: 100, // Adjust the swipe threshold as needed
          onSwipeLeft: handleSwipeLeft,
          onSwipeRight: handleSwipeRight, }}
          ref={reactSwipeEl}
        >
          {slideImages.map((image) => (
            <div className='awd12' style={{display:'flex',alignItems:'center',height:'500px'}} key={image.id}>
              <img src={image.src} alt={`_Image_:${image.caption}`} />
            </div>
          ))}
        </ReactSwipe>
        </div>
        
        <FontAwesomeIcon icon={faArrowRight} className="carousel_button" onClick={handleNext} />
        </div>
    </div>
    <Footer/>
    </div>
  );
};
 
export default Gallery;