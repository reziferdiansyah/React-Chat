import React, { Component } from 'react';
import ChatForm from '../containers/ChatForm';
import ChatList from '../containers/ChatList';
import { loadChat } from '../actions/message'
import { connect } from 'react-redux';
import "../App.css"
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

class ChatBox extends Component {


    componentDidMount() {
        this.props.loadChat();
        socket.on('loadChat', () => {
            this.props.loadChat();
        });
    }

    constructor(props) {
        super(props);
    }

    render() {
        // console.log('datt', this.props.message)
        return (
            <div className="container"><br/>
                <div className="alert" role="alert"><br/>
                    <h1 className="text-center">React Chat</h1>
                </div>
                <ul className="timeline">
                    <ChatList message={this.props.message} />
                    <ChatForm />
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    message: state.messages
})

const mapDispatchToProps = (dispatch) => ({
    loadChat: () => dispatch(loadChat())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatBox)