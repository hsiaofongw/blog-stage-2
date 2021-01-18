import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/menu"
import Article from "../components/article"

import AboutData from "../../content/abouts.json"

const AboutPage = () => (
  <Layout>
      <SEO title="关于" />
      <Menu />
      <div>
          {
              AboutData.map(
                  (data, index) => {
                      return (<Article articleName={data.name} date={data.date} href={data.file} />);
                  }
              )
          }
      </div>
  </Layout>
)

export default AboutPage
