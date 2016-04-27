// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class UserForm extends Component {

    onSubmit(e) {
        e.preventDefault();

        var name = this.refs.name.value.trim();

        this.props.setUser({
            name: name
        });
        this.props.emit('userJoined', {name: name});

        // Clear
        this.refs.name.value = '';
    }

    render() {
        return (
            <div>
                <h3>
                    <strong>Chat Login</strong>
                </h3>
                <hr />
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input className="form-control" type="text" ref="name"
                           placeholder="Choose a username" />
                </form>
            </div>
        )
    }

};

export default UserForm;
