import React from "react"

export default function CardOfFriend(props) {
    return (
        <div className="card-of-friend">
            <a href={props.link}>
            <img alt="img" className="favicon-of-friend" src={props.favicon} />
            </a>
        </div>
    );
}