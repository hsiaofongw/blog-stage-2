import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Menu from "../components/menu";
import Article from "../components/article";

import AboutData from "../../content/abouts.json";

class AboutPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let elements = AboutData.map((data, index) => {
            return <Article key={data.file} articleName={data.name} date={data.date} href={data.file} />;
        });

        return <Layout>
            <div className="slogan">localhost:3000，我只取一瓢饮．</div>
            <SEO title="关于" />
            <Menu />
            <div>{elements}</div>
        </Layout>;
    }
}


export default AboutPage;
