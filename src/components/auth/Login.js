import React,{ Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email : '',
            password : '',
            errors: {}
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const loginUser = {
            email : this.state.email,
            password : this.state.password
        };
        axios.post('http://localhost:3000/api/users/login', loginUser)
            .then(data => console.log(data))
            .catch(err => console.log(err.response.data.message));
    }

    render() {
        return (
            <div>
                <div className="col-md-6 offset-md-3">
                    <h3>Login</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className={classnames('form-group', {'has-danger' : this.state.errors.name })}>
                            <input type="email" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                                className="form-control"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="password1" placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;