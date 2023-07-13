import IconButton from '../components/IconButton'
import { Bars3Icon, ChatBubbleLeftRightIcon, ArrowLeftIcon, XMarkIcon } from '../icons'
import './Topbar.css'

export default function Topbar({ level, secondLevelLabel, back, close }) {

    return <>
        <div className='topbar-container'>
            {level === 'first' && <>
                <IconButton icon={<Bars3Icon className='icon-xs grey-700' />} type={'secondary'} />
                <IconButton icon={<ChatBubbleLeftRightIcon className='icon-xs grey-700' />} type={'secondary'} />
            </>}
            {level === 'second' && <>
                {back && <IconButton icon={<ArrowLeftIcon className='icon-xs grey-700' />} type={'secondary'} />}
                <div className={`${back && !close ? 'topbar-label-icon-left' : ''} ${!back && close ? 'topbar-label-icon-right' : ''} ${!back && !close ? 'topbar-label' : ''}`}><p className='small-text-bold grey-700'>{secondLevelLabel}</p></div>
                {close && <IconButton icon={<XMarkIcon className='icon-xs grey-700' />} type={'secondary'} />}
            </>}
        </div>

    </>
}