import React from "react"

import { Link } from "gatsby"

export default function Menu() {
    return (
        <div className="menu">
        <Link to="/">文章</Link> 
        <Link to="/search/">检索</Link> 
        <Link to="/friends/">友链</Link> 
        <Link target="_blank" to="https://travellings.now.sh">开往</Link> 
        <Link to="/ca/">自动机</Link> 
        <Link to="/about/">关于</Link>
        </div>
    );
}