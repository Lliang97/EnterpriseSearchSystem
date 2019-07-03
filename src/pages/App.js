import React from 'react';
import PropTypes from 'prop-types'

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
    getChildContext() {
        return {
            location: this.props.location,
            route: this.props.route
        }
    }
    render() {
        return (<div>{this.props.children}</div>);
    }
}