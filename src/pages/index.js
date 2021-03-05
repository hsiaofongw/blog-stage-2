import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/menu"
import Article from "../components/article"

import ArticleData from "../../content/articles.json"

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        console.log("Homepage initializing...");

    }

    render() {
        let articleElements = ArticleData.map(
            (data, index) => {
                return <Article key={data.file} articleName={data.name} date={data.date} href={data.file} />;
            }
        );

        return <Layout>
            <SEO title="首页" />
            <div className="slogan">localhost:3000，我只取一瓢饮．</div>
            <Menu />
            <div>{articleElements}</div>
        </Layout>;
    }

}

export default HomePage;
