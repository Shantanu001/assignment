import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import useDebounce from "./debounce.js";

function App() {
  const [CityDetail, setCityDetail] = useState();
  const [hdFlag, setHdEnabled] = useState(false);
  const [oneWayFlag, setOneWayEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText,500);

  
  useEffect(() => {
    const url = process.env.REACT_APP_LISTS_URL;
    console.log(url);
    Axios.get(url).then(function (response) {
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
      if(debouncedSearchTerm) {
        CityDetail = CityDetail.filter(el => {return el.name.includes(debouncedSearchTerm)});
      }
      setCityDetail(CityDetail);
    });
  }, [hdFlag,oneWayFlag,debouncedSearchTerm]);
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
                {CityDetail&&CityDetail.length > 0?
                  CityDetail.map((city) => (
                    <Col sm={4}>
                      <Card className="card" >
                        <Card.Img className="avatar" variant="top" src={city.icon} />
                        <Card.Body>
                          <Card.Title>{city.name}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  )):<h1 className="notFound">No City found :(</h1>}
          </Row>
      </Container>
    </div>
  );
}

export default App;
