import 'whatwg-fetch';

import React from "react"
import { connect } from "react-redux"
import {Button} from "react-bootstrap"
import _ from "lodash"

import * as user from "../actions/userActions"

require ('../style/sidebar.scss')

function mapStateToProps(store){
	return{
		userName: store.user.name,
		userSubmit: store.user.submitName,
		nameGen: store.user.auto,
		userLocation: store.user.location
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
	userName(){
		if(!this.props.userName){
			return (
					<form className="sidebar_form" onSubmit={this.submitName.bind(this)}>
						<input ref="name" type="text" placeholder="your name" />
						<Button bsStyle="info" bsSize="sm" type="submit">Save name</Button>
					</form>
			)
		}
		else{
			return (
				<div className="sidebar_hold">
					<span className="sidebar_hold_name">{this.props.userName}</span>
					<Button bsStyle="success" bsSize="xs" onClick={this.changeName.bind(this)}>Change name</Button>
				</div>
			)
		}
	}
	locationButton(){
		if(!this.props.userLocation){
			return(
				<div className="sidebar_location">
					<Button bsStyle="warning" bsSize="xs" onClick={this.getLocation.bind(this)}>Show location</Button>
				</div>
			)
		}
		else{
			return(
				<div className="sidebar_location">
					{this.props.userLocation}
				</div>
			)
		}
	}

	getLocation(){
		// let pos;
	    // navigator.geolocation.getCurrentPosition(
		// 	(position)=>{
		// 		var lat = position.coords.latitude;
		// 		var lng = position.coords.longitude;
		// 		fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"",
		// 			{method: 'POST'})
		// 			.then(function(res){
		// 				return res.json();
		// 			}).then((body)=>{
		// 				this.props.dispatch(user.getLocation(body.results[2].formatted_address));
		// 				console.log(this.props.userLocation);
		// 			})
		// 	},
		// 	(error)=>alert(JSON.stringify(error))
		// );
		fetch("/location",{method:'POST'})
			.then(function(res){
				return res.json()
			}).then((body)=>{
				console.log(body.location);
				this.props.dispatch(user.getLocation(body.location));
			})
	}

	render(){
		return(
			<div className="sidebar">
				{this.userName()}
				{this.locationButton()}
			</div>
		)
	}
}

export default connect(mapStateToProps)(Sidebar)
