import React from "react"

export default function CardSummary(props) {
    return (
        <a href={props.href}>
            <div className="card-summary">
                <h3 className="article-title">{props.articleName}</h3>
                <div className="card-description">{props.description}</div>
                <div className="date">{props.date}</div>
            </div>
        </a>
    );
}