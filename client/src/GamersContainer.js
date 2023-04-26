import GamerCard from "./GamerCard"

function GamersContainer({gamers}) {
    const gamer = gamers.map(g => {
        return(
            <GamerCard 
                key={g.id}
                username={g.username}
                image={g.image}
                created={g.created_at}
            />
        )
    })

    return(
        <div>
            {gamer}
        </div>
    )
}

export default GamersContainer