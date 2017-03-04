import React from 'react'

import Sidebar from './sidebar'
import Chat from './chat'

export default class Layout extends React.Component {
	render(){
		return(
			<div className="layout">
				<Sidebar/>
				<Chat/>
			</div>
		)
	}
}