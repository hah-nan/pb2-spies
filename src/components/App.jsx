// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

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
