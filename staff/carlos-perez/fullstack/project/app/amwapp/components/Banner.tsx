import Image from "next/image";

const Banner = () =>{
    return(
        <div className="banner-container">
            <Image
            src={'/banner-6.JPG'}
            alt="banner"
            priority
            className="object-contain"
            width={600}
            height={400}
            />
        </div>
    )
}

export default Banner;