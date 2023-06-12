import './ProfileTabs.css'


export default function ProfileTabs({ onPostsTabClick, onSavedTabClick, state }){

    function handleTabPosts(){
        onPostsTabClick()
    }

    function handleTabSaved(){
        onSavedTabClick()
    }

    return <div className="list-none min-w-full flex items-center mb-[16px] box-border pb-[4px] justify-evenly">
    <div className="text-center body-text py-[8px] px-[32px] rounded-xl pointer flex flex-col relative items-center overflow-hidden hover:bg-[--violet-100]" onClick={handleTabPosts}>Posts{state === 'profilePosts' && <div className="w-[8px] h-[8px] rounded-[50px] bg-[--solid-blue] absolute bottom-[-4px]"/>}</div>
    <div className="text-center body-text py-[8px] px-[32px] rounded-xl pointer flex flex-col relative items-center overflow-hidden hover:bg-[--violet-100]" onClick={handleTabSaved}>Saved{state === 'profileSaved' && <div className="w-[8px] h-[8px] rounded-[50px] bg-[--solid-blue] absolute bottom-[-4px]"/>}</div>
    <div className="text-center body-text py-[8px] px-[32px] rounded-xl pointer flex flex-col relative items-center overflow-hidden hover:bg-[--violet-100]">Liked</div>
</div>
}
