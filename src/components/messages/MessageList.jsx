// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Subcomponents
import Message from './Message.jsx';


class MessageList extends Component {

    getMessages() {
        // initialize
        var currentUser = '',
            previousUser = '';

        return this.props.messages.map((message, i) => {
            currentUser = message.user;
            message.isSameUser = currentUser == previousUser;
            previousUser = currentUser;
            return <Message message={message} key={i} />
        })
    }

    render() {
        return (
            <div className="well">
                <h3>
                    <strong>Messages</strong>
                </h3>
                <hr />
                {this.getMessages()}
            </div>
        )
    }

};

export default MessageList;
