import React, { useState } from 'react';
import '../All_css/Testimony.css';

const testimonies = [
  {
    name: 'Ankit Raj',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    testimony: "I'm grateful for the impact my donation made. It's heartening to see positive change."
  },
  {
    name: 'Aayush Bhagat',
    image: 'https://images.pexels.com/photos/997512/pexels-photo-997512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    testimony:"Supporting this cause brought joy to my heart. Witnessing the difference is truly inspiring.",
  },
  {
    name: 'Sangeeta Jha',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    testimony: "A small contribution can make a big difference. I'm honored to be part of this meaningful journey.",
  },
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleNextClick = () => {
    setCurrentTestimonial((currentTestimonial + 1) % testimonies.length);
  };

  return (
    <div className="testimonials">
      <div className="testimonial">
        <img src={testimonies[currentTestimonial].image} alt={testimonies[currentTestimonial].name} />
        <h3>{testimonies[currentTestimonial].name}</h3>
        <p>{testimonies[currentTestimonial].testimony}</p>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
};

export default Testimonials;
