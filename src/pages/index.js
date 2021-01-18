import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/menu"
import Article from "../components/article"

import ArticleData from "../../content/articles.json"

const IndexPage = () => (
    <Layout>
        <SEO title="首页" />
        <Menu />
        <div>
            {
                ArticleData.map(
                    (data, index) => {
                        return (<Article articleName={data.name} date={data.date} href={data.file} />);
                    }
                )
            }
        </div>
    </Layout>
)

export default IndexPage
