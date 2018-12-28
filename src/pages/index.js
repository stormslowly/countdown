import * as PropTypes from "prop-types";
import React, {Component, useEffect, useState} from 'react'
import * as request from 'superagent'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Layout from '../components/layout'

const Y2019 = new Date('2019-01-01 00:00:00').getTime()

class CountDownTimer extends Component {

    interval = null

    state = {
        seconds: 99999
    }

    updateCountdown = () => {
        const now = Date.now()
        const s = Math.round((Y2019 - now) / 1000)

        this.setState({seconds: s > 0 ? s : 0})
    }

    componentWillMount() {
        this.interval = setInterval(() => {
            this.updateCountdown()
        }, 1000)

        this.updateCountdown()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let {children} = this.props;
        return children({seconds: this.state.seconds})
    }
}

CountDownTimer.propTypes = {children: PropTypes.func}

const figletLoading = "  _                 _ _                 \n | | ___   __ _  __| (_)_ __   __ _     \n | |/ _ \\ / _` |/ _` | | '_ \\ / _` |    \n | | (_) | (_| | (_| | | | | | (_| |_ _ \n |_|\\___/ \\__,_|\\__,_|_|_| |_|\\__, (_|_)\n                              |___/     "


const FigLetService = ({text, font, children}) => {

    const [figlet, setFiglet] = useState(figletLoading)


    useEffect(() => {
        request.get('https://figlet.shupengfei.me')
            .query({text, font})
            .then(({body}) => {
                setFiglet(body.figlet)
            })
    }, [text, font])


    return children({figlet})
}


const GridFiglet = ({figlet}) => {

    return <pre>{figlet}</pre>

}

const IndexPage = () => (
    <Layout>

        <CountDownTimer>{
            ({seconds}) => {
                return <React.Fragment>

                    <FigLetService text={seconds}>{({figlet}) => {
                        return <GridFiglet figlet={figlet}/>
                    }}</FigLetService>

                    {seconds === 0 ? <FigLetService text={'happy  new  year'}>
                        {({figlet}) => <GridFiglet figlet={figlet}></GridFiglet>}
                    </FigLetService> : <FigLetService text={'to 2019'}>
                        {({figlet}) => <GridFiglet figlet={figlet}></GridFiglet>}
                    </FigLetService>}
                </React.Fragment>
            }
        }</CountDownTimer>
    </Layout>
)

export default IndexPage
