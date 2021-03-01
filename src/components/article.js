import React from "react"

export default function Article(props) {
    return (
        <a href={props.href}>
            <div className="card">
                <h3 className="article-title">{props.articleName}</h3>
                <div className="date">{"写于 "+props.date}</div>
            </div>
        </a>
    );
}