export default function reducer(state={
	name: null,
	submitName:false,
	changeName:false,
	ip:null,
	submitIP:false
},action){

	switch (action.type){
		case "SUBMIT_NAME":{
			return{
				...state,
				name: action.payload,
				submit:true
			}
		}
		case "SUBMIT_IP":{
			return{
				...state,
				ip: action.payload,
				submitIP: true
			}
		}
		case "FETCH_USER":{
			return{
				...state,
				submit:false,
				name: action.payload
			}
		}
		case "CHANGE_NAME":{
			return{
				...state,
				name: null,
				submit: false,
				change: true
			}
		}
	}
	return state;
}
