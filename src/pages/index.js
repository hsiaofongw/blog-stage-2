import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/menu"
import Article from "../components/article"

const IndexPage = () => (
  <Layout>
    <SEO title="首页" />
    <Menu>
    <Link to="/">文章</Link> 
    <Link to="/search/">检索</Link> 
    <Link to="/friends/">友链</Link> 
    <Link to="/about/">关于</Link>
    </Menu>
    <div>
    <Article articleName="并行化计算尝试" date="2021-01-17" />
    <Article articleName="用CUDA在GPU上实现遗传算法" date="2021-01-18" />
    <Article articleName="基于LSA的文本索引技术初探" date="2021-01-16" />
    <Article articleName="SVD方法应用与矩阵近似" date="2021-01-15" />
    </div>
  </Layout>
)

export default IndexPage
