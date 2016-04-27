// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class MessageForm extends Component {

    onSubmit(e) {
        e.preventDefault();

        // Create the `emit` function in the App component
        // and propagated here
        this.props.emit('messageAdded', {
            timestamp: Date.now(),
            text: this.refs.text.value.trim()
        });

        // Clear form
        this.refs.text.value = '';
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input className="form-control" type="text" ref="text"
                           placeholder="Please type a message"
                     />
                </form>
            </div>
        )
    }

};

export default MessageForm;
