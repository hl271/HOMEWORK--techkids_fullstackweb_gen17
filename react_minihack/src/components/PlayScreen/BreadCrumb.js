import React from 'react'
import {Breadcrumb, BreadcrumbItem} from 'reactstrap'
import {Link} from 'react-router-dom'

export default (props) => {
  return (
    <Breadcrumb>
        <BreadcrumbItem> <Link to="/" > Home</Link></BreadcrumbItem>
        <BreadcrumbItem active>  {props.title}</BreadcrumbItem>
    </Breadcrumb>
  )
}
