export default function reducer(state={
	message: null,
	submit: false,
	send: false
},action){

	switch(action.type){
		case "SUBMIT_MESSAGE":{
			return{
				...state,
				message: action.payload,
				submit: true
			}
		}
		case "SEND_MESSAGE":{
			return{
				...state,
				message: action.payload,
				submit: false,
				send: true
			}
		}
	}
	return state
}