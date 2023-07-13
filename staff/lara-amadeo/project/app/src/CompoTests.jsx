import Tabbar from './library/modules/Tabbar'
import MealCard from './library/modules/MealCard'
import Avatar from './library/components/Avatar'
import Topbar from './library/modules/Topbar'
import Header from './library/components/Header'
import Logo from './library/components/Logo'
import TextField from './library/components/TextField'
import Button from './library/components/Button'
import Chip from './library/components/Chip'
import DataItem from './library/components/DataItem'
import Container from './library/components/Container'
import DaySelector from './library/components/DaySelector'
import Link from './library/components/Link'
import TextArea from './library/components/TextArea'
import Spinner from './library/components/Spinner'
import IconButton from './library/components/IconButton'
import EmptyPhoto from './library/components/EmptyPhoto'
import CategoryIcon from './library/components/CategoryIcon'
import Tabs from './library/components/Tabs'

export default function CompoTests() {
    const { loaderOn, loaderOff } = useContext(Context)
    const [view, setView] = useState('test')

    // loaderOn()

    return <>
        {view === 'test' && <div className='container'>
            <span className="icon-img-place"></span>
            <TextField label={"Label text"} description={"Description text"} placeholder={"placeholder pedorro"} />
            <Button category={"critical"} size={"small"} icon={false} label={"Button label"} onClick={() => location.reload()} />
            <Chip label={"label"} state={"success"} />
            <Header text={'Profile details'} />
            <DataItem label={"Label"} description={"Lorem ipsum dolor"} />
            <Container width={'382px'} height={'100px'} type={'border'}>
                <Button category={"critical"} size={"small"} icon={false} label={"Button label"} />
            </Container>
            <Container width={'382px'} height={'100px'} type={'shadow'} elevation={'1'}>
                <Chip label={"label"} state={"success"} />
                <Button type={"critical"} size={"small"} icon={false} label={"Button label"} />
            </Container>
            <DaySelector label={'M'} state={'default'} />
            <DaySelector label={'L'} state={'selected'} />
            <Link label={'Default link'} state={'default'} />
            <Link label={'Critical link'} state={'critical'} />
            <TextArea label={"Label text"} description={"Description text"} placeholder={"placeholder pedorro"} />
            <Spinner size={'small'} />
            <Spinner size={'medium'} />
            <Spinner size={'large'} />
            <IconButton type={'primary'} />
            <IconButton type={'secondary'} />
            <IconButton type={'critical'} />
            <EmptyPhoto />
            <CategoryIcon category={'vegan'} />
            <CategoryIcon category={'vegetarian'} />
            <CategoryIcon category={'alergen'} />
            <CategoryIcon category={'gluten'} />
            <Tabs items={[
                { label: 'Tabone', onClick: null, selected: 'true' },
                { label: 'TabTwo', onClick: null }
            ]} />
            <Tabbar home={true} />
            <Avatar size={'small'} image={'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80'} />
            <Avatar size={'medium'} image={'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80'} />
            <Avatar size={'large'} image={'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80'} />
            <MealCard image={'https://saladswithanastasia.com/wp-content/uploads/2021/12/radish-green-salad-land1.jpg'} title={'Stewed beaf and baked pork'} description={'Lorem ipsum dolor sit amet. Sed tempore maxime eum tempora blanditiis et adipisci explicabo a corrupti corporis et sunt dicta aut velit mollitia!'} user={{ name: '@lauraGil', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80' }} categories={['vegan', 'vegetarian', 'alergen', 'gluten']} />
            <Topbar level={'second'} secondLevelLabel={'Profile'} />
            <Logo />
        </div>}
    </>
}