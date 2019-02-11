import React, { Component } from 'react'
import CreateGameForm from '../components/CreateScreen/CreateGameForm'
// import GameList from '../components/GameList'


export default class CreateScreen extends Component {
  render() {
    const {apiURL} = this.props
    return (
      <div>
        <CreateGameForm apiURL={apiURL}/>
        {/* <GameList apiURL={API_URL}/> */}
      </div>
    )
  }
}
