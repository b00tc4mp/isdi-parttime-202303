import './ProfilePost.css'

export default function ProfilePost({ post }){
    return <div className="flex h-0 relative w-[calc(33.33%-6px)] pb-[calc(33.33%-6px)]">
    <img src={post.image} className="w-full h-full object-cover absolute"/>
    <span className="material-symbols-rounded icon-s absolute top-[8px] right-[8px] text-[--white] ">{post.visibility === 'private' ? 'lock' : ''}</span>
    </div>
}