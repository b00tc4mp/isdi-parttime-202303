import React from 'react'
import getCurrentYear from '../../logic/helpers/getCurrentYear'

function Footer() {

    const currentYear = getCurrentYear();

    return (<>
        <footer className='flex justify-end h-32 flex-col items-end pt-2 px-3'>
            <p>Live Dive® · {currentYear}</p>
        </footer>    </>
    )
}

export default Footer;
