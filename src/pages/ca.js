import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Menu from "../components/menu";
import "../components/layout.css";

class SingeSwitch extends React.Component {

    onClick(e) {
        e.stopPropagation();
        this.props.switchUpdate();
    }

    render() {

        const switchon = <div className="singleswitchon"></div>;
        const switchoff = <div className="singleswitchoff"></div>;

        let sw = undefined;
        if (this.props.v === 1) {
            sw = switchon;
        }
        else {
            sw = switchoff;
        }

        return <div onClick={e => this.onClick(e)} className="singleswitch">
            {sw}
        </div>;

    }

}

class RuleSwitch extends React.Component {


    onClick(e) {
        e.stopPropagation();
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

class KeyPressed extends React.Component {

    render() {
        return <div className="caconfigurekeyboarddown" >{this.props.keytext}</div>;
    }
    
}

class KeyReleased extends React.Component {

    render() {
        return <div className="caconfigurekeyboardup" >{this.props.keytext}</div>;
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
            },
            "isFocused": false
        };

        this.r = React.createRef();
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

    onClick(e) {
        e.preventDefault();

        if (this.state.isFocused) {
            this.r.current.blur();
            this.setState({
                "isFocused": false
            })
        }
        else {
            this.r.current.focus();
            this.setState({
                "isFocused": true
            })
        }
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
                    <KeyPressed key={k} keytext={k} />
                )
            }
            else {
                keyElements.push(
                    <KeyReleased key={k} keytext={k} />
                )
            }
        }

        if (!this.state.isFocused) {
            keyElements = undefined;
        }

        return <div ref={this.r} onClick={e => this.onClick(e)}  className="caconfigure" tabIndex={-1} onKeyDown={e => this.onKeyDown(e)} onKeyUp={e => this.onKeyUp(e)} >
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

class InitialStateConfigures extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "data": {},
            "isFocused": false,
            "firstKeyPressed": {
                "0": false,
                "1": false,
                "2": false,
                "3": false,
                "4": false,
                "5": false,
                "6": false,
                "7": false,
                "8": false,
                "9": false,
                "A": false,
                "B": false,
                "C": false,
                "D": false,
                "E": false,
                "F": false
            },
            "secondKeyPressed": {
                "0": false,
                "1": false,
                "2": false,
                "3": false,
                "4": false,
                "5": false,
                "6": false,
                "7": false,
                "8": false,
                "9": false,
                "A": false,
                "B": false,
                "C": false,
                "D": false,
                "E": false,
                "F": false
            },
            "currentKeyIndex": 0,
            "keyBuffer": ""
        };

        this.rows = [
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
            "A", "B", "C", "D", "E", "F"
        ];

        this.cols = [
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
            "A", "B", "C", "D", "E", "F"
        ];

        this.r = React.createRef();
    }

    componentDidMount() {
        const rows = this.rows;
        const cols = this.cols;
        const nRows = rows.length;
        const nCols = cols.length;

        let data = {};
        for (let i = 0; i < nRows; i++) {
            for (let j = 0; j < nCols; j++) {
                const k = `${rows[i]}${cols[j]}`;
                data[k] = 0;
            }
        }

        this.setState({"data": data});
    }

    onClick(e) {
        e.preventDefault();

        if (this.state.isFocused) {
            this.r.current.blur();
            this.setState({
                "isFocused": false
            })
        }
        else {
            this.r.current.focus();
            this.setState({
                "isFocused": true
            })
        }
    }

    onKeyDown(e) {
        let key = e.key;
        key = key.toUpperCase();

        if (!(key in this.state.firstKeyPressed)) {
            return;
        }

        let current = this.state.currentKeyIndex;
        if (current === 0) {
            let firstKeyPressed = this.state.firstKeyPressed;
            if (!firstKeyPressed[key]) {
                firstKeyPressed[key] = true;
                this.setState({
                    "firstKeyPressed": firstKeyPressed
                });
            }
        }
        else if (current === 1) {
            let secondKeyPressed = this.state.secondKeyPressed;
            if (!secondKeyPressed[key]) {
                secondKeyPressed[key] = true;
                this.setState({
                    "secondKeyPressed": secondKeyPressed
                });
            }
        }
    }

    onKeyUp(e) {
        let key = e.key;
        key = key.toUpperCase();

        if (!(key in this.state.firstKeyPressed)) {
            return;
        }

        let current = this.state.currentKeyIndex;
        if (current === 0) {
            current = (current + 1) % 2;
            let firstKeyPressed = this.state.firstKeyPressed;
            if (firstKeyPressed[key]) {
                firstKeyPressed[key] = false;
                this.setState({
                    "firstKeyPressed": firstKeyPressed,
                    "currentKeyIndex": current,
                    "keyBuffer": this.state.keyBuffer+key
                });
            }
        }
        else if (current === 1) {
            current = (current + 1) % 2;
            let secondKeyPressed = this.state.secondKeyPressed;
            if (secondKeyPressed[key]) {
                let keyBuffer = this.state.keyBuffer;
                keyBuffer = keyBuffer + key;

                secondKeyPressed[key] = false;
                this.setState({
                    "secondKeyPressed": secondKeyPressed,
                    "currentKeyIndex": current,
                    "keyBuffer": ""
                }, () => this.switchUpdate(keyBuffer));
            }
        }
    }

    switchUpdate(key) {
        let data = this.state.data;
        data[key] = (data[key] + 1) % 2;
        this.setState({
            "data": data
        });
    }

    render() {
        let elements = [];
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 17; j++) {
                if (i === 0 && j === 0) {
                    elements.push(
                        <div key="empty"></div>
                    );
                }
                else if (i !== 0 && j === 0) {
                    const ti = i-1;
                    const keyText = this.cols[ti];
                    const isPressed = this.state.firstKeyPressed[keyText];
                    let key = <div key={"first-"+keyText}></div>;
                    if (this.state.isFocused) {
                        if (isPressed) {
                            key = <KeyPressed key={"first-"+keyText} keytext={keyText} />;
                        }
                        else {
                            key = <KeyReleased key={"first-"+keyText} keytext={keyText} />;
                        }
                    }
                    elements.push(key);
                }
                else if (i === 0 && j !== 0) {
                    const tj = j-1;
                    const keyText = this.rows[tj];
                    const isPressed = this.state.secondKeyPressed[keyText];
                    let key = <div key={"second-"+keyText} ></div>;
                    if (this.state.isFocused) {
                        if (isPressed) {
                            key = <KeyPressed key={"second-"+keyText} keytext={keyText} />;
                        }
                        else {
                            key = <KeyReleased key={"second-"+keyText} keytext={keyText} />;
                        }
                    }
                    elements.push(key);
                }
                else {
                    const ti = i-1;
                    const tj = j-1;
                    const firstKey = this.rows[ti];
                    const secondKey = this.cols[tj];
                    const key = `${firstKey}${secondKey}`;
                    const v = this.state.data[key];
                    elements.push(
                        <SingeSwitch key={key} v={v} switchUpdate={e => this.switchUpdate(key)} />
                    );
                }
            }
        }

        return <div tabIndex={-1} ref={this.r} onKeyDown={e => this.onKeyDown(e)} onKeyUp={e => this.onKeyUp(e)} onClick={e => this.onClick(e)} className="initialstateconfigures" >
            {elements}
        </div>;
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
            <InitialStateConfigures />
        </Layout>;
    }

}

export default CA;
