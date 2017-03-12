export default function reducer(state={
	name: null,
	submitName:false,
	auto: false,
	changeName:false,
	location: null,
	getLocation: true
},action){

	switch (action.type){
		case "SUBMIT_NAME":{
			return{
				...state,
				name: action.payload,
				submit:true,
				auto:false
			}
		}
		case "GEN_NAME":{
			return{
				...state,
				name: action.payload,
				auto: true
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
		case "GET_LOCATION":{
			return{
				...state,
				location: action.payload,
				getLocation: true
			}
		}
	}
	return state;
}
