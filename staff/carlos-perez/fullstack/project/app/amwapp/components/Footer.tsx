import Image from "next/image"
import Link from "next/link"

import { socialMedia, musicPlatforms  } from "@/constants"

const Footer = () => {
    return (
        <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100 max-w-[1440px] mx-auto navbar-bg justify-center h-fit">
            <div className="flex justify-between items-center flex-wrap sm:px-16 px-6 py-10">
                <p>@2023 Alex Maybe. All Rights Reserved</p>
                <div className="footer__links">
                    {socialMedia.map((link) => (
                        <div key={link.title} className="footer__link">
                            <h3 className="font-bold">{link.title}</h3>
                            {link.links.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.url}
                                    className="text-gray-500">
                                    {item.title}
                                </Link>


                            ))}
                        </div>
                    ))}

                </div>
                                
                <div className="footer__links">
                    {musicPlatforms.map((link) => (
                        <div key={link.title} className="footer__link">
                            <h3 className="font-bold">{link.title}</h3>
                            {link.links.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.url}
                                    className="text-gray-500">
                                    {item.title}
                                </Link>


                            ))}
                        </div>
                    ))}

                </div>
                
            </div>

        </footer>
    )
}

export default Footer