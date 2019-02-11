import React, { Component } from 'react'
import TableOfScore from '../components/PlayScreen/TableOfScore'
import BreadcrumbNav from '../components/PlayScreen/BreadCrumb'
const API_URL = 'http://localhost:4000'
export default class PlayScreen extends Component {
  // constructor(props) {
  //   super(props)

  // }
  render() {
    const {title} = this.props.match.params
    return (
      <div style={{marginBottom: '2rem'}}>
        <BreadcrumbNav title={title}/>
        <TableOfScore title={title} apiURL={API_URL}/>
      </div>
    )
  }
}

