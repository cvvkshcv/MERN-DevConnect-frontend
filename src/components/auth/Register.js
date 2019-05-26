import React,{ Component } from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import Proptype from 'prop-types';

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

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.errors) {
            this.setState({ errors : nextProps.errors.validation });
        }
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
        this.props.registerUser(newUser, this.props.history);
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
                                className={ classnames('form-control', { 'is-invalid' : errors && errors.name }) }
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                            { errors && errors.name && (<div className="invalid-feedback">{ errors && errors.name }</div>)}
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                                className={ classnames('form-control', { 'is-invalid' : errors && errors.email }) }
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            { errors && errors.email && (<div className="invalid-feedback">{ errors && errors.email }</div>)}
                            { errors && errors.message && (<div className="invalid-feedback">{ errors && errors.message }</div>)}
                        </div>
                        <div className="form-group">
                            <input type="password" id="password1" placeholder="Password"
                                className={ classnames('form-control', { 'is-invalid' : errors && errors.password1 }) }
                                name="password1"
                                value={this.state.password1}
                                onChange={this.onChange}
                            />
                            { errors && errors.password1 && (<div className="invalid-feedback">{ errors && errors.password1 }</div>)}
                        </div>
                        <div className="form-group">
                            <input type="password" id="password2" placeholder="Confirmed Password"
                                className={ classnames('form-control', { 'is-invalid' : errors && errors.password2 }) }
                                name="password2"
                                value={this.state.password2}
                                onChange={this.onChange}
                            />
                            { errors && errors.password2 && (<div className="invalid-feedback">{ errors && errors.password2 }</div>)}
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        { errors && errors.message && (<div className="invalid-feedback">{ errors && errors.message }</div>) }
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
 registerUser: Proptype.func.isRequired,
 auth: Proptype.object.isRequired,
 errors: Proptype.object.isRequired
};

const mapStateToPros = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToPros, { registerUser })(Register);