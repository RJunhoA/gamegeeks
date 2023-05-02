

function ProfileLike({content, date, id}) {

    return(
        <div id={id}>
            <p>{content}</p>
            <h6>{date}</h6>
        </div>
    )

}

export default ProfileLike