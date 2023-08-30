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



    // loaderOn()

    return <>
        <div className='container'>
            <span className="icon-img-place"></span>
            <Button category={"critical"} size={"small"} icon={false} label={"Button label"} onClick={() => location.reload()} />
            <Chip label={"label"} state={"success"} />
            <Header text={'Profile details'} />
            <DataItem label={"Label"} description={"Lorem ipsum dolor"} />
            <Container width={'382px'} height={'100px'} type={'border'}>
                <Button category={"critical"} size={"small"} icon={false} label={"Button label"} />
            </Container>


            <Link label={'Default link'} state={'default'} />
            <Link label={'Critical link'} state={'critical'} />
            <Spinner size={'small'} />
            <Spinner size={'medium'} />
            <Spinner size={'large'} />


            <CategoryIcon category={'vegan'} />
            <CategoryIcon category={'vegetarian'} />
            <CategoryIcon category={'alergen'} />
            <CategoryIcon category={'gluten'} />

            <Tabbar home={true} />


            <Logo />
        </div>
    </>
}