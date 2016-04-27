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

        // don't display username and linebreaks
        //  if last message was sent by the same user
        if (message.isSameUser) {
            var userInfo = null;
        } else {
            var userInfo = (
                <div>
                    <br />
                    <strong>{message.user}</strong>
                    <br />
                </div>
            )
        }

        return (
            <div className="message">
                {userInfo}
                {formattedTime} - {message.text}
            </div>
        )

    }

};

export default Message;
