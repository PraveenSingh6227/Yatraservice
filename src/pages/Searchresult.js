import Footer from '@/component/Footer'
import Header from '@/component/Header'
import {useEffect,useState} from 'react'

export default function Searchresult() {
  const [Contracts, setContracts] = useState([]);
  const [apitokken, setApitokken] = useState("52ebd612-e081-482e-abbd-78d485701682");
  const [agencyKey, setAgencyKey] = useState("81854E61-DB4D-4BC1-87BC-D30DAC649886");
  const [adultCount, setAdultCount] = useState("1");
  const [childCount, setChildCount] = useState("0");
  const [InfantCount, setInfantCount] = useState("0");
  const [PreferredAirlines, setPreferredAirlines] = useState("null");
  const [tripType, setTripType] = useState("0");
  const [typeOfclass, setTypeOfClass] = useState("0");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [traveldate, setTravelDate] = useState("2023-10-22T00:00:00");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

 
  async function submited() {
    
    let item = {
      "apitokken": apitokken,
"AgencyKey": agencyKey,
"AdultCount": adultCount,
"ChildCount": childCount,
"InfantCount": InfantCount,
"PreferredAirlines": PreferredAirlines,
"source": source,
"destination": destination,
"traveldate": traveldate,
"TripType": 0,
"TypeOfClass": 0
    }
    console.log(item)
    
 
    let result = await fetch("https://whollykart.com/ap/test.php",{
      method: 'POST',
      body:JSON.stringify(item),
      headers:{
        "Content-Type":"application/json",
        "Accept":'application/json',
        
      }
 
    });
    result= await result.json();
    setContracts(result.Contracts);
    console.log(result.Contracts);
    const id = result;
    console.log(id);
    

  }

  
  return (
    <>
    <Header />
    <>

  <div className="search-overlay">
    <div className="d-table">
      <div className="d-table-cell">
        <div className="search-overlay-layer" />
        <div className="search-overlay-layer" />
        <div className="search-overlay-layer" />
        <div className="search-overlay-close">
          <span className="search-overlay-close-line" />
          <span className="search-overlay-close-line" />
        </div>
        <div className="search-overlay-form">
          <form>
            <input
              type="text"
              className="input-search"
              placeholder="Search here..."
            />
            <button type="button">
              <i className="fas fa-search" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* Common Banner Area */}
  <section id="common_banner">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="common_bannner_text">
            <h2>Flight search result</h2>
            <ul>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <span>
                  <i className="fas fa-circle" />
                </span>{" "}
                Flight search result
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Form Area */}
  <section
    id="theme_search_form_tour"
    className="fligth_top_search_main_form_wrapper"
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="theme_search_form_area">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="flight_categories_search">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="oneway-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#oneway_flight"
                            type="button"
                            role="tab"
                            aria-controls="oneway_flight"
                            aria-selected="true"
                          >
                            One Way
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="roundtrip-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#roundtrip"
                            type="button"
                            role="tab"
                            aria-controls="roundtrip"
                            aria-selected="false"
                          >
                            Roundtrip
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="multi_city-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#multi_city"
                            type="button"
                            role="tab"
                            aria-controls="multi_city"
                            aria-selected="false"
                          >
                            Multi city
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="tab-content" id="myTabContent1">
                  <div
                    className="tab-pane fade show active"
                    id="oneway_flight"
                    role="tabpanel"
                    aria-labelledby="oneway-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="oneway_search_form">
                          <form action="#!">
                            <div className="row">
                              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>From</p>
                                  <input type="text" value={source} defaultValue="New York" onChange={(e)=>setSource(e.target.value)} />
                                  <span>
                                    JFK - John F. Kennedy International...
                                  </span>
                                  <div className="plan_icon_posation">
                                    <i className="fas fa-plane-departure" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>To</p>
                                  <input type="text" value={destination} defaultValue="London " onChange={(e)=>setDestination(e.target.value)} />
                                  <span>LCY, London city airport </span>
                                  <div className="plan_icon_posation">
                                    <i className="fas fa-plane-arrival" />
                                  </div>
                                  <div className="range_plan">
                                    <i className="fas fa-exchange-alt" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                <div className="form_search_date">
                                  <div className="flight_Search_boxed date_flex_area">
                                    <div className="Journey_date">
                                      <p>Journey date</p>
                                      <input
                                        type="date"
                                        defaultValue="2022-05-05" value={traveldate} onChange={(e)=>setTravelDate(e.target.value)}
                                      />
                                      <span>Thursday</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed dropdown_passenger_area">
                                  <p>Passenger, Class </p>
                                  <div className="dropdown">
                                    <button
                                      className="dropdown-toggle final-count"
                                      data-toggle="dropdown"
                                      type="button"
                                      id="dropdownMenuButton1"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      0 Passenger
                                    </button>
                                    <div
                                      className="dropdown-menu dropdown_passenger_info"
                                      aria-labelledby="dropdownMenuButton1"
                                    >
                                      <div className="traveller-calulate-persons">
                                        <div className="passengers">
                                          <h6>Passengers</h6>
                                          <div className="passengers-types">
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count pcount">
                                                  2
                                                </span>
                                                <div className="type-label">
                                                  <p>Adult</p>
                                                  <span>12+ yrs</span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count ccount">
                                                  0
                                                </span>
                                                <div className="type-label">
                                                  <p className="fz14 mb-xs-0">
                                                    Children
                                                  </p>
                                                  <span>
                                                    2 - Less than 12 yrs
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add-c"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract-c"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count incount">
                                                  0
                                                </span>
                                                <div className="type-label">
                                                  <p className="fz14 mb-xs-0">
                                                    Infant
                                                  </p>
                                                  <span>Less than 2 yrs</span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add-in"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract-in"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="cabin-selection">
                                          <h6>Cabin Class</h6>
                                          <div className="cabin-list">
                                            <button
                                              type="button"
                                              className="label-select-btn"
                                            >
                                              <span className="muiButton-label">
                                                Economy
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="label-select-btn active"
                                            >
                                              <span className="muiButton-label">
                                                Business
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="label-select-btn"
                                            >
                                              <span className="MuiButton-label">
                                                First Class
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <span>Business</span>
                                </div>
                              </div>
                              <div className="">
                              <button
              title="Login"
             
              buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)' }}
              containerStyle={{
                width: '95%',
                marginHorizontal: 50,
                
              }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
              onClick={submited}
            >
                Submitter </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="roundtrip"
                    role="tabpanel"
                    aria-labelledby="roundtrip-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="oneway_search_form">
                          <form action="#!">
                            <div className="row">
                              <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>From</p>
                                  <input type="text" defaultValue="New York" />
                                  <span>
                                    JFK - John F. Kennedy International...
                                  </span>
                                  <div className="plan_icon_posation">
                                    <i className="fas fa-plane-departure" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>To</p>
                                  <input type="text" defaultValue="London " />
                                  <span>LCY, London city airport </span>
                                  <div className="plan_icon_posation">
                                    <i className="fas fa-plane-arrival" />
                                  </div>
                                  <div className="range_plan">
                                    <i className="fas fa-exchange-alt" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                <div className="form_search_date">
                                  <div className="flight_Search_boxed date_flex_area">
                                    <div className="Journey_date">
                                      <p>Journey date</p>
                                      <input
                                        type="date"
                                        defaultValue="2022-05-05"
                                      />
                                      <span>Thursday</span>
                                    </div>
                                    <div className="Journey_date">
                                      <p>Return date</p>
                                      <input
                                        type="date"
                                        defaultValue="2022-05-08"
                                      />
                                      <span>Saturday</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed dropdown_passenger_area">
                                  <p>Passenger, Class </p>
                                  <div className="dropdown">
                                    <button
                                      className="dropdown-toggle final-count"
                                      data-toggle="dropdown"
                                      type="button"
                                      id="dropdownMenuButton1"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      0 Passenger
                                    </button>
                                    <div
                                      className="dropdown-menu dropdown_passenger_info"
                                      aria-labelledby="dropdownMenuButton1"
                                    >
                                      <div className="traveller-calulate-persons">
                                        <div className="passengers">
                                          <h6>Passengers</h6>
                                          <div className="passengers-types">
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count pcount">
                                                  2
                                                </span>
                                                <div className="type-label">
                                                  <p>Adult</p>
                                                  <span>12+ yrs</span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count ccount">
                                                  0
                                                </span>
                                                <div className="type-label">
                                                  <p className="fz14 mb-xs-0">
                                                    Children
                                                  </p>
                                                  <span>
                                                    2 - Less than 12 yrs
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add-c"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract-c"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count incount">
                                                  0
                                                </span>
                                                <div className="type-label">
                                                  <p className="fz14 mb-xs-0">
                                                    Infant
                                                  </p>
                                                  <span>Less than 2 yrs</span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add-in"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract-in"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="cabin-selection">
                                          <h6>Cabin Class</h6>
                                          <div className="cabin-list">
                                            <button
                                              type="button"
                                              className="label-select-btn"
                                            >
                                              <span className="muiButton-label">
                                                Economy
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="label-select-btn active"
                                            >
                                              <span className="muiButton-label">
                                                Business
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="label-select-btn"
                                            >
                                              <span className="MuiButton-label">
                                                First Class{" "}
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <span>Business</span>
                                </div>
                              </div>
                            </div>
                            <div className="top_form_search_button">
                              <button className="btn btn_theme btn_md">
                                Search
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="multi_city"
                    role="tabpanel"
                    aria-labelledby="multi_city-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="oneway_search_form">
                          <form action="#!">
                            <div className="multi_city_form_wrapper">
                              <div className="multi_city_form">
                                <div className="row">
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>From</p>
                                      <input
                                        type="text"
                                        defaultValue="New York"
                                      />
                                      <span>
                                        DAC, Hazrat Shahajalal International...
                                      </span>
                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-departure" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>To</p>
                                      <input
                                        type="text"
                                        defaultValue="London "
                                      />
                                      <span>LCY, London city airport </span>
                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-arrival" />
                                      </div>
                                      <div className="range_plan">
                                        <i className="fas fa-exchange-alt" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="form_search_date">
                                      <div className="flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                          <p>Journey date</p>
                                          <input
                                            type="date"
                                            defaultValue="2022-05-05"
                                          />
                                          <span>Thursday</span>
                                        </div>
                                        <div className="Journey_date">
                                          <p>Return date</p>
                                          <input
                                            type="date"
                                            defaultValue="2022-05-10"
                                          />
                                          <span>Saturday</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed dropdown_passenger_area">
                                      <p>Passenger, Class </p>
                                      <div className="dropdown">
                                        <button
                                          className="dropdown-toggle final-count"
                                          data-toggle="dropdown"
                                          type="button"
                                          id="dropdownMenuButton1"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          0 Passenger
                                        </button>
                                        <div
                                          className="dropdown-menu dropdown_passenger_info"
                                          aria-labelledby="dropdownMenuButton1"
                                        >
                                          <div className="traveller-calulate-persons">
                                            <div className="passengers">
                                              <h6>Passengers</h6>
                                              <div className="passengers-types">
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count pcount">
                                                      2
                                                    </span>
                                                    <div className="type-label">
                                                      <p>Adult</p>
                                                      <span>12+ yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add"
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract"
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count ccount">
                                                      0
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Children
                                                      </p>
                                                      <span>
                                                        2 - Less than 12 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-c"
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-c"
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count incount">
                                                      0
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Infant
                                                      </p>
                                                      <span>
                                                        Less than 2 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-in"
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-in"
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="cabin-selection">
                                              <h6>Cabin Class</h6>
                                              <div className="cabin-list">
                                                <button
                                                  type="button"
                                                  className="label-select-btn"
                                                >
                                                  <span className="muiButton-label">
                                                    Economy
                                                  </span>
                                                </button>
                                                <button
                                                  type="button"
                                                  className="label-select-btn active"
                                                >
                                                  <span className="muiButton-label">
                                                    Business
                                                  </span>
                                                </button>
                                                <button
                                                  type="button"
                                                  className="label-select-btn"
                                                >
                                                  <span className="MuiButton-label">
                                                    First Class{" "}
                                                  </span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <span>Business</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="multi_city_form">
                                <div className="row">
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>From</p>
                                      <input
                                        type="text"
                                        defaultValue="New York"
                                      />
                                      <span>
                                        DAC, Hazrat Shahajalal International...
                                      </span>
                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-departure" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>To</p>
                                      <input
                                        type="text"
                                        defaultValue="London "
                                      />
                                      <span>LCY, London city airport </span>
                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-arrival" />
                                      </div>
                                      <div className="range_plan">
                                        <i className="fas fa-exchange-alt" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="form_search_date">
                                      <div className="flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                          <p>Journey date</p>
                                          <input
                                            type="date"
                                            defaultValue="2022-05-05"
                                          />
                                          <span>Thursday</span>
                                        </div>
                                        <div className="Journey_date">
                                          <p>Return date</p>
                                          <input
                                            type="date"
                                            defaultValue="2022-05-12"
                                          />
                                          <span>Saturday</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed dropdown_passenger_area">
                                      <p>Passenger, Class </p>
                                      <div className="dropdown">
                                        <button
                                          className="dropdown-toggle final-count"
                                          data-toggle="dropdown"
                                          type="button"
                                          id="dropdownMenuButton1"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          0 Passenger
                                        </button>
                                        <div
                                          className="dropdown-menu dropdown_passenger_info"
                                          aria-labelledby="dropdownMenuButton1"
                                        >
                                          <div className="traveller-calulate-persons">
                                            <div className="passengers">
                                              <h6>Passengers</h6>
                                              <div className="passengers-types">
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count pcount">
                                                      2
                                                    </span>
                                                    <div className="type-label">
                                                      <p>Adult</p>
                                                      <span>12+ yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add"
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract"
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count ccount">
                                                      0
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Children
                                                      </p>
                                                      <span>
                                                        2 - Less than 12 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-c"
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-c"
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count incount">
                                                      0
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Infant
                                                      </p>
                                                      <span>
                                                        Less than 2 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-in"
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-in"
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="cabin-selection">
                                              <h6>Cabin Class</h6>
                                              <div className="cabin-list">
                                                <button
                                                  type="button"
                                                  className="label-select-btn"
                                                >
                                                  <span className="muiButton-label">
                                                    Economy
                                                  </span>
                                                </button>
                                                <button
                                                  type="button"
                                                  className="label-select-btn active"
                                                >
                                                  <span className="muiButton-label">
                                                    Business
                                                  </span>
                                                </button>
                                                <button
                                                  type="button"
                                                  className="label-select-btn"
                                                >
                                                  <span className="MuiButton-label">
                                                    First Class{" "}
                                                  </span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <span>Business</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="add_multy_form">
                                  <button type="button" id="addMulticityRow">
                                    + Add another flight
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="top_form_search_button">
                              <button className="btn btn_theme btn_md">
                                Search
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Flight Search Areas */}
  <section id="explore_area" className="section_padding">
    <div className="container">
      {/* Section Heading */}
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="section_heading_center">
            <h2>{Contracts.length} tours found</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3">
          <div className="left_side_search_area">
            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <h5>Filter by price</h5>
              </div>
              <div className="filter-price">
                <div id="price-slider" />
              </div>
              <button className="apply" type="button">
                Apply
              </button>
            </div>
            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <h5>Number of stops</h5>
              </div>
              <div className="tour_search_type">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaultf1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaultf1"
                  >
                    <span className="area_flex_one">
                      <span>1 stop</span>
                      <span>20</span>
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaultf2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaultf2"
                  >
                    <span className="area_flex_one">
                      <span>2 stop</span>
                      <span>16</span>
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaultf3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaultf3"
                  >
                    <span className="area_flex_one">
                      <span>3 stop</span>
                      <span>30</span>
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaultf4"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaultf4"
                  >
                    <span className="area_flex_one">
                      <span>Non-stop</span>
                      <span>22</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <h5>Flight class</h5>
              </div>
              <div className="tour_search_type">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaultt1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaultt1"
                  >
                    <span className="area_flex_one">
                      <span>Economy</span>
                      <span>20</span>
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaultt2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaultt2"
                  >
                    <span className="area_flex_one">
                      <span>Business</span>
                      <span>26</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <h5>Airlines</h5>
              </div>
              <div className="tour_search_type">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaults1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaults1"
                  >
                    <span className="area_flex_one">
                      <span>Quatar Airways</span>
                      <span>17</span>
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaults2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaults2"
                  >
                    <span className="area_flex_one">
                      <span>Fly Amirates </span>
                      <span>14</span>
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaults3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaults3"
                  >
                    <span className="area_flex_one">
                      <span>Novo Air </span>
                      <span>62</span>
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaults4"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaults4"
                  >
                    <span className="area_flex_one">
                      <span>Air Asia </span>
                      <span>08</span>
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaults5"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaults5"
                  >
                    <span className="area_flex_one">
                      <span>Singapore Airlines </span>
                      <span>12</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <h5>Refundable</h5>
              </div>
              <div className="tour_search_type">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaultp1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaultp1"
                  >
                    <span className="area_flex_one">
                      <span>Yes</span>
                      <span>17</span>
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaultp2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaultp2"
                  >
                    <span className="area_flex_one">
                      <span>No</span>
                      <span>14</span>
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefaultp3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefaultp3"
                  >
                    <span className="area_flex_one">
                      <span>As per rules</span>
                      <span>{Contracts.length}</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="row">
          {Contracts.map((item) => {
            console.log(Contracts.length);
                    return (
                      <div className="col-lg-12">
                      <div className="flight_search_result_wrapper">
                        
                              <div className="flight_search_item_wrappper">
                          <div className="flight_search_items">
                            <div className="multi_city_flight_lists">
                              <div className="flight_multis_area_wrapper">
                                <div className="flight_search_left">
                                  <div className="flight_logo">
                                    {/* <img
                                      src="assets/img/common/biman_bangla.png"
                                      alt="img"
                                    /> */}
                                    {item.AirSegments[0].AirlineName}
                                    {item.AirSegments[0].FlightNumber}
                                    
                                  </div>
                                  <div className="flight_search_destination">
                                    <p>From</p>
                                    <h3>{item.AirSegments[0].Origen}</h3>
                                    <h6>JFK - John F. Kennedy International...</h6>
                                  </div>
                                </div>
                                <div className="flight_search_middel">
                                  <div className="flight_right_arrow">
                                    {/* <img
                                      src="assets/img/icon/right_arrow.png"
                                      alt="icon"
                                    /> */}
                                    <img src="assets/img/icon/right_arrow.png" alt="icon"/>
                                    <h6>Non-stop</h6>
                                    <p>01h 05minute </p>
                                  </div>
                                  <div className="flight_search_destination">
                                    <p>To</p>
                                    <h3>{item.AirSegments[0].Destination}</h3>
                                    <h6>LCY, London city airport </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flight_search_right">
                              <h5>
                                <del>9,560 Rs.</del>
                              </h5>
                              <h2>
                                {item.AirlineFare.BaseFare} Rs.<sup>*20% OFF</sup>
                              </h2>
                              <a
                                href="flight-booking-submission.html"
                                className="btn btn_theme btn_sm"
                              >
                                Book now
                              </a>
                              <p>*Discount applicable on some conditions</p>
                              <h6
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseExample"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                              >
                                Show more <i className="fas fa-chevron-down" />
                              </h6>
                            </div>
                          </div>
                          <div
                            className="flight_policy_refund collapse"
                            id="collapseExample"
                          >
                            <div className="flight_show_down_wrapper">
                              <div className="flight-shoe_dow_item">
                                <div className="airline-details">
                                  <div className="img">
                                    <img src="assets/img/icon/bg.png" alt="img" />
                                  </div>
                                  <span className="airlineName fw-500">
                                    Biman Bangladesh Airlines &nbsp; BG435
                                  </span>
                                  <span className="flightNumber">
                                    BOEING 737-800 - 738
                                  </span>
                                </div>
                                <div className="flight_inner_show_component">
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">DAC</span>
                                        <span className="time">15:00</span>
                                      </div>
                                      <p className="airport">
                                        Hazrat Shahjalal International Airport
                                      </p>
                                      <p className="date">7th Jun 2022</p>
                                    </div>
                                  </div>
                                  <div className="flight_duration">
                                    <div className="arrow_right" />
                                    <span>01h 15m</span>
                                  </div>
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">DAC</span>
                                        <span className="time">15:00</span>
                                      </div>
                                      <p className="airport">
                                        Hazrat Shahjalal International Airport
                                      </p>
                                      <p className="date">7th Jun 2022</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flight_refund_policy">
                                <div className="TabPanelInner flex_widht_less">
                                  <h4>Refund Policy</h4>
                                  <p className="fz12">
                                    1. Refund and Date Change are done as per the
                                    following policies.
                                  </p>
                                  <p className="fz12">
                                    2. Refund Amount= Refund Charge (as per airline
                                    policy + ShareTrip Convenience Fee).{" "}
                                  </p>
                                  <p className="fz12">
                                    3. Date Change Amount= Date Change Fee (as per
                                    Airline Policy + ShareTrip Convenience Fee).
                                  </p>
                                </div>
                                <div className="TabPanelInner">
                                  <h4>Baggage</h4>
                                  <div className="flight_info_taable">
                                    <h3>DAC-SPD</h3>
                                    <p>
                                      <span>20KG /</span> person
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flight_show_down_wrapper">
                              <div className="flight-shoe_dow_item">
                                <div className="airline-details">
                                  <div className="img">
                                    <img src="assets/img/icon/bg.png" alt="img" />
                                  </div>
                                  <span className="airlineName fw-500">
                                    Biman Bangladesh Airlines &nbsp; BG435
                                  </span>
                                  <span className="flightNumber">
                                    BOEING 737-800 - 738
                                  </span>
                                </div>
                                <div className="flight_inner_show_component">
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">DAC</span>
                                        <span className="time">15:00</span>
                                      </div>
                                      <p className="airport">
                                        Hazrat Shahjalal International Airport
                                      </p>
                                      <p className="date">7th Jun 2022</p>
                                    </div>
                                  </div>
                                  <div className="flight_duration">
                                    <div className="arrow_right" />
                                    <span>01h 15m</span>
                                  </div>
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">DAC</span>
                                        <span className="time">15:00</span>
                                      </div>
                                      <p className="airport">
                                        Hazrat Shahjalal International Airport
                                      </p>
                                      <p className="date">7th Jun 2022</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flight_refund_policy">
                                <div className="TabPanelInner flex_widht_less">
                                  <h4>Refund Policy</h4>
                                  <p className="fz12">
                                    1. Refund and Date Change are done as per the
                                    following policies.
                                  </p>
                                  <p className="fz12">
                                    2. Refund Amount= Refund Charge (as per airline
                                    policy + ShareTrip Convenience Fee).{" "}
                                  </p>
                                  <p className="fz12">
                                    3. Date Change Amount= Date Change Fee (as per
                                    Airline Policy + ShareTrip Convenience Fee).
                                  </p>
                                </div>
                                <div className="TabPanelInner">
                                  <h4>Baggage</h4>
                                  <div className="flight_info_taable">
                                    <h3>DAC-SPD</h3>
                                    <p>
                                      <span>20KG /</span> person
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flight_show_down_wrapper">
                              <div className="flight-shoe_dow_item">
                                <div className="airline-details">
                                  <div className="img">
                                    <img src="assets/img/icon/bg.png" alt="img" />
                                  </div>
                                  <span className="airlineName fw-500">
                                    Biman Bangladesh Airlines &nbsp; BG435
                                  </span>
                                  <span className="flightNumber">
                                    BOEING 737-800 - 738
                                  </span>
                                </div>
                                <div className="flight_inner_show_component">
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">DAC</span>
                                        <span className="time">15:00</span>
                                      </div>
                                      <p className="airport">
                                        Hazrat Shahjalal International Airport
                                      </p>
                                      <p className="date">7th Jun 2022</p>
                                    </div>
                                  </div>
                                  <div className="flight_duration">
                                    <div className="arrow_right" />
                                    <span>01h 15m</span>
                                  </div>
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">DAC</span>
                                        <span className="time">15:00</span>
                                      </div>
                                      <p className="airport">
                                        Hazrat Shahjalal International Airport
                                      </p>
                                      <p className="date">7th Jun 2022</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flight_refund_policy">
                                <div className="TabPanelInner flex_widht_less">
                                  <h4>Refund Policy</h4>
                                  <p className="fz12">
                                    1. Refund and Date Change are done as per the
                                    following policies.
                                  </p>
                                  <p className="fz12">
                                    2. Refund Amount= Refund Charge (as per airline
                                    policy + ShareTrip Convenience Fee).{" "}
                                  </p>
                                  <p className="fz12">
                                    3. Date Change Amount= Date Change Fee (as per
                                    Airline Policy + ShareTrip Convenience Fee).
                                  </p>
                                </div>
                                <div className="TabPanelInner">
                                  <h4>Baggage</h4>
                                  <div className="flight_info_taable">
                                    <h3>DAC-SPD</h3>
                                    <p>
                                      <span>20KG /</span> person
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                           
                      
                      </div>
                      {/* <div className="load_more_flight">
                        <button className="btn btn_md">
                          <i className="fas fa-spinner" /> Load more..
                        </button>
                      </div> */}
                    </div> 
                    )
                })}
            
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Cta Area */}
  <section id="cta_area">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-7">
          <div className="cta_left">
            <div className="cta_icon">
              <img src="assets/img/common/email.png" alt="icon" />
            </div>
            <div className="cta_content">
              <h4>Get the latest news and offers</h4>
              <h2>Subscribe to our newsletter</h2>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="cat_form">
            <form id="cta_form_wrappper">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your mail address"
                />
                <button className="btn btn_theme btn_md" type="button">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</>
<Footer />
    </>
  )
}
