import React from "react"
import {Button} from "react-bootstrap"
import {connect} from "react-redux"
import _ from "lodash"
import * as msg from "../actions/messageActions"
import io from "socket.io-client"

require('../style/chat.scss')

function mapStateToProps(store){
	return{
		message: store.message.message,
		messageSubmit: store.message.submit,
		userName : store.user.name
	}
}
//change to your hosting IP before running
const ip = "192.168.1.190";

class Chat extends React.Component {
	constructor(){
		super();
		this.state={
			message:[],
			socket: io.connect('http://'+ip+':3000')
		}
		this.Submit = this.submitMessage.bind(this);
	}
	componentDidMount(){
		var self = this
		self.state.socket.on("receive-message",function(msg){
			let newMessage = self.state.message.slice();
			newMessage.push(msg);
			self.setState({message:newMessage});
			// console.log(msg);
		})
	}
	// handleKeypress(e){
	// 	if (e.which == 13 && !e.shiftKey){
	//       e.preventDefault();
	//       document.getElementById("chat_textarea").getDOMNode().dispatchEvent(new Event("submit"));
	//     }
	// }
	submitMessage(event){
		event.preventDefault();
		// console.log(this.state.message);
		this.props.dispatch(msg.submitMessage(this.refs.mess.value));
		let newMessage = this.state.message.slice();
		newMessage.push({
			name: this.props.userName,
			content: this.refs.mess.value
		})
		// var data = {
		// 	'name': newMessage[newMessage.length-1].name,
		// 	'content': newMessage[newMessage.length-1].content
		// }
		// var formBody = [];
  //       for (var property in data) {
  //           var encodedKey = encodeURIComponent(property);
  //           var encodedValue = encodeURIComponent(data[property]);
  //           formBody.push(encodedKey + "=" + encodedValue);
  //       }
  //       formBody = formBody.join("&");
		fetch('/send',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'content-type':'application/json',
				'cache-control': 'no-cache'
			},
			body: JSON.stringify({
				name: newMessage[newMessage.length-1].name,
				content: newMessage[newMessage.length-1].content
			})
		}).then(function(response){
			return response.json()
		}).then(function(body){
			console.log("hehe",body);
		})
		// this.setState({
		// 	message: newMessage
		// })
		
		this.state.socket.emit("new-message",newMessage[newMessage.length-1]);
		this.refs.mess.value = "";
	}
	logMessage(name,content,i){
		if(!name){
			return(
				<div key={i} className="chat_log_message">
				<p  className="chat_log_message_content">
					<span className="chat_log_name">Guest</span><br/>
					{content}
				</p>
				</div>
			)
		}
		else{
			return(
				<div key={i} className="chat_log_message">
				<p  className="chat_log_message_content">
					<span className="chat_log_name">{name}</span><br/>
					{content}
				</p>
				</div>
			)
		}
	}
	render(){

		let messages = this.state.message
		return(
			<div className="chat">
				<div className="chat_log">
					{_.map(messages,(x,i)=>
						this.logMessage(messages[i].name,messages[i].content,i)
					)}
				</div>
				<form className="chat_textarea" onSubmit={this.Submit} id="chat_textarea">
					<textarea ref="mess" placeholder="text message" ></textarea>
										<Button 
						bsStyle="primary" 
						bsSize="small" 
						type="submit">
							Send
					</Button>
				</form>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Chat)