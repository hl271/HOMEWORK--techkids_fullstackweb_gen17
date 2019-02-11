import React, { Component } from 'react'
import {Table, Input, Button} from 'reactstrap'
import axios from 'axios'

export default class TableOfScore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      game: null,
      title: null,

    }
  }
  api_checkForGameData = ()=> {
      const {title} = this.props
      axios.get(this.props.apiURL + '/games/' + title)
          .then(res => {
            const {error, game} = res.data
            if (error) console.log(error)
            else if (!game) this.setState({title: 'This game was not found!'})
            else {
              this.setState({title: game.title, game: game})
            }
          })

  }
   
    componentDidMount() {
      this.api_checkForGameData()
  }
  componentDidUpdate() {
      this.api_checkForGameData()
  }
  renderPlayerNames= () => {
    let players = []
    if (this.state.game) {
      const {game} = this.state
      players = game.players.map(player => {
        return (<th key={player._id}>{player.name}</th>)
      })
    }
    return players
  }
  calculateSumOfPlayerScore = () => {
      const {game} = this.state
      let results = []
      if (game) {
          results = game.players.map((player, playerth) => {
              let sumOfPlayerScore = 0
              game.rounds.forEach(round => {
                  sumOfPlayerScore += round[playerth]
              })
              return sumOfPlayerScore
          })
      }
      return results
  }
  calculateSumOfScore = (sumOfPlayerScore) => {
      let total = 0
      if (sumOfPlayerScore) {
        sumOfPlayerScore.forEach(score => {
            total += score
        })
      }
      return total
  }
  onScoreChange = (gameid, roundth, playerth) => (event) => {
    axios.put(this.props.apiURL + '/games', {gameid, roundth, playerth, score: event.target.value})
            .then(res => {
                const {error, updatedGame} = res.data
                if (error) console.log(error)
                else if (updatedGame) {
                    console.log('updated score')
                    this.setState({game: updatedGame})
                }
            })
            .catch(error => {
                if (error) console.log(error)

            })
  }
  onNewRoundClick = () => {
      axios.post(this.props.apiURL + '/games/round', {gameid: this.state.game._id})
            .then(res => {
                const {error, updatedGame} = res.data
                if (error) console.log(error)
                else if (updatedGame) this.setState({game: updatedGame})
            })
            .catch(error => {
                if (error) console.log(error)
            })
  }
  renderSumOfPlayerScore = (sumOfPlayerScore) => {
      if (sumOfPlayerScore) {
          return sumOfPlayerScore.map((score, playerth) => {
              return (<th key={'Sum of player' + playerth}>{score}</th>)
          })
      }
  }
  renderRounds = () => {
    let roundRendered = []
    if (this.state.game) {
      const {rounds} = this.state.game
      const {game} = this.state
      if (rounds) {

        roundRendered = rounds.map((round, roundth) => {
          return (
            <tr key={'round' + roundth}>
              <th>{'Round '} {(roundth+1)}</th>

              {round.map((score, playerth) => {
                return (
                  <td key={'Player ' +  playerth}>
                    <Input onChange={this.onScoreChange(game._id, roundth, playerth, score)} type="number" step="1" value={score} required/>
                  </td>
                )
              })}

            </tr>
          )
        })

      }
    }
    return roundRendered
  }
  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <Table striped>
          <thead>
            <tr>
              <th scope="col"></th>
              {this.renderPlayerNames()}
            </tr>
            <tr color="danger">
              <th scope="col">Sum of score: {this.calculateSumOfScore(this.calculateSumOfPlayerScore())}</th>
              {this.renderSumOfPlayerScore(this.calculateSumOfPlayerScore())}
            </tr>
          </thead>

          <tbody>
            {this.renderRounds()}
          </tbody>
        </Table>
        <Button style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} color="danger" onClick={this.onNewRoundClick}>Add New Round</Button>
      </div>
    )
  }
}