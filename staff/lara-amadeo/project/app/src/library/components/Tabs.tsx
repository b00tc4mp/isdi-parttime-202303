import './Tabs.css'

type TabItem = {
    label: string,
    selected: boolean,
    onClick: null | (() => void),
    disable?: boolean
}

type Props = {
    items: Array<TabItem>,
}

export default function Tabs({ items }: Props): JSX.Element {


    return <div className="profile-tabs-container">
        {items.map(item => <div className={`profile-tab-elem ${item.selected === true && 'profile-tab-label-selected'} ${item.disable && 'profile-tab-disabled'}`} onClick={item.onClick!}>{(item.label)}{item.selected === true && <div className="profile-tab-elem-selected" />}</div>)}
    </div>
}