import { useEffect, useState } from "react";
import frente from "../../assets/unesp_frente.jpeg";
import refetorio from "../../assets/unesp-refeitório.jpg";
import portaria from "../../assets/unesp-portaria.jpg";

function ImageSlider() {
  //declarando array de imagens
  const images = [frente, refetorio, portaria];
  //declarando o useState para controlar qual imagem sera mostrada
  const [activeIndex, changeImage] = useState(0);
  //declarando o useEffect,
  useEffect(() => {
    //Executrará a função changeImage após um intervalo de 5 segundos
    const period = setInterval(() => {
      changeImage(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
    }, 5000);
    //após o período de 5 segundos, o intervalo é resetado
    return () => clearInterval(period);
  }, [activeIndex]);
  return (
    <div className="w-full h-full overflow-hidden transition ">
      {/*a função .map() transforma os items do 
      array "images" em elementos individuais "image"*/}
      {images.map((image, index) => (
        /*Caso o indice associado a image corresponda ao indice ativo, 
        o container que contem a imagem é mostrado, senão é escondido*/
        <div
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
