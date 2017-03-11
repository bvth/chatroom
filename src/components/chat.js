import React from "react"
import {Button} from "react-bootstrap"
import {connect} from "react-redux"
import _ from "lodash"
import * as msg from "../actions/messageActions"
import {submitIP} from "../actions/userActions"
import io from "socket.io-client"

require('../style/chat.scss')

function mapStateToProps(store){
	return{
		message: store.message.message,
		messageSubmit: store.message.submit,
		userName : store.user.name,
	}
}
// const ip = "192.168.1.190";
let newMessage;
class Chat extends React.Component {
	constructor(){
		super();
		this.state={
			message:[],
			socket:io.connect()	,
		}
		this.Submit = this.submitMessage.bind(this);
	}
	componentWillMount(){
		newMessage = this.state.message.slice();
		fetch('/get',{method:'POST'})
			.then(function(res){
				return res.json()
			}).then((body)=>{
				_.map(body.doc,(x,i)=>
					newMessage.push({'name':body.doc[i].name, 'content':body.doc[i].content})
				)
				this.setState({message : newMessage,socket:io.connect('http://'+body.host+':3000')})
				console.log("hosting IP "+body.host);
				console.log(body.IP);
			})
	}
	componentDidMount(){
		// let newMessage = this.state.message.slice();
		this.state.socket.on("receive-message",(msg)=>{
			// newMessage.push(msg);
			// this.setState({message:newMessage});
			this.appendMessage(msg);
		})
		this.autoScroll();
	}
	appendMessage(msg){
		msg.name == this.props.userName?
		document.getElementById('chat_log').innerHTML+= '<div class="chat_log_message right"><p  class="chat_log_message_content right"><span class="chat_log_name">'+msg.name+'</span><br/>'+msg.content+'</p></div>' : document.getElementById('chat_log').innerHTML+= '<div class="chat_log_message"><p  class="chat_log_message_content"><span class="chat_log_name">'+msg.name+'</span><br/>'+msg.content+'</p></div>'
	}
	// handleKeypress(e){
	// 	if (e.which == 13 && !e.shiftKey){
	//       e.preventDefault();
	//       document.getElementById("chat_textarea").getDOMNode().dispatchEvent(new Event("submit"));
	//     }
	// }
	componentDidUpdate(){
		this.autoScroll();
	}
	submitMessage(event){
		event.preventDefault();
		this.props.dispatch(msg.submitMessage(this.refs.mess.value));
		// let newMessage = this.state.message.slice();
		// newMessage.push({
		// 	name: this.props.userName,
		// 	content: this.refs.mess.value
		// })
		//send and store messages via REST API
		fetch('/send',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'content-type':'application/json',
				'cache-control': 'no-cache'
			},
			body: JSON.stringify({
				name: this.props.userName,
				content: this.refs.mess.value
			})
		}).then(function(response){
			return response.json()
		})//.then((body)=>{
				// _.map(body,(x,i)=>
				// 	newMessage.push({'name':body[i].name, 'content':body[i].content})
				// )
				// this.setState({message : newMessage})
				// this.state.socket.emit("new-message",{
				// 	name: this.props.userName,
				// 	content: this.refs.mess.value
				// })
		//})

		this.state.socket.emit("new-message",{
			name: this.props.userName,
			content: this.refs.mess.value,
		});
		this.refs.mess.value = "";
	}

	autoScroll(){
		let dummy = document.getElementById('dummy_div');
		dummy.scrollIntoView();
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
		let messages = this.state.message;
		// console.log(this.state.message);
		return(
			<div className="chat">
				<div className="chat_log" id="chat_log">
					{_.map(messages,(x,i)=>
						this.logMessage(messages[i].name,messages[i].content,i)
					)}
					<div id="dummy_div"></div>
				</div>
				<form className="chat_textarea" onSubmit={this.Submit} id="chat_textarea">
					<input ref="mess" placeholder="text message"/>
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
