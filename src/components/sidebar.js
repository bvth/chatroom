import React from "react"
import { connect } from "react-redux"
import {Button} from "react-bootstrap"

import * as user from "../actions/userActions"

require ('../style/sidebar.scss')

function mapStateToProps(store){
	return{
		userName: store.user.name,
		userSubmit: store.user.submit,
		userIP: store.user.ip
	}
}

class Sidebar extends React.Component {
	submitName(){
		this.props.dispatch(user.submitName(this.refs.name.value));
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
