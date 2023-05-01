import FeedCard from "./FeedCard"


function FeedContainer({posts, refreshPosts}) {
    const post = posts.map(p => {
        return(
            <FeedCard
                key={p?.id}
                id={p?.id}
                content={p?.content}
                owner={p?.users[0].username}
                image={p?.users[0].image}
                likes={p?.likes}
                refreshPosts={refreshPosts}
                
            />
        )
    })

    return(
        <div>
            {post}
        </div>
    )
}

export default FeedContainer