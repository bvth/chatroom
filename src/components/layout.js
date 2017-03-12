import React from "react"
import {Col} from "react-bootstrap"

import Sidebar from "./sidebar"
import Chat from "./chat"

export default class Layout extends React.Component {
	render(){
		return(
			<div className="layout">
				<Col xs={12} sm={3} md={3}>
					<Sidebar/>
				</Col>
				<Col xs={12} sm={9} md={9}>
					<Chat/>
				</Col>
			</div>
		)
	}
}
