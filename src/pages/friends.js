import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Menu from "../components/menu";
import CardOfFriend from "../components/card-of-friend";
import CardData from "../../content/cards.json";
import CardSummary from "../components/card-summary";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

class Friends extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "cards": [],
            "timer": undefined,
            "hoverOn": undefined,
            "keyToCards": {}
        };
    }

    componentDidMount() {
        let keyToCards = {};
        for (const record of CardData) {
            keyToCards[record.link] = record;
        }

        this.setState(
            {
                "cards": CardData,
                "keyToCards": keyToCards
            },
            () => this.startTicking()
        );
    }

    startTicking() {
        this.redistribute();

        if (!this.state.timer) {
            const period = 30000;
            const timer = setInterval(() => this.tick(), period);
            this.setState({
                "timer": timer
            });
        }
    }

    tick() {
        console.log("tick");
        console.log(new Date());
        this.redistribute();
    }

    redistribute() {
        let cards = this.state.cards;
        let indices = [];
        for (const i in cards) {
            indices.push(i);
        }
        for (const i in cards) {
            indices.push(i);
        }
        for (const i in cards) {
            indices.push(i);
        }
        for (const i in cards) {
            indices.push(i);
        }
        for (const i in cards) {
            indices.push(i);
        }
        for (const i in cards) {
            indices.push(i);
        }


        let r = this;

        function start(idxes) {
            console.log("start");
            if (idxes.length === 0) {
                return;
            }

            const i = idxes.shift();
            const choose = getRandomIntInclusive(i, cards.length-1);

            const temp = cards[i];
            cards[i] = cards[choose];
            cards[choose] = temp;
            r.setState(
                {"cards": cards}, 
                () => {setTimeout(() => start(idxes), 5)}
            );
        }

        start(indices);

        // if (cards.length >= 2) {
        //     for (const i in cards) {
        //         let choose = getRandomIntInclusive(i, cards.length-1);

        //         const temp = cards[i];
        //         cards[i] = cards[choose];
        //         cards[choose] = temp;
        //         this.setState({"cards": cards});
        //     }
        // }
    }

    onMouseOver(link) {
        this.setState({
            "hoverOn": link
        });
    }

    onMouseLeave(link) {
        this.setState({
            "hoverOn": undefined
        });
    }

    render() {

        let avatars = this.state.cards.map((data, index) => {
            return <CardOfFriend 
                onMouseOver={() => this.onMouseOver(data.link)} 
                onMouseLeave={() => this.onMouseLeave(data.link)}
                key={data.link} 
                link={data.link} 
                favicon={data.avatar} 
                alt="图片" 
            />;
        });

        let records = this.state.cards.map((data, index) => {
            return <CardSummary 
                key={data.link}
                articleName={data.title} 
                date={data.addDate+" 加入"} 
                description={data.description}
                href={data.link}
            />;
        });

        let hoverOn = undefined;
        if (this.state.hoverOn) {
            let d = this.state.keyToCards[this.state.hoverOn];
            hoverOn = <CardSummary
                key={d.link+"selected"}
                articleName={d.title+" (当前选中)"}
                date={d.addDate+" 加入"}
                description={d.description}
                href={d.link}
            />;
            records.unshift(hoverOn);
        }

        return <Layout>
            <SEO title="友链" />
            <Menu/>
            <div id="container-of-cards">{avatars}</div>
            <div id="details-of-cards">{records}</div>
        </Layout>;
    }

}

export default Friends;
