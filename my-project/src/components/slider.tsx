import { useEffect, useState } from "react";
import frente from "../assets/unesp_frente.jpeg";
import refetorio from "../assets/unesp-refeitório.jpg";
import portaria from "../assets/unesp-portaria.jpg";

function ImageSlider() {
  const images = [frente, refetorio, portaria];
  const [activeIndex, changeImage] = useState(0);
  useEffect(() => {
    const period = setInterval(() => {
      changeImage(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(period);
  }, [activeIndex]);
  return (
    <div className="w-full h-full overflow-hidden transition ">
      {images.map((image, index) => (
        <div
          key={image}
          className={
            index === activeIndex ? "w-full h-full object-contain" : "hidden"
          }
        >
          <img src={image} className="w-full h-full object-cover"></img>
        </div>
      ))}
    </div>
  );
}

export default ImageSlider;
