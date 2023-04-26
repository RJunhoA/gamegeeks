import FeedCard from "./FeedCard"


function FeedContainer({posts}) {
    const post = posts.map(p => {
        return(
            <FeedCard
                key={p.id}
                content={p.content}
                owner={p.users[0].username}
                image={p.users[0].image}
                likes={p.likes} 
                
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