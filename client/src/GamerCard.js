

function GamerCard({id, username, image, created}) {

    return(
        <div id={id}>
            <img src={image} alt="profile pic" />
            <h2>{username}</h2>
            <p>{created}</p>
        </div>
    )
}

export default GamerCard