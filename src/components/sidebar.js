import React from "react"
import { connect } from "react-redux"
import {Button} from "react-bootstrap"
import _ from "lodash"

import * as user from "../actions/userActions"

require ('../style/sidebar.scss')

function mapStateToProps(store){
	return{
		userName: store.user.name,
		userSubmit: store.user.submit,
		nameGen: store.user.auto,
	}
}

class Sidebar extends React.Component {
	componentWillMount(){
		this.generateName();
	}
	submitName(){
		this.props.dispatch(user.submitName(this.refs.name.value));
		console.log(this.props);
	}
	generateName(){
		let nameArray=[];
		_.times(4,()=>{
			nameArray.push([0,1,2,3,4,5,7,8,9][Math.floor(Math.random()*9)]);
		})
		let name = "Guest"+	nameArray.join("");
		this.props.dispatch(user.genName(name));
		console.log(this.props);
	}
	changeName(){
		this.props.dispatch(user.changeName());
	}
	render(){
		if(!this.props.userName){
			return (
				<div className='sidebar'>
					<form className="sidebar_form" onSubmit={this.submitName.bind(this)}>
						<input ref="name" type="text" placeholder="your name" />
						<Button bsStyle="info" bsSize="sm" type="submit">Save name</Button>
					</form>
				</div>
			)
		}
		console.log(this.props);
		return(
			<div className='sidebar'>
				<span className="sidebar_name">{this.props.userName}</span><br/>
				<Button bsStyle="success" bsSize="xs" onClick={this.changeName.bind(this)}>Change name</Button>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Sidebar)
