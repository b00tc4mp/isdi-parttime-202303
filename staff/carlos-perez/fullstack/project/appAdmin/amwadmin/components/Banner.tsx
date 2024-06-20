import Image from "next/image";

const Banner = () =>{
    return(
        <div className="banner-container">
            <Image
            src={'/banner-6.JPG'}
            alt="banner"
            priority
            className="object-cover"
            width={640}
            height={480}
            />
        </div>
    )
}

export default Banner;