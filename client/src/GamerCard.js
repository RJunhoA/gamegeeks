

function GamerCard({key, username, image, created}) {

    return(
        <div key={key}>
            <img src={image} alt="profile pic" />
            <h2>{username}</h2>
            <p>{created}</p>
        </div>
    )
}

export default GamerCard