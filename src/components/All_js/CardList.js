// // Assuming this component is in a file named CardList.js

// import React from 'react';
// import './CardList.css';

// const CardList = () => {
//   const cardData = [
//     {
//       imageUrl: 'https://i.imgur.com/oYiTqum.jpg',
//       thumbUrl: 'https://i.imgur.com/7D7I6dI.png',
//       title: 'Jessica Parker',
//       status: '1 hour ago',
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?',
//     },
//     {
//       imageUrl: 'https://i.imgur.com/2DhmtJ4.jpg',
//       thumbUrl: 'https://i.imgur.com/sjLMNDM.png',
//       title: 'kim Cattrall',
//       status: '3 hours ago',
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?',
//     },
//     // Add more card data as needed
//   ];

//   return (
//     <ul className="cards">
//       {cardData.map((card, index) => (
//         <li key={index}>
//           <a href="" className="card">
//             <img src={card.imageUrl} className="card__image" alt="" />
//             <div className="card__overlay">
//               <div className="card__header">
//                 <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
//                   <path />
//                 </svg>
//                 <img className="card__thumb" src={card.thumbUrl} alt="" />
//                 <div className="card__header-text">
//                   <h3 className="card__title">{card.title}</h3>
//                   {card.tagline && <span className="card__tagline">{card.tagline}</span>}
//                   <span className="card__status">{card.status}</span>
//                 </div>
//               </div>
//               <p className="card__description">{card.description}</p>
//             </div>
//           </a>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default CardList;

// SlideUpCaptionHoverEffect.js
import React from 'react';
import '../All_css/CardList.css';

const SlideUpCaptionHoverEffect = () => {
  return (
    <div className="slide-up-container">
      <div className="slide-up-item">
        <img src="https://images.pexels.com/photos/13759377/pexels-photo-13759377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1ttps://images.pexels.com/photos/15198766/pexels-photo-15198766/free-photo-of-a-young-girl-holding-a-bunch-of-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Image 2" className="image" />
        {/* <img src="https://images.pexels.com/photos/1739842/pexels-photo-1739842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Image 1" className="image" /> */}
        <div className="caption">
          <h2>In poverty, a resilient boy, Arjun leads and cares for his siblings, navigating challenges with strength, love, and determination.</h2>
        </div>
      </div>
      <div className="slide-up-item">
        <img src="https://images.pexels.com/photos/1739842/pexels-photo-1739842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Image 1" className="image" />
        <div className="caption">
          <h2>Diksha overcame adversity with determination, securing education and uplifting her family through resilience and hard work, defying circumstances</h2>
        </div>
      </div>
    </div>
  );
};

export default SlideUpCaptionHoverEffect;

