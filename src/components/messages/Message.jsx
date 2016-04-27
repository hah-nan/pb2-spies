// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Message extends Component {

    formatTime(timestamp) {
        var dt = new Date(timestamp);

        var hours = dt.getHours();
        var minutes = dt.getMinutes();
        var seconds = dt.getSeconds();

        return dt.toLocaleTimeString();
    }


    render() {

        const {message} = this.props;
        var formattedTime = this.formatTime(message.timeStamp);

        return (
            <div className="message">
                <br />
                <strong>{message.user}</strong>
                <br />
                {formattedTime} - {message.text}
            </div>
        )

    }

};

export default Message;
