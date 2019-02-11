import React, { Component } from 'react'
import TableOfScore from '../components/PlayScreen/TableOfScore'
import BreadcrumbNav from '../components/PlayScreen/BreadCrumb'
// import GameList from '../components/GameList'
export default class PlayScreen extends Component {
  // constructor(props) {
  //   super(props)

  // }
  render() {
    const {title} = this.props.match.params
    const {apiURL} = this.props
    return (
      <div style={{marginBottom: '2rem'}}>
        <BreadcrumbNav title={title}/>
        <TableOfScore title={title} apiURL={apiURL}/>
        {/* <GameList apiURL={API_URL}/> */}
      </div>
    )
  }
}

