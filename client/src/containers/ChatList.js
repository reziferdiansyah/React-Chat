import React, { Component } from 'react';
import ChatItem from './ChatItem';
import '../App.css'

export default class ChatList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: ""
        }
    }
    render() {
        console.log("check di chatlist:",this.props.message)
        const dataNode = this.props.message.map((item, index) =>
            <ChatItem
                key={index}
                _id={item._id}
                id={item.id}
                no={index + 1}
                date={item.created_date}
                sender={item.sender}
                message={item.message}
                sent={item.sent}
            />
        )
        return (
            <div>
                 {dataNode}
            </div>
        )
    }
}