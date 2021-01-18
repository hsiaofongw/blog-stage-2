import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/menu"
import CardOfFriend from "../components/card-of-friend"
import CardData from "../../content/cards.json"
import CardSummary from "../components/card-summary"

const IndexPage = () => (
    <Layout>
        <SEO title="友链" />
        <Menu/>
        <div id="container-of-cards">
            {
                CardData.map(
                    (data, index) => {
                        return (<CardOfFriend link={data.link} favicon={data.avatar} alt="图片" />);
                    }
                )
            }
        </div>
        <div id="details-of-cards">
        {
            CardData.map(
                (data, index) => {
                    return <CardSummary 
                        articleName={data.title} 
                        date={data.addDate+" 加入"} 
                        description={data.description}
                        href={data.link}
                    />
                }
            )
        }
        </div>
    </Layout>
)

export default IndexPage
