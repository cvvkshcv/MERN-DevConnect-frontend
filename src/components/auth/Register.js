import React,{ Component } from 'react';
// import axios from 'axios';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name : '',
            email : '',
            password1 : '',
            password2 : '',
            localErrors : {},
            errors: {}
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name : this.state.name,
            email : this.state.email,
            password1 : this.state.password1,
            password2 : this.state.password2
        };
        console.log(newUser);
        this.props.registerUser(newUser);
        
        /*
        axios.post('http://localhost:3000/api/users/register', newUser)
            .then(res => {
                this.setState({ errors : res.response.data });
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.data.validation) {
                        this.setState({ errors : err.response.data.validation });
                    }
                    else {
                        this.setState({ errors : err.response.data });
                    }
                } else {
                    console.error(err.response);
                }
            });
        */
        
    }

    nameValidation(val) {
        if (val.length < 3) {
            return <p> Minimun 3 characters required </p>;
        } else {
            return '';
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="col-md-6 offset-md-3">
                    <h3>Register</h3>
                    <form onSubmit={this.onSubmit} noValidate>
                        <div className="form-group">
                            <input type="text" id="name" placeholder="Enter name"
                                className={ classnames('form-control', { 'is-invalid' : errors.name }) }
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                            { errors.name && (<div className="invalid-feedback">{ errors.name }</div>)}
                            { this.nameValidation(this.state.name) }
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                                className={ classnames('form-control', { 'is-invalid' : errors.email }) }
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            { errors.email && (<div className="invalid-feedback">{ errors.email }</div>)}
                        </div>
                        <div className="form-group">
                            <input type="password" id="password1" placeholder="Password"
                                className={ classnames('form-control', { 'is-invalid' : errors.password1 }) }
                                name="password1"
                                value={this.state.password1}
                                onChange={this.onChange}
                            />
                            { errors.password1 && (<div className="invalid-feedback">{ errors.password1 }</div>)}
                        </div>
                        <div className="form-group">
                            <input type="password" id="password2" placeholder="Confirmed Password"
                                className={ classnames('form-control', { 'is-invalid' : errors.password2 }) }
                                name="password2"
                                value={this.state.password2}
                                onChange={this.onChange}
                            />
                            { errors.password2 && (<div className="invalid-feedback">{ errors.password2 }</div>)}
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        { errors.message && (<div className="invalid-feedback">{ errors.message }</div>) }
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(null, { registerUser })(Register);