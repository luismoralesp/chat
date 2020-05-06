import React, { useState  } from 'react';
import { Search } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

function SearchRoom(props){
    const [ search, setSearch ] = useState("")
    
    function handleChange(e){
        setSearch(e.target.value)
        props.onSearch(e.target.value)
    }

    return (<Card  style={{ padding: '10px' }}>
                <Container fluid>
                <Row style={{borderRadius: '20px', margin: '0 auto', border:'solid 1px #ddd'}}>
                    <Col xs={2} style={{ padding: '6px', textAlign: 'center' }}>
                        <Search />
                    </Col>
                    <Col style={{ padding: '5px' }}>
                        <Form.Control 
                            style={{ border: 'none', height: '30px' }} 
                            value={ search }
                            onChange={ handleChange }
                        />
                    </Col>
                </Row>
                </Container>
            </Card>
    )
}

export default SearchRoom