import Musicbrainz from '../components/PearlJamInfo'

export default function Home({ onPanelClick }) {
    console.debug('// Home  -> Render')

    return <div id="home" className="pt-20 px-2">
        <Musicbrainz />
    </div>

}