export function fetchUser(){
	return{
		type: 'FETCH_USER',
		payload: "THANH Bui"
	}
}
export function submitName(name){
	return{
		type: 'SUBMIT_NAME',
		payload: name
	}
}
export function submitIP(ip){
	return{
		type:'SUBMIT_IP',
		payload: ip
	}
}
export function changeName(){
	return{
		type: 'CHANGE_NAME'
	}
}
