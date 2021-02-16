import Swal from "sweetalert2"
const messages = (state = [], action) => {
    switch (action.type) {

        case 'ADD_CHAT':
            return [
                ...state,
                {
                    id: action.id,
                    sender: action.sender,
                    message: action.message,
                }
            ]

        case 'ADD_CHAT_SUCCESS':
            Swal.fire({
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
            return state.map(item => {
                item.sent = true
                return item
            });

        case 'ADD_CHAT_FAILURE':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.sent = false
                }
                return item
            });

        case 'LOAD_CHAT_SUCCESS':
            return action.data.data.map((item) => {
                item.sent = true;
                item.isBtnSave = false;
                return item
            })

        case 'LOAD_CHAT_FAILURE':
            return state;

        case 'DELETE_CHAT':
            return state.filter(item => item.id !== action.id)

        case 'DELETE_CHAT_SUCCESS':
            return state

        case 'DELETE_CHAT_FAILURE':
            return state;

        default:
            return state;
    }
}

export default messages