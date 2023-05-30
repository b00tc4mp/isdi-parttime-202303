

export default function Comment(props) {
  const { commentAuthor,  commentText } = props.comment

  return <div className="comment">
    {commentAuthor}: {commentText}
  </div>
}