import React from "react"

export default function CardOfFriend(props) {
    return (
        <div class="card-of-friend">
            <a href={props.link}>
            <img class="favicon-of-friend" src={props.favicon} />
            </a>
        </div>
    );
}