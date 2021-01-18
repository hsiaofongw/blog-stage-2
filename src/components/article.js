import React from "react"

export default function Article(props) {
    return (
        <a href={props.href}>
            <div class="card">
                <h3 class="article-title">{props.articleName}</h3>
                <div class="date">{"写于 "+props.date}</div>
            </div>
        </a>
    );
}