import 'whatwg-fetch';

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
		userLocation: store.user.location
	}
}
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
			})
	}
	componentDidMount(){
		this.state.socket.on("receive-message",(msg)=>{
			this.appendMessage(msg);
		})
	}
	appendMessage(msg){
		var p;
		if(!msg.location){
			p="";
		}
		else{
			p= '<p class="chat_log_message_location">'+msg.location+'</p>';
		}
		msg.name == this.props.userName?
		document.getElementById('chat_log').innerHTML+= '<div id="new_message" class="chat_log_message right">'+p+'<p  class="chat_log_message_content right"><span class="chat_log_name">'+
			msg.name+'</span><br/>'+msg.content+'</p></div>' :
			document.getElementById('chat_log').innerHTML+= '<div id="new_message" class="chat_log_message"><p  class="chat_log_message_content"><span class="chat_log_name">'+
				msg.name+'</span><br/>'+msg.content+'<p>'+p+'</p></div>'
		this.autoScroll();
	}
	submitMessage(event){
		event.preventDefault();
		this.props.dispatch(msg.submitMessage(this.refs.mess.value));
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
		})
		this.state.socket.emit("new-message",{
			name: this.props.userName,
			content: this.refs.mess.value,
			location: this.props.userLocation
		});
		this.refs.mess.value = "";
		console.log(this.props);
		return false;
	}

	autoScroll(){
		let dummy = document.getElementById("new_message");
		dummy.scrollIntoView();
		dummy.removeAttribute("id")
	}
	showLocation(){
			return(
				<span>{this.props.userLocation}</span>
			)
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
		return(
			<div className="chat">
				<div className="chat_log" id="chat_log">
					{_.map(messages,(x,i)=>
						this.logMessage(messages[i].name,messages[i].content,i)
					)}
					<div id="dummy_div"></div>
				</div>
				<form className="chat_textarea" onSubmit={this.Submit} id="chat_textarea">
					<input ref="mess" placeholder="text message" />
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
