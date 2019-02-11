import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import PlayerNameInput from './PlayerNameInput'
import CreateGameButton from './CreateGameButton'

class CreateGameForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players: [],
            playerCount: 2,
            title: '',
            validateQuote: ''
        }
    }

    onHandleChange = (event) => {
        const {name, value} = event.target
        this.setState(state => {
            const {players } = state
            players[name] = value
        })
    }
    onHandleClick = (event) => {
        this.setState(state => {            
            return {
                playerCount: state.playerCount + 1
            }
        })
    }
    onTitleChange = (event) => {
        const {value} = event.target
        this.setState(state => ({
            title: value
        }))
    }
    onSubmit = (event) => {
        event.preventDefault()
        const data ={user: this.state.players, title: this.state.title}
        axios.post(this.props.apiURL + '/games/', data)
            .then(res => {
                console.log(res)
                if (res.data.error) this.setState({validateQuote: res.data.error.msg})
                else if (!!res.data.gameURL) {
                    window.location.href=`/${res.data.gameURL}`
                }
            })
            .catch(error => {
                if (error) console.log(error)
            })
    }
    createInputHolder = () => {
        const inputs = []
        for (let x=2; x<this.state.playerCount;x++) {
            inputs.push(<PlayerNameInput playerth={x} key={x} handleChange={this.onHandleChange}/>)
        }
        return inputs
    }
    render() {
        return (
            <div className="form-panel mt-4 mb-5">
                <form onSubmit={this.onSubmit} method="post" action="/games/new" id="newGameForm">
                    <div id="title_input-panel" className="form-group">
                        <input onChange={this.onTitleChange} id="title" name="title" className="form-control border-pink" placeholder="Title of your game" required/>
                        <span id="validate-title">{this.state.validateQuote}</span>
                    </div>
                    <div id="player_input-panel" className="form-group">
                        <h4>Players</h4><hr></hr>
                        <PlayerNameInput playerth="0" key="0" handleChange={this.onHandleChange} required={true}/>
                        <PlayerNameInput playerth="1" key="1" handleChange={this.onHandleChange} required={true}/>
                        {this.createInputHolder() }
                        <CreateGameButton handleClick={this.onHandleClick}/>
                    
                    </div>
                    <button className="btn btn-pink d-block mx-auto my-3" id="submitBtn" type="submit">CREATE NEW GAME</button>
                </form>
            </div>
        )
    }
}

export default withRouter(CreateGameForm)
