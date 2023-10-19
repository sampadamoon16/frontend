import React from 'react'
import { Card } from 'react-bootstrap'

function Dashboard() {
  return (
    <>
      <div className='d-flex mt-4 ms-3'>
        <div >
          <Card className='rounded-0' style={{ width: '18rem' }} >
            <Card.Body>
              <h1> card 1</h1>
            </Card.Body>
          </Card>
        </div>
        <div>
        <Card className='rounded-0 ms-2' style={{ width: '18rem' }}>
          <Card.Body>
            <h1> card 2</h1>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card className='rounded-0 ms-2' style={{ width: '18rem' }}>
          <Card.Body>
            <h1> card 3</h1>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card className='rounded-0 ms-2' style={{ width: '18rem' }}>
          <Card.Body>
            <h1> card 4</h1>
          </Card.Body>
        </Card>
      </div>
    </div >
    </>
  )
}

export default Dashboard