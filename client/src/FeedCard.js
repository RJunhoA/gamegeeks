function FeedCard({key, content, owner, image, likes}) {

    return(
        <div key={key}>
            <img src={image} alt="profile pic" />
            <h2>{owner}</h2>
            <p>{content}</p>
            <div>{likes}</div>
        </div>
    )
}

export default FeedCard