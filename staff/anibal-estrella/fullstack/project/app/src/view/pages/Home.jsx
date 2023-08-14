import React, { useState } from 'react'
import { EventCard } from '../components'

export default function Home({ onPanelClick }) {
    console.debug('// Home  -> Render')

    return <section id="home" className="pt-8 px-2">
        <section id='events-featured'>
            <h2>Featured Events</h2>
        </section>
        <section>
            <h2>Featured Reviews</h2>
        </section>
        <section id='Events'>
            <h2>Events in <span>your area</span></h2>
        </section>
    </section>
}