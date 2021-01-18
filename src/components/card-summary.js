import React from "react"

export default function CardSummary(props) {
    return (
        <a href={props.href}>
            <div class="card-summary">
                <h3 class="article-title">{props.articleName}</h3>
                <div class="card-description">{props.description}</div>
                <div class="date">{props.date}</div>
            </div>
        </a>
    );
}