import PropTypes from 'prop-types'
import React from 'react'
import './layout.css'

const Layout = ({children}) => (
    <div
        style={{
            margin: `30px auto`,
            maxWidth: 960,
            padding: `px 1.0875rem 1.45rem`,
            paddingTop: 0,
            border: 'black solid 1px',
            minHeight: '600px',
            position: 'relative'
        }}
    >
        {children}
        <footer style={{position: 'absolute', bottom: 0, right: 0}}>
            made with ❤️ by pshu
        </footer>
    </div>

)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
