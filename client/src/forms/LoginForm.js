import React from 'react'
import Form from './Form'

class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        return this.props.handler({
            // username: this.email.value,
            // password: this.password.value,
            username:"user",
            password:"password",
        })
    }

// input 属性,必填字段   required

    render() {
        return <div className="login-container">
            <Form onSubmit={this.handleSubmit} title="Sign In" button="Login">
                <input type="text"  placeholder="Name" ref={input => this.email = input} />
                <input type="password"  placeholder="Password" ref={input => this.password = input} />
            </Form>
        </div>
    }

}

export default LoginForm
