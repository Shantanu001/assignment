import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
function App() {
  const [CityDetail, setCityDetail] = useState();
  const [hdFlag, setHdEnabled] = useState();
  const [oneWayFlag, setOneWayEnabled] = useState();
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    console.log(searchText);
    const url = "https://api.zoomcar.com/v4/cities?platform=web";
    Axios.get(url).then(function (response) {
      console.log("response------>", response);
      let CityDetail = response.data.cities.map((el) => {
        let city = {};
        city.name = el.name;
        city.icon = el.icon;
        city.popular = el.popular;
        city.hd_enabled = el.hd_enabled;
        city.one_way_enabled = el.one_way_enabled;
        return city;
      });
      CityDetail = CityDetail.filter(el => {return el.hd_enabled === hdFlag && el.one_way_enabled === oneWayFlag && el.name.includes(searchText)})
      setCityDetail(CityDetail);
      console.log("to SHow===",CityDetail);
    });
  }, [hdFlag,oneWayFlag,searchText]);
  return (
    <div className="App">
      <Container fluid>
          <Row>
            {" "}
            <span className="heading">CITIES</span>
          </Row>
          <Row>
            <Form className="controlForm">
              <Col>
                <Form.Control size="sm" type="text" placeholder="Search City" onChange={(e)=>setSearchText(e.target.value)} />
              </Col>
              <Col className="filter">
                <Form.Check type="checkbox" label="HD ENABLED" onChange={(e)=>setHdEnabled(e.target.checked)}/>
                <Form.Check type="checkbox" label="ONE WAY ENABLED" onChange={(e)=>setOneWayEnabled(e.target.checked)}/>
              </Col>
            </Form>
          </Row>
          <Row className="cities">
                {CityDetail &&
                  CityDetail.map((city) => (
                    <Col sm={4}>
                      <Card className="card" >
                        <Card.Img className="avatar" variant="top" src={city.icon} />
                        <Card.Body>
                          <Card.Title>{city.name}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
          </Row>
      </Container>
    </div>
  );
}

export default App;
