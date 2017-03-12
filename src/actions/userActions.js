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
export function genName(name){
	return{
		type: 'GEN_NAME',
		payload: name
	}
}
export function changeName(){
	return{
		type: 'CHANGE_NAME'
	}
}
export function getLocation(location){
	return{
		type: 'GET_LOCATION',
		payload: location
	}
}
