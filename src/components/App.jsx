// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Modules
import io from 'socket.io-client';

// Subcomponents
import MessageList from './messages/MessageList.jsx';
import MessageForm from './messages/MessageForm.jsx';
import UserList from './users/UserList.jsx';
import UserForm from './users/UserForm.jsx';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect.bind(this));
    }

    connect() {
        this.setState({
            status: 'connected'
        });
        console.log('Connected: ' + this.socket.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <UserList />
                </div>
                <div className="col-md-8">
                    <MessageList />
                    <MessageForm />
                </div>
            </div>
        )
    }

};

export default App;
