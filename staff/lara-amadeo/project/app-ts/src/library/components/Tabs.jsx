import './Tabs.css'


export default function Tabs({ items }) {


    return <div className="profile-tabs-container">
        {items.map(item => <div className="profile-tab-elem" onClick={item.onClick}>{item.label}{item.selected === 'true' && <div className="profile-tab-elem-selected" />}</div>)}
    </div>
}