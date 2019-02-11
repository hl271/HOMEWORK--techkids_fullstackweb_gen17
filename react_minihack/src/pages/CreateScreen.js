import React, { Component } from 'react'
import CreateGameForm from '../components/CreateScreen/CreateGameForm'

const API_URL = 'http://localhost:4000'

export default class CreateScreen extends Component {
  render() {
    return (
      <div>
        <CreateGameForm apiURL={API_URL}/>
      </div>
    )
  }
}
