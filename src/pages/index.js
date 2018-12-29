import figlet from 'figlet/lib/figlet'
import * as PropTypes from "prop-types";
import React, {Component, useEffect, useState} from 'react'

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

const LocalFigLetService = ({text, font = 'Standard', children}) => {
    const figletText = figlet.textSync(text, font)
    return children({figlet: figletText})
}

const FigLetService = LocalFigLetService


const GridFiglet = ({figlet}) => {
    return <pre>{figlet}</pre>
}

const PreloadFigletFont = ({children}) => {
    const [isLoading, setLoadingState] = useState(true)

    useEffect(() => {
            console.log('start')
            figlet.preloadFonts(["Standard"], () => {
                setLoadingState(false)
            });
        }, []
    )

    return isLoading ? <p>loading...</p> : children()
}

const IndexPage = () => (
    <PreloadFigletFont>
        {() => <Layout>
            <CountDownTimer>{
                ({seconds}) => {
                    return <React.Fragment>

                        <FigLetService text={seconds}>{({figlet}) => {
                            return <GridFiglet figlet={figlet}/>
                        }}</FigLetService>

                        {seconds === 0 ? <FigLetService text={'happy  new  year'}>
                            {({figlet}) => <GridFiglet figlet={figlet}></GridFiglet>}
                        </FigLetService> : <FigLetService text={'To 2019'}>
                            {({figlet}) => <GridFiglet figlet={figlet}></GridFiglet>}
                        </FigLetService>}
                    </React.Fragment>
                }
            }</CountDownTimer>
        </Layout>}
    </PreloadFigletFont>)

export default IndexPage
