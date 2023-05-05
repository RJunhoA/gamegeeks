import FeedCard from "./FeedCard"


function FeedContainer({posts, handlePostPatch, handlePostLikesDelete}) {
    if (!Array.isArray(posts)) {
        return <div>Loading...</div>
    }

    return(
        <div>
            {posts?.map(p => {
            const users = p?.users?.map(u => {
                return `${u.username}, `
            })
            return(
                <FeedCard
                    key={p?.id}
                    id={p?.id}
                    content={p?.content}
                    owner={p?.users?.[0]?.username}
                    image={p?.users?.[0]?.image}
                    users={users}
                    likes={p?.likes}
                    handlePostPatch={handlePostPatch}
                    handlePostLikesDelete={handlePostLikesDelete}
                />
            )
            })}
        </div>
    )
}

export default FeedContainer