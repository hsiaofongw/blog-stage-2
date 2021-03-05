import React from "react";

class CardOfFriend extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div 
                onMouseLeave={e => this.props.onMouseLeave()} 
                onMouseOver={e => this.props.onMouseOver()} 
                className="card-of-friend"
            >
                <a href={this.props.link}>
                <img alt="img" className="favicon-of-friend" src={this.props.favicon} />
                </a>
            </div>
        );
    }

}

export default CardOfFriend;