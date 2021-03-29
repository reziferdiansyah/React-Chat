import React, { Component } from 'react';
import { deleteChat, resendChat } from '../actions/message';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import Fade from 'react-reveal/Fade';

class ChatItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFormOpen: false,
            sender: this.props.sender || '',
            message: this.props.message || '',
            display: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleResend = this.handleResend.bind(this)
        this.handleDisplay = this.handleDisplay.bind(this);
    }
    handleFormOpen = () => {
        this.setState({
            isFormOpen: !this.state.isFormOpen

        })
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleResend() {
        this.props.resendChat(this.props.id, this.state.sender, this.state.message)
    }
    handleDisplay(event) {
        this.setState({
            display: this.state.display === "" ? "d-none" : ""
        })
    }
    handleDelete() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You're data can't restore again!",
            icon: 'danger',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, I\'m sure!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.deleteChat(this.props.id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    render() {
        // console.log("tanggal", this.props.date)
        // time
        const createdAt = this.props.date
        const createdAtDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(createdAt);
        const createdAtTime = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(createdAt);
        // console.log(createdAtDate, createdAtTime)
        return (
            <div>
                <Fade top>
                    <div className="timeline-icon" onClick={this.handleFormOpen}>
                        <div className={` status ${this.props.no % 2 === 0 ? "btn-warning" : "btn-primary"}`}><h3><b>-</b></h3></div>
                    </div>
                    <div className={`${this.state.isFormOpen && "d-none"} timeline-boxchat`}>
                        <div className="text-container">
                            <div className={this.state.display} id="box-chat">
                                <div className="col-md-11">
                                    <div className="panel-heder"><small>{createdAtDate} {createdAtTime}</small></div> <br /><br />
                                </div>
                                <div className="row">
                                    <div className="col-md-11 d-flex flex-column">
                                        <small className="text-danger">{this.props.sent ? "" : "Failed to send!"}</small>
                                        <h2>{this.props.sender}</h2>
                                        <div className="text-lg">{this.props.message}</div> <br /><br />
                                    </div>
                                    <div className="col-md-1">
                                        <div className=" onSubmit={this.handleClickPost}">
                                            <div className="input">
                                                <div onClick={this.props.sent ? this.handleDisplay : this.handleResend}
                                                    id={this.state.display === "" ? "but-display" : "but-Display"}>
                                                    <span className={this.props.sent ? this.state.display === "" : "fa fa-refresh"}></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={this.props.sent ? this.handleDelete : this.handleResend} className="btn -btn-primary"><span className={this.props.sent ? "fa fa-trash" : ""}></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><br /><br />
                </Fade>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteChat: (id) => dispatch(deleteChat(id)),
    resendChat: (id, sender, message) => dispatch(resendChat(id, sender, message)),
})

export default connect(
    null,
    mapDispatchToProps
)(ChatItem)