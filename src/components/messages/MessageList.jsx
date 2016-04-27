// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Subcomponents
import Message from './Message.jsx';


class MessageList extends Component {

    render() {
        return (
            <div className="well">
                <h3>
                    <strong>Messages</strong>
                </h3>
                <hr />
                {
                    this.props.messages.map((message, i) => {
                        return <Message message={message} key={i} />
                    })
                }
            </div>
        )
    }

};

export default MessageList;
