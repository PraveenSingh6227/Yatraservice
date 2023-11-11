import Footer from '@/component/Footer'
import Header from '@/component/Header'
import SearchAndFilterComponent from '@/component/SearchAndFilterComponent'
import { useEffect, useState } from 'react'
import * as moment from 'moment'
import { useRouter } from 'next/router'
import LoadingSpinner from "../component/Loader";
import { useToasts } from 'react-toast-notifications';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'



export default function Searchresult() {
  const router = useRouter();
  const { addToast } = useToasts();
  const [Contracts, setContracts] = useState([]);
  const [totalContract, setTotalContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const [oneWayFrom, setOneWayFrom] = useState("DEL");
  const [oneWayFromData, setOneWayFromData] = useState("");
  const [oneWayTo, setOneWayTo] = useState("BOM");
  const [oneWayToData, setOneWayToData] = useState("");
  const [oneWayTravelDate, setOneWayTravelDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [roundTripReturnDate, setRoundTripReturnDate] = useState(moment(new Date()).add(1,'day').format('YYYY-MM-DD'));
  const [currentDate, setCurrentDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [oneWayTravelTotalPassenger, setOneWayTravelTotalPassenger] = useState(0);
  const [oneWayTravelAdult, setOneWayTravelAdult] = useState(0);
  const [oneWayTravelChildren, setOneWayTravelChildren] = useState(0);
  const [oneWayTravelInfant, setOneWayTravelInfant] = useState(0);
  const [oneWayTravelCabinClass, setOneWayTravelCabinClass] = useState("Economy");
  const [bookingKey, setBookingKey] = useState("");
  const [airportData, setAirportData] = useState([]);
  const [oneWayTravelDay, setOneWayTravelDay] = useState("");
  const [roundTripReturnDay, setRoundTripReturnDay] = useState("");
  const [tripType, setTripType] = useState(0);



  useEffect(() => {
    const date = moment(new Date()).format('YYYY-MM-DD')
    setOneWayTravelDate(date)
    setOneWayTravelDay(moment(new Date()).format('dddd'))
    setRoundTripReturnDay(moment(new Date()).add(1,'day').format('dddd'))
    setCurrentDate(date)
    setReturnDate(moment(new Date()).add(1,'day').format('YYYY-MM-DD'))
    handlePassengerCount('adult', 'add')
    fetchAirports()
    if(router.query){
      searchNewFlights(router.query)
    }
  }, [])
  useEffect(() => {
    if(Object.keys(router.query).length > 0){
      setOneWayFrom(router.query.oneWayFrom)
      setOneWayFromData(router.query.oneWayFromData)
      setOneWayTo(router.query.oneWayTo)
      setOneWayToData(router.query.oneWayToData)
      setOneWayTravelDate(router.query.oneWayTravelDate)
      setOneWayTravelDay(moment(router.query.oneWayTravelDate).format('dddd'))
      setRoundTripReturnDay(moment(router.query.returnTravelDate).add(1,'day').format('dddd'))
      setOneWayTravelTotalPassenger(router.query.oneWayTravelTotalPassenger)
      setOneWayTravelAdult(router.query.oneWayTravelAdult)
      setOneWayTravelChildren(router.query.oneWayTravelChildren)
      setOneWayTravelInfant(router.query.oneWayTravelInfant)
      setOneWayTravelCabinClass(router.query.oneWayTravelCabinClass)
      setTripType(router.query.tripType)
    }
  }, [router.query]);


  const fetchAirports = async () => {
    let bodyFormData = new FormData();
    bodyFormData.append("action", "get_airport");
    await fetch("https://vrcwebsolutions.com/yatra/api/api.php", {
      method: 'POST',
      body: bodyFormData
    }).then((response) => response.json()).then((response) => {
      if (response !== null) {
        setAirportData(response.data)
      }
    })
  }

  const handlePassengerCount = (passengerType, operation) => {
    if (passengerType === 'adult' && operation === 'add') {
      let calculation = 0
      calculation = parseInt(oneWayTravelAdult) + 1;
      setOneWayTravelAdult(calculation);
      setOneWayTravelTotalPassenger(calculation + parseInt(oneWayTravelChildren) + parseInt(oneWayTravelInfant))
    }
    if (passengerType === 'adult' && operation === 'substract') {
      let calculation = 0;
      calculation = parseInt(oneWayTravelAdult) - 1
      if (calculation > -1) {
        setOneWayTravelAdult(calculation)
        setOneWayTravelTotalPassenger(calculation + parseInt(oneWayTravelChildren) + parseInt(oneWayTravelInfant))
      }
    }

    if (passengerType === 'children' && operation === 'add') {
      let calculation = 0;
      calculation = parseInt(oneWayTravelChildren) + 1
      setOneWayTravelChildren(calculation)
      setOneWayTravelTotalPassenger(parseInt(oneWayTravelAdult) + calculation + parseInt(oneWayTravelInfant))
    }
    if (passengerType === 'children' && operation === 'substract') {
      let calculation = 0;
      calculation = parseInt(oneWayTravelChildren) - 1
      if (calculation > -1) {
        setOneWayTravelChildren(calculation)
        setOneWayTravelTotalPassenger(parseInt(oneWayTravelAdult) + calculation + parseInt(oneWayTravelInfant))
      }
    }

    if (passengerType === 'infant' && operation === 'add') {
      let calculation = 0;
      calculation = parseInt(oneWayTravelInfant) + 1
      setOneWayTravelInfant(calculation)
      setOneWayTravelTotalPassenger(parseInt(oneWayTravelAdult) + parseInt(oneWayTravelChildren) + calculation)
    }
    if (passengerType === 'infant' && operation === 'substract') {
      let calculation = 0;
      calculation = parseInt(oneWayTravelInfant) - 1
      if (calculation > -1) {
        setOneWayTravelInfant(calculation)
        setOneWayTravelTotalPassenger(parseInt(oneWayTravelAdult) + parseInt(oneWayTravelChildren) + calculation)
      }
    }
  }

  const handlePassengerClass = (passengerClass) => {
    setOneWayTravelCabinClass(passengerClass)
  }


  async function searchFlights() {
    setIsLoading(true)
    if (oneWayFrom === '') {
      addToast("Please enter the source airport name", { appearance: 'error' });
      return
    }
    if (oneWayTo === '') {
      addToast("Please enter the destination airport name", { appearance: 'error' });
      return
    }
    let bodyFormData = new FormData();
    let travelClass = 0;
    if(oneWayTravelCabinClass==='Economy'){
      travelClass=0
    }else if(oneWayTravelCabinClass==='Business'){
      travelClass=1
    }else if(oneWayTravelCabinClass==='First Class'){
      travelClass=3
    }
    bodyFormData.append("action", "get_flights");
    bodyFormData.append("AdultCount", oneWayTravelAdult);
    bodyFormData.append("ChildCount", oneWayTravelChildren);
    bodyFormData.append("InfantCount", oneWayTravelInfant);
    bodyFormData.append("PreferredAirlines", null);
    bodyFormData.append("Source", oneWayFrom);
    bodyFormData.append("Destination", oneWayTo);
    bodyFormData.append("TravelDate", moment(oneWayTravelDate).format('YYYY-MM-DD'));
    bodyFormData.append("ReturnDate", moment(returnDate).format('YYYY-MM-DD'));
    bodyFormData.append("TripType", tripType);
    bodyFormData.append("TypeOfClass", travelClass);

    await fetch("https://vrcwebsolutions.com/yatra/api/generateToken.php", {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(async (response) => {
        bodyFormData.append("APIToken", response.ApiToken);
        await fetch("https://vrcwebsolutions.com/yatra/api/api.php", {
          method: 'POST',
          body: bodyFormData
        }).then((response) => response.json()).then((response) => {
          if(response!==null){
            if(response.Status===0){
              addToast("Fly24 API response : "+response.Error.ErrorDesc, { appearance: 'error' });
            }else{
              let result = response.Contracts.reduce(function (r, a) {
                r[a.AirSegments[0].FlightNumber] = r[a.AirSegments[0].FlightNumber] || [];
                r[a.AirSegments[0].FlightNumber].push(a);
                return r;
            }, Object.create(null));

            console.log('response--->',response)

            // const mapped = {};
            // response.Contracts.map(function (item, index){
            //   if (items.FlightNumber in mapped) return mapped[items.FlightNumber].push(item);           
            //   mapped[items.FlightNumber] = [item];
            //   item.AirSegments.forEach(items => {
            //     if (items.FlightNumber in mapped) return mapped[items.FlightNumber].push(item);
              
            //     mapped[items.FlightNumber] = [item];
            //   });
            // })

            console.log('mapped--->',result)
              setContracts(result)
              setTotalContracts(result)
              setBookingKey(response.BookingKey)
            }
          }
          setIsLoading(false)
        })
      }
      )

  }

  async function searchNewFlights(params) {
    setIsLoading(true)
    let bodyFormData = new FormData();
    let travelClass = 0;
    if(params.oneWayTravelCabinClass==='Economy'){
      travelClass=0
    }else if(params.oneWayTravelCabinClass==='Business'){
      travelClass=1
    }else if(params.oneWayTravelCabinClass==='First Class'){
      travelClass=3
    }
    bodyFormData.append("action", "get_flights");
    bodyFormData.append("AdultCount", params.oneWayTravelAdult);
    bodyFormData.append("ChildCount", params.oneWayTravelChildren);
    bodyFormData.append("InfantCount", params.oneWayTravelInfant);
    bodyFormData.append("PreferredAirlines", null);
    bodyFormData.append("Source", params.oneWayFrom);
    bodyFormData.append("Destination", params.oneWayTo);
    bodyFormData.append("TravelDate", moment(params.oneWayTravelDate).format('YYYY-MM-DD'));
    if(params.tripType==1){
     bodyFormData.append("ReturnDate", moment(params.oneWayReturnDate).format('YYYY-MM-DD'));
    }
    bodyFormData.append("TripType", params.tripType);
    bodyFormData.append("TypeOfClass", travelClass);

    await fetch("https://vrcwebsolutions.com/yatra/api/generateToken.php", {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(async (response) => {
        bodyFormData.append("APIToken", response.ApiToken);
        await fetch("https://vrcwebsolutions.com/yatra/api/api.php", {
          method: 'POST',
          body: bodyFormData
        }).then((response) => response.json()).then((response) => {
          if(response===null){
            addToast("Facing some communication error, please try again later.", { appearance: 'error' });
            setIsLoading(false)
          }else{
            if(response.Status===0){
              addToast("Fly24 API response : "+response.Error.ErrorDesc, { appearance: 'error' });
            }else{
              let result = response.Contracts.reduce(function (r, a) {
                r[a.AirSegments[0].FlightNumber] = r[a.AirSegments[0].FlightNumber] || [];
                r[a.AirSegments[0].FlightNumber].push(a);
                return r;
            }, Object.create(null));
            console.log(result)
              setContracts(result)
              setTotalContracts(result)
              setBookingKey(response.BookingKey)
              setIsLoading(false)
            }   
          }
          setIsLoading(false)
        })
      }
      )

  }

  

  const handleOnSearchOneWayFrom = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    setOneWayFrom(string)
    console.log(string, results)
  }

  const handleOnSearchOneWayTo = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    setOneWayTo(string)
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelectOneWayFrom = (item) => {
    // the item selected
    setOneWayFrom(item.code)
    setOneWayFromData(item.name)
    console.log(item)
  }

  const handleOnSelectOneWayTo = (item) => {
    // the item selected
    setOneWayTo(item.code)
    setOneWayToData(item.name)
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  const clearOnewayFromResult = (item) => {
    setOneWayFrom("")
    setOneWayFromData("")
  }

  const clearOnewayToResult = (item) => {
    setOneWayTo("")
    setOneWayToData("")
  }

  return (
    <>
    {isLoading ? (
      <LoadingSpinner />
    ):(          
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
                                  onClick={()=>setTripType(0)}
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
                                  onClick={()=>setTripType(1)}
                                >
                                  Roundtrip
                                </button>
                              </li>
                              {/* <li className="nav-item" role="presentation">
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
                              </li> */}
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
                                        {/* <input type="text" defaultValue={oneWayFrom} onChange={(event)=> setOneWayFrom(event.target.value)} /> */}
                                        <div style={{ width: '80%', backgroundColor: '#f4ecff' }}>
                                            {<ReactSearchAutocomplete
                                              items={airportData}
                                              onSearch={handleOnSearchOneWayFrom}
                                              onHover={handleOnHover}
                                              onSelect={handleOnSelectOneWayFrom}
                                              onFocus={handleOnFocus}
                                              autoFocus
                                              formatResult={formatResult}
                                              onClear={clearOnewayFromResult}
                                              value="fghcghc"
                                            // styling={{borderRadius:'0',border:'none'}}
                                            />}
                                          </div>
                                          <span>
                                            {oneWayFromData}
                                          </span>
                                        <div className="plan_icon_posation">
                                          <i className="fas fa-plane-departure" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                      <div className="flight_Search_boxed">
                                        <p>To</p>
                                        {/* <input type="text" onChange={(event)=> setOneWayTo(event.target.value)} defaultValue={oneWayTo} /> */}
                                        <div style={{ width: '80%', backgroundColor: '#f4ecff' }}>
                                            {<ReactSearchAutocomplete
                                              items={airportData}
                                              onSearch={handleOnSearchOneWayTo}
                                              onHover={handleOnHover}
                                              onSelect={handleOnSelectOneWayTo}
                                              onFocus={handleOnFocus}
                                              autoFocus
                                              formatResult={formatResult}
                                              onClear={clearOnewayToResult}
                                              styling={{zIndex:'10000000'}}
                                            />}
                                          </div>
                                          <span>{oneWayToData}</span>
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
                                              defaultValue={oneWayTravelDate}
                                              onChange={(event)=> {setOneWayTravelDate(event.target.value); setOneWayTravelDay(moment(event.target.value).format('dddd'))}}
                                              min={currentDate}
                                            />
                                            <span>{oneWayTravelDay}</span>
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
                                            {oneWayTravelTotalPassenger} Passenger
                                          </button>
                                          <div
                                            className="dropdown-menu dropdown_passenger_info"
                                          >
                                            <div className="traveller-calulate-persons">
                                              <div className="passengers">
                                                <h6>Passengers</h6>
                                                <div className="passengers-types">
                                                  <div className="passengers-type">
                                                    <div className="text">
                                                      <span className="count pcount">
                                                        {oneWayTravelAdult}
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
                                                        onClick={(event) => { event.preventDefault(); event.stopPropagation(); handlePassengerCount('adult', 'add') }}
                                                      >
                                                        <i className="fas fa-plus" />
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="btn-subtract"
                                                        onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerCount('adult', 'substract') }}
                                                      >
                                                        <i className="fas fa-minus" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div className="passengers-type">
                                                    <div className="text">
                                                      <span className="count ccount">
                                                        {oneWayTravelChildren}
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
                                                        onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerCount('children', 'add') }}
                                                      >
                                                        <i className="fas fa-plus" />
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="btn-subtract-c"
                                                        onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerCount('children', 'substract') }}
                                                      >
                                                        <i className="fas fa-minus" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div className="passengers-type">
                                                    <div className="text">
                                                      <span className="count incount">
                                                        {oneWayTravelInfant}
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
                                                        onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerCount('infant', 'add') }}
                                                      >
                                                        <i className="fas fa-plus" />
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="btn-subtract-in"
                                                        onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerCount('infant', 'substract') }}
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
                                                    onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerClass('Economy') }}
                                                    className={(oneWayTravelCabinClass === 'Economy') ? 'label-select-btn active' : 'label-select-btn'}
                                                  >
                                                    <span className="muiButton-label">
                                                      Economy
                                                    </span>
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerClass('Business') }}
                                                    className={(oneWayTravelCabinClass === 'Business') ? 'label-select-btn active' : 'label-select-btn'}
                                                  >
                                                    <span className="muiButton-label">
                                                      Business
                                                    </span>
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerClass('First Class') }}
                                                    className={(oneWayTravelCabinClass === 'First Class') ? 'label-select-btn active' : 'label-select-btn'}
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
                                        <span>{oneWayTravelCabinClass}</span>
                                      </div>
                                    </div>
                                    <div className="top_form_search_button">
                                      <button
                                        onClick={(event) => { event.preventDefault(); event.stopPropagation(); searchFlights() }}
                                        className="btn btn_theme btn_md"
                                      >
                                        Search
                                      </button>
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
                                    <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                      <div className="flight_Search_boxed">
                                        <p>From</p>
                                        {/* <input type="text" defaultValue={oneWayFrom} onChange={(event)=> setOneWayFrom(event.target.value)} /> */}
                                        <div style={{ width: '80%', backgroundColor: '#f4ecff' }}>
                                            {<ReactSearchAutocomplete
                                              items={airportData}
                                              onSearch={handleOnSearchOneWayFrom}
                                              onHover={handleOnHover}
                                              onSelect={handleOnSelectOneWayFrom}
                                              onFocus={handleOnFocus}
                                              autoFocus
                                              formatResult={formatResult}
                                              onClear={clearOnewayFromResult}
                                            // styling={{borderRadius:'0',border:'none'}}
                                            />}
                                          </div>
                                          <span>
                                            {oneWayFromData}
                                          </span>
                                        <div className="plan_icon_posation">
                                          <i className="fas fa-plane-departure" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                      <div className="flight_Search_boxed">
                                        <p>To</p>
                                        {/* <input type="text" onChange={(event)=> setOneWayTo(event.target.value)} defaultValue={oneWayTo} /> */}
                                        <div style={{ width: '80%', backgroundColor: '#f4ecff' }}>
                                            {<ReactSearchAutocomplete
                                              items={airportData}
                                              onSearch={handleOnSearchOneWayTo}
                                              onHover={handleOnHover}
                                              onSelect={handleOnSelectOneWayTo}
                                              onFocus={handleOnFocus}
                                              autoFocus
                                              formatResult={formatResult}
                                              onClear={clearOnewayToResult}
                                              styling={{zIndex:'10000000'}}
                                            />}
                                          </div>
                                          <span>{oneWayToData}</span>
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
                                              defaultValue={oneWayTravelDate}
                                              onChange={(event)=>{console.log('event.target.value->',event.target.value,moment(event.target.value).add(1,'day').format('YYYY-MM-DD')); setOneWayTravelDate(event.target.value); setOneWayTravelDay(moment(event.target.value).format('dddd')); setReturnDate(moment(event.target.value).add(1,'day').format('YYYY-MM-DD'));setRoundTripReturnDay(moment(event.target.value).add(1,'day').format('dddd'));setRoundTripReturnDate(moment(event.target.value).add(1,'day').format('YYYY-MM-DD'))}}
                                              min={currentDate}
                                            />
                                            <span>{oneWayTravelDay}</span>
                                          </div>
                                          <div className="Journey_date">
                                            <p>Return date</p>
                                            <input
                                              type="date"
                                              value={roundTripReturnDate}
                                              defaultValue={roundTripReturnDate}
                                              onChange={(event)=> {setRoundTripReturnDate(event.target.value);setRoundTripReturnDay(moment(event.target.value).format('dddd'))}}
                                              min={returnDate}
                                            />
                                            <span>{roundTripReturnDay}</span>
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
                                            {oneWayTravelTotalPassenger} Passenger
                                          </button>
                                          <div
                                            className="dropdown-menu dropdown_passenger_info"
                                          >
                                            <div className="traveller-calulate-persons">
                                              <div className="passengers">
                                                <h6>Passengers</h6>
                                                <div className="passengers-types">
                                                  <div className="passengers-type">
                                                    <div className="text">
                                                      <span className="count pcount">
                                                        {oneWayTravelAdult}
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
                                                        onClick={(event) => { event.preventDefault(); event.stopPropagation(); handlePassengerCount('adult', 'add') }}
                                                      >
                                                        <i className="fas fa-plus" />
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="btn-subtract"
                                                        onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerCount('adult', 'substract') }}
                                                      >
                                                        <i className="fas fa-minus" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div className="passengers-type">
                                                    <div className="text">
                                                      <span className="count ccount">
                                                        {oneWayTravelChildren}
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
                                                        onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerCount('children', 'add') }}
                                                      >
                                                        <i className="fas fa-plus" />
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="btn-subtract-c"
                                                        onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerCount('children', 'substract') }}
                                                      >
                                                        <i className="fas fa-minus" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div className="passengers-type">
                                                    <div className="text">
                                                      <span className="count incount">
                                                        {oneWayTravelInfant}
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
                                                        onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerCount('infant', 'add') }}
                                                      >
                                                        <i className="fas fa-plus" />
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="btn-subtract-in"
                                                        onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerCount('infant', 'substract') }}
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
                                                    onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerClass('Economy') }}
                                                    className={(oneWayTravelCabinClass === 'Economy') ? 'label-select-btn active' : 'label-select-btn'}
                                                  >
                                                    <span className="muiButton-label">
                                                      Economy
                                                    </span>
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerClass('Business') }}
                                                    className={(oneWayTravelCabinClass === 'Business') ? 'label-select-btn active' : 'label-select-btn'}
                                                  >
                                                    <span className="muiButton-label">
                                                      Business
                                                    </span>
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerClass('First Class') }}
                                                    className={(oneWayTravelCabinClass === 'First Class') ? 'label-select-btn active' : 'label-select-btn'}
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
                                        <span>{oneWayTravelCabinClass}</span>
                                      </div>
                                    </div>
                                    <div className="top_form_search_button">
                                      <button
                                        onClick={(event) => { event.preventDefault(); event.stopPropagation(); searchFlights() }}
                                        className="btn btn_theme btn_md"
                                      >
                                        Search
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div
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
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Flight Search Areas */}
        <SearchAndFilterComponent contractData={Contracts} totalContractData={totalContract} bookingKey={bookingKey} adultCount={oneWayTravelAdult} childCount={oneWayTravelChildren} InfantCount={oneWayTravelInfant} />
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
    )}
    </>
  )
}
