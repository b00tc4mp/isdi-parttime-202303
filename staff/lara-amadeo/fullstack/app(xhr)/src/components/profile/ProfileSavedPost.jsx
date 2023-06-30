export default function ProfileSavedPost({ post }){
    return <div className="flex h-0 relative w-[calc(33.33%-6px)] pb-[calc(33.33%-6px)]">
    <img src={post.image} className="w-full h-full object-cover absolute"/>
    </div>
}