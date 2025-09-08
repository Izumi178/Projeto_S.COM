import { useEffect, useState } from "react";
import frente from "../assets/unesp_frente.jpeg";
import refetorio from "../assets/unesp-refeitório.jpg";
import portaria from "../assets/unesp-portaria.jpg";

function ImageSlider() {
  const images = [frente, refetorio, portaria];
  const active = "w-full h-full object-contain transition delay-500";
  const inactive = "hidden";
  const [activeIndex, changeImage] = useState(0);
  useEffect(() => {
    const period = setInterval(() => {
      changeImage(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(period);
  }, [activeIndex]);
  return (
    <div className="w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div key={image} className={index === activeIndex ? active : inactive}>
          <img src={image} className="w-full h-full object-cover"></img>
        </div>
      ))}
    </div>
  );
}

export default ImageSlider;
