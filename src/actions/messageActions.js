export function submitMessage(message){
	return {
		type: 'SUBMIT_MESSAGE',
		payload: message
	}
}

export function sendMessage(message){
	return {
		type: 'SEND_MESSAGE',
		payload: message
	}
}