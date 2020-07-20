import React, { Component } from 'react'

export default class Aaa extends Component {
    render() {
        return (
            <div>
                {this.props.id}
                {this.props.keys}
            </div>
        )
    }
}