import React, { Children } from 'react'
import Sidebar from './Sidebar'
import { Col, Row } from 'react-bootstrap'

function Staticlayout({children}) {
  return (
    <div >
        <Row >
            <Col md={2}>
                <Sidebar/>
            </Col>
            
            <Col md={10} >
                {children}
            </Col>
        </Row>
      {/* <Sidebar/>
      <div className="">{children}</div> */}
    </div>
  )
}

export default Staticlayout
