import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Menu from "../components/menu";
import CardOfFriend from "../components/card-of-friend";
import CardData from "../../content/cards.json";
import CardSummary from "../components/card-summary";
import "../components/layout.css";

class RuleSwitch extends React.Component {


    onClick(e) {
        this.props.ruleUpdate();
    }

    render() {

        const ruleswitchon = <div className="ruleswitchon"></div>;
        const ruleswitchoff = <div className="ruleswitchoff"></div>;

        let k1 = undefined;
        if (this.props.k[0] === "0") {
            k1 = ruleswitchoff;
        }
        else {
            k1 = ruleswitchon;
        }

        let k2 = undefined;
        if (this.props.k[1] === "0") {
            k2 = ruleswitchoff;
        }
        else {
            k2 = ruleswitchon;
        }

        let k3 = undefined;
        if (this.props.k[2] === "0") {
            k3 = ruleswitchoff;
        }
        else {
            k3 = ruleswitchon;
        }

        let sw = undefined;
        if (this.props.v === 0) {
            sw = ruleswitchoff;
        }
        else {
            sw = ruleswitchon;
        }


        return <div onClick={e => this.onClick(e)} className="ruleswitch">
            {k1}{k2}{k3}<div></div>{sw}<div></div>
        </div>;
    }
}

class CAConfigures extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "rule": {
                "111": 0,
                "110": 0,
                "101": 0,
                "100": 0,
                "011": 0,
                "010": 0,
                "001": 0,
                "000": 0
            },
            "keydowns": {
                "0": false,
                "1": false,
                "2": false,
                "3": false,
                "4": false,
                "5": false,
                "6": false,
                "7": false
            }
        };
    }

    ruleUpdate(k) {
        let rule = this.state.rule;
        const v = rule[k];
        rule[k] = (v+1) % 2;
        this.setState({"rule": rule});
    }

    onKeyDown(e) {
        const key = e.key;
        if (!this.state.keydowns[key]) {
            let keydowns = this.state.keydowns;
            keydowns[key] = true;
            this.setState({
                "keydowns": keydowns
            });
        }
    }

    onKeyUp(e) {
        const key = e.key;
        let keydowns = this.state.keydowns;
        keydowns[key] = false;

        const ruleEntry = this.keyToRuleEntry(key);

        this.setState(
            {
                "keydowns": keydowns
            },
            () => this.ruleUpdate(ruleEntry)
        );
    }

    keyToRuleEntry(k) {
        let d = {
            "0": "000",
            "1": "001",
            "2": "010",
            "3": "011",
            "4": "100",
            "5": "101",
            "6": "110",
            "7": "111"
        }

        return d[k];
    }

    render() {
        let switches = [];

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                for (let l = 0; l < 2; l++) {
                    const k = `${i}${j}${l}`;
                    const v = this.state.rule[k];
                    switches.unshift(
                        <RuleSwitch key={k} k={k} v={v} ruleUpdate={() => this.ruleUpdate(k)} />
                    )
                }
            }
        }

        let keys = ["7", "6", "5", "4", "3", "2", "1", "0"];
        let keyElements = [];
        for (const k of keys) {
            let keydown = this.state.keydowns[k];
            if (keydown) {
                keyElements.push(
                    <div key={k} className="caconfigurekeyboarddown" >{k}</div>
                )
            }
            else {
                keyElements.push(
                    <div key={k} className="caconfigurekeyboardup" >{k}</div>
                )
            }
        }

        return <div className="caconfigure" tabIndex={-1} onKeyDown={e => this.onKeyDown(e)} onKeyUp={e => this.onKeyUp(e)} >
            {switches}
            {keyElements}
        </div>;
    }

}

class CAScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "nWidth": 96,
            "nHeight": 64,
            "data": []
        }
    }

    componentDidMount() {
        let data = [];

        for (let i = 0; i < this.state.nHeight; i++) {
            for (let j = 0; j < this.state.nWidth; j++) {
                data.push(1);
            }
        }

        this.setState({"data": data});
    }
    
    render() {

        let elements = [];
        for (let i = 0; i < this.state.nHeight; i++) {
            for (let j = 0; j < this.state.nWidth; j++) {
                let idx = i * this.state.nWidth + j;
                let value = this.state.data[idx];
                if (value === 0) {
                    elements.push(<div key={idx} className="cellular-white"></div>);
                }
                else {
                    elements.push(<div key={idx} className="cellular-black"></div>);
                }
            }
        }

        return <div className="ca">{elements}</div>;
    }
}

class CA extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <Layout>
            <SEO title="自动机" />
            <Menu/>
            <CAScreen />
            <CAConfigures />
        </Layout>;
    }

}

export default CA;
