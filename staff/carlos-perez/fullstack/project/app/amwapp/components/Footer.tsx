import Link from "next/link"

import { socialMedia, musicPlatforms } from "@/constants"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__elements">
                <p className="footer__copyright">@2023 Alex Maybe. All Rights Reserved</p>
                <div className="footer__links-container">
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

            </div>

        </footer>
    )
}

export default Footer