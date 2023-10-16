'use client';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Carrousel = () => {
return(
    <Carousel dynamicHeight={true} infiniteLoop={true} centerMode={true} centerSlidePercentage={90} emulateTouch={true}>
        <div className='carrousel-image'>
          <img src="banner-2.JPG" />
        </div>
        <div className='carrousel-image'>
          <img src="banner-3.JPG" />
        </div>
        <div className='carrousel-image'>
          <img src="banner-4.JPG" />
        </div>
        <div className='carrousel-image'>
          <img src="banner-5.JPG" />
        </div>
        <div className='carrousel-image'>
          <img src="banner-6.JPG" />
        </div>
    </Carousel>
)
}

export default Carrousel;