import React, { Component } from 'react';
import { postChat } from '../actions/message'
import {connect} from 'react-redux'     
import '../App.css'
import Fade from 'react-reveal/Fade';

class ChatForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFormOpen: false,
            name: '',
            message: ''
        }
        
    }

   handleFormOpen = () => {
       this.setState ({
           isFormOpen : !this.state.isFormOpen
        
       })
   }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })
    }

    handleClickPost = (event) => {
        if (this.state.name && this.state.message) {
            this.props.postChat(this.state.name, this.state.message)
            this.setState({ name: '', message: '' })
        }
        event.preventDefault();
    }
    render() {
        return (
            <li>
                <div className="timeline-icon" onClick = {this.handleFormOpen}>
                    <div className="status btn-light"><h3><b>+</b></h3></div>
                </div>
                <Fade top>
                <div className= {`${this.state.isFormOpen && "d-none"} timeline-body`}>
                    <div className="timeline-content">
                        <div className="input">
                            <form  onSubmit={this.handleClickPost}>
                                <div className="input-group mb-2">
                                    <input 
                                        type="text" 
                                        className="form-control rounded-corner" 
                                        placeholder="your name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange} />
                                </div>
                                <div className="input-group">
                                    <textarea 
                                        type="text" 
                                        className="form-control rounded-corner" 
                                        placeholder="write your chat here..."
                                        name="message"
                                        value={this.state.message}
                                        onChange={this.handleInputChange} />
                                </div>
                                <br />
                                <div className="input-group">
                                    <button className="btn btn-primary f-s-12 rounded-corner" type="submit">Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </Fade>
            </li>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    postChat: (name, message) => dispatch(postChat(name, message)),
})

export default connect(
    null,
    mapDispatchToProps
)(ChatForm)