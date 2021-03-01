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
    }

    render() {
        let avatars = CardData.map((data, index) => {
            return <CardOfFriend link={data.link} favicon={data.avatar} alt="图片" />;
        });

        let records = CardData.map((data, index) => {
            return <CardSummary 
                articleName={data.title} 
                date={data.addDate+" 加入"} 
                description={data.description}
                href={data.link}
            />;
        });

        if (records.length >= 2) {
            for (const i in records) {
                let choose = getRandomIntInclusive(i, records.length-1);

                let temp = records[i];
                records[i] = records[choose];
                records[choose] = temp;

                temp = avatars[i];
                avatars[i] = avatars[choose];
                avatars[choose] = temp;
            }
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
