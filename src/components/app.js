import React from "react"
import {Grid} from "react-bootstrap"

require('../style/default.scss')
import Layout from './layout'

export default class App extends React.Component{
	render(){
		return(
			<Grid>
				<Layout/>
			</Grid>
		)
	}
}