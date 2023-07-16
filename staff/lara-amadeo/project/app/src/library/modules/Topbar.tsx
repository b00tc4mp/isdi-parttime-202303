import IconButton from '../components/IconButton'
import { Bars3Icon, ChatBubbleLeftRightIcon, ArrowLeftIcon, XMarkIcon } from '../icons'
import './Topbar.css'

type Props = {
    level: string,
    secondLevel?: { label?: string, close?: boolean, back?: boolean, onCloseClick?: () => void, onBackClick?: () => void },
    firstLevel?: { menu?: boolean, chat?: boolean, onMenuClick?: () => void, onChatClick?: () => void },
    className?: string
}

export default function Topbar({ level, secondLevel, firstLevel, className }: Props): JSX.Element {

    return <>
        <div className={`topbar-container ${className}`}>
            {level === 'first' && <>
                <IconButton icon={<Bars3Icon className='icon-xs grey-700' />} type={'secondary'} onClick={firstLevel?.onMenuClick} />
                <IconButton icon={<ChatBubbleLeftRightIcon className='icon-xs grey-700' />} type={'secondary'} onClick={firstLevel?.onChatClick} />
            </>}
            {level === 'second' && <>
                {secondLevel?.back && <IconButton icon={<ArrowLeftIcon className='icon-xs grey-700' />} type={'secondary'} onClick={secondLevel.onBackClick} />}

                <div className={`${secondLevel?.back && !secondLevel.close ? 'topbar-label-icon-left' : ''} ${!secondLevel?.back && secondLevel?.close ? 'topbar-label-icon-right' : ''} ${!secondLevel?.back && !secondLevel?.close ? 'topbar-label' : ''}`}><p className='small-text-bold grey-700'>{secondLevel?.label}</p>
                </div>
                {secondLevel?.close && <IconButton icon={<XMarkIcon className='icon-xs grey-700' />} type={'secondary'} onClick={secondLevel.onCloseClick} />}
            </>}
        </div>

    </>
}