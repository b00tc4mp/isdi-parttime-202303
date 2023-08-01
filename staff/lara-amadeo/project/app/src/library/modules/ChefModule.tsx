import Avatar from '../components/Avatar'
import Container from '../components/Container'
import { HeartIcon, SolidHeartIcon } from '../icons'
import './ChefModule.css'

type Props = {
    avatar: string,
    name: string,
    description: string,
    liked: boolean
}

export default function ChefModule({ avatar, name, description, liked }: Props): JSX.Element {
    return <>
        <Container width={'100%'} height={'fit-content'} type={'border'}>
            <div className='chef-module-container'>
                <Avatar image={avatar} width={'40px'} />
                <div className='chef-module-info'>
                    <p className="body-text-bold grey-700 chef-module-name">{name}</p>
                    <p className="tiny-text grey-300 chef-module-description">{description}</p>
                </div>
                {liked ? <SolidHeartIcon className='icon-s red-200' /> : <HeartIcon className='icon-s grey-700' />}
            </div>
        </Container>
    </>
}