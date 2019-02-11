import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap'

export default class GameList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allGames: []
		}
	}
	componentDidMount() {
		axios.get('http://localhost:4000/games/')
				.then(({data}) => {
					console.log(data)
					if (!!data.error) console.log(data.error)
					else {
						this.setState({
							allGames: data.games
						})
					}
				})
				.catch((error) => {
					console.log(error)
				})
	}
	renderGameList = () => {
		return this.state.allGames.map(game => {
			return (<ListGroupItem key={game.title} tag={Link} to={game.title} action>{game.title}</ListGroupItem>)
		})
	}
  render() {
    return (
      <div>
        <h3>List of all games</h3>
				<ListGroup>
					{this.renderGameList()}
				</ListGroup>
      </div>
    )
  }
}
