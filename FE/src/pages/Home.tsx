import  { useState, useEffect } from 'react';
import bn1 from '../images/bn1.jpg';
import bn2 from '../images/bn2.jpg';
import bn3 from '../images/bn3.jpg';
import bn4 from '../images/bn4.jpg';
import bn5 from '../images/bn5.jpg';

const images = [bn1, bn2, bn3, bn4, bn5];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); 

    return () => clearInterval(interval); 
  }, []);


  return (
    <div className=" pt-[125px]">

      <div className="">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="carousel-image" />
      </div>

    </div>
  );
};

export default Home;
