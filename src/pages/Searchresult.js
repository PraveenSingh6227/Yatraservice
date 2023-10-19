import Footer from '@/component/Footer'
import Header from '@/component/Header'
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
  const [currentDate, setCurrentDate] = useState("");
  const [oneWayTravelTotalPassenger, setOneWayTravelTotalPassenger] = useState(0);
  const [oneWayTravelAdult, setOneWayTravelAdult] = useState(0);
  const [oneWayTravelChildren, setOneWayTravelChildren] = useState(0);
  const [oneWayTravelInfant, setOneWayTravelInfant] = useState(0);
  const [oneWayTravelCabinClass, setOneWayTravelCabinClass] = useState("Economy");
  const [bookingKey, setBookingKey] = useState("");
  const [airportData, setAirportData] = useState([]);
  const [oneWayTravelDay, setOneWayTravelDay] = useState("");

  //filter
  const [priceSlider, setPriceSlider] = useState(80000);
  const [airStops, setAirStops] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [refundable, setRefundable] = useState([]);

  useEffect(() => {
    const date = moment(new Date()).format('YYYY-MM-DD')
    setOneWayTravelDate(date)
    setOneWayTravelDay(moment(new Date()).format('dddd'))
    setCurrentDate(date)
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
      setOneWayTravelTotalPassenger(router.query.oneWayTravelTotalPassenger)
      setOneWayTravelAdult(router.query.oneWayTravelAdult)
      setOneWayTravelChildren(router.query.oneWayTravelChildren)
      setOneWayTravelInfant(router.query.oneWayTravelInfant)
      setOneWayTravelCabinClass(router.query.oneWayTravelCabinClass)
    }
  }, [router.query]);

  useEffect(()=>{
    handleFilter()
  },[priceSlider,airStops,airlines,refundable])

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
      calculation = oneWayTravelAdult + 1;
      setOneWayTravelAdult(calculation);
      setOneWayTravelTotalPassenger(calculation + oneWayTravelChildren + oneWayTravelInfant)
    }
    if (passengerType === 'adult' && operation === 'substract') {
      let calculation = 0;
      calculation = oneWayTravelAdult - 1
      if (calculation > -1) {
        setOneWayTravelAdult(calculation)
        setOneWayTravelTotalPassenger(calculation + oneWayTravelChildren + oneWayTravelInfant)
      }
    }

    if (passengerType === 'children' && operation === 'add') {
      let calculation = 0;
      calculation = oneWayTravelChildren + 1
      setOneWayTravelChildren(calculation)
      setOneWayTravelTotalPassenger(oneWayTravelAdult + calculation + oneWayTravelInfant)
    }
    if (passengerType === 'children' && operation === 'substract') {
      let calculation = 0;
      calculation = oneWayTravelChildren - 1
      if (calculation > -1) {
        setOneWayTravelChildren(calculation)
        setOneWayTravelTotalPassenger(oneWayTravelAdult + calculation + oneWayTravelInfant)
      }
    }

    if (passengerType === 'infant' && operation === 'add') {
      let calculation = 0;
      calculation = oneWayTravelInfant + 1
      setOneWayTravelInfant(calculation)
      setOneWayTravelTotalPassenger(oneWayTravelAdult + oneWayTravelChildren + calculation)
    }
    if (passengerType === 'infant' && operation === 'substract') {
      let calculation = 0;
      calculation = oneWayTravelInfant - 1
      if (calculation > -1) {
        setOneWayTravelInfant(calculation)
        setOneWayTravelTotalPassenger(oneWayTravelAdult + oneWayTravelChildren + calculation)
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
    bodyFormData.append("TripType", "0");
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
            setContracts(response.Contracts)
            setTotalContracts(response.Contracts)
            setBookingKey(response.BookingKey)
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
    bodyFormData.append("TripType", "0");
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
            setContracts(response.Contracts)
            setTotalContracts(response.Contracts)
            setIsLoading(false)
          }
        })
      }
      )

  }

  const goToBooking = (contractData)=>{
    router.push({
      pathname: '/bookingPage',
      query: { 
        contractData: JSON.stringify(contractData),
        bookingKey: bookingKey,
        adultCount: adultCount,
        childCount: childCount,
        InfantCount: InfantCount
      }
    }, '/bookingPage');
  }

  const handlePriceSlider = (event)=>{
    setPriceSlider(event.target.value)
  }

  const handleStopFilter = (event)=>{
    let data = []
    if (event.target.checked) {
      data = [...airStops, parseInt(event.target.value)]
      setAirStops(data)
    } else {
      data = airStops.filter((filterTag) => filterTag !== parseInt(event.target.value))
      setAirStops(data)
    }
    
  }

  const handleAirlinesFilter = (event)=>{
    let data = []
    if (event.target.checked) {
      data = [...airlines, event.target.value]
      setAirlines(data)
    } else {
      data = airlines.filter((filterTag) => filterTag !== event.target.value)
      setAirlines(data)
    }
    
  }

  const handleRefundable = (event)=>{
    let data = []
    if (event.target.checked) {
      data = [...refundable, event.target.value]
      setRefundable(data)
    } else {
      data = refundable.filter((filterTag) => filterTag !== event.target.value)
      setRefundable(data)
    }
    
  }

  const handleFilter = ()=>{
    let filter=[]
    if(totalContract!==null && totalContract.length>0){
      filter = totalContract.filter((item) =>  item.AirlineFare.BaseFare <= priceSlider);
    }

    if(airStops.length>0 && filter.length>0){
      filter = filter.filter(item => {
        return airStops.includes(item.AirSegments.length);
      });
    }else if(airStops.length>0 && filter.length===0 && totalContract!==null && totalContract.length>0){
      filter = totalContract.filter(item => {
        return airStops.includes(item.AirSegments.length);
      });
    }  

    if(airlines.length>0 && filter.length>0){
      filter = filter.filter(item => {
        return airlines.includes(item.AirSegments[0].AirlineCode);
      });
    }else if(airlines.length>0 && filter.length===0 && totalContract!==null && totalContract.length>0){
      filter = totalContract.filter(item => {
        return airStops.includes(item.AirSegments[0].AirlineCode);
      });
    } 
    if(refundable.length>0 && filter.length>0){
      filter = filter.filter(item => {
        return refundable.includes(String(item.Refundable));
      });
    }else if(refundable.length>0 && filter.length===0 && totalContract!==null && totalContract.length>0){
      filter = totalContract.filter(item => {
        return airStops.includes(String(item.Refundable));
      });
    } 
    setContracts(filter);
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
                                              onChange={(event)=> setOneWayTravelDate(event.target.value)}
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
                  <h2>{Contracts!==null ? Object.keys(Contracts).length : 0} tours found</h2>
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
                      <input type="range"  min="2000" max="80000" value={priceSlider} onChange={(event)=>{handlePriceSlider(event)}} style={{width:'100%'}} />
                      <p>Value: <span id="demo">Rs. {priceSlider}</span></p>
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
                          value={2}
                          onChange={(event)=>{handleStopFilter(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaultf1"
                        >
                          <span className="area_flex_one">
                            <span>1 stop</span>
                            {/* <span>20</span> */}
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDefaultf2"
                          value={3}
                          onChange={(event)=>{handleStopFilter(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaultf2"
                        >
                          <span className="area_flex_one">
                            <span>2 stop</span>
                            {/* <span>16</span> */}
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDefaultf4"
                          value={1}
                          onChange={(event)=>{handleStopFilter(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaultf4"
                        >
                          <span className="area_flex_one">
                            <span>Non-stop</span>
                            {/* <span>22</span> */}
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
                          value={"AI"}
                          id="flexCheckDefaults2"
                          onChange={(event)=>{handleAirlinesFilter(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaults2"
                        >
                          <span className="area_flex_one">
                            <span>Air India</span>
                            {/* <span>14</span> */}
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDefaults3"
                          value={"IX"}
                          onChange={(event)=>{handleAirlinesFilter(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaults3"
                        >
                          <span className="area_flex_one">
                            <span>Air India Express</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDefaults4"
                          value={"I5"}
                          onChange={(event)=>{handleAirlinesFilter(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaults4"
                        >
                          <span className="area_flex_one">
                            <span>Air Asia</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDefaults5"
                          value={"G8"}
                          onChange={(event)=>{handleAirlinesFilter(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaults5"
                        >
                          <span className="area_flex_one">
                            <span>Go First</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDefaults5"
                          value={"6E"}
                          onChange={(event)=>{handleAirlinesFilter(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaults5"
                        >
                          <span className="area_flex_one">
                            <span>IndiGo</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDefaults1"
                          onChange={(event)=>{handleAirlinesFilter(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaults1"
                        >
                          <span className="area_flex_one">
                            <span>SpiceJet</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDefaults5"
                          value={"2T"}
                          onChange={(event)=>{handleAirlinesFilter(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaults5"
                        >
                          <span className="area_flex_one">
                            <span>TruJet</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          value={"UK"}
                          id="flexCheckDefaults5"
                          onChange={(event)=>{handleAirlinesFilter(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaults5"
                        >
                          <span className="area_flex_one">
                            <span>Vistara</span>
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
                          value={"true"}
                          onChange={(event)=>{handleRefundable(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaultp1"
                        >
                          <span className="area_flex_one">
                            <span>Yes</span>
                            {/* <span>17</span> */}
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDefaultp2"
                          value={"false"}
                          onChange={(event)=>{handleRefundable(event)}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaultp2"
                        >
                          <span className="area_flex_one">
                            <span>No</span>
                            {/* <span>14</span> */}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  { (Contracts!==null && Object.keys(Contracts).length > 0) && Contracts.map((item,index) => {
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

                                    </div>
                                    <div className="flight_search_destination">
                                      <p>From</p>
                                      <h3>{item.AirSegments[0].Origen}</h3>
                                      <h6>{item.AirSegments[0].Origen} - {item.AirSegments[0].sourceAirportName}</h6>
                                    </div>
                                  </div>
                                  <div className="flight_search_middel">
                                    <div className="flight_right_arrow">
                                      {/* <img
                                      src="assets/img/icon/right_arrow.png"
                                      alt="icon"
                                    /> */}
                                      <img src="assets/img/icon/right_arrow.png" alt="icon" />
                                      <h6>{item.AirSegments.length === 1 ? 'Non-stop' : (item.AirSegments.length-1)+' Stop(s)'}</h6>
                                      {/* <p>{item.AirSegments[0].Duration} </p> */}
                                      <p>{moment(new Date(item.AirSegments[0].DepartureDateTime)).format('h:mm a')}-{moment(new Date(item.AirSegments[item.AirSegments.length-1].ArrivalDateTime)).format('h:mm a')}</p>
                                      {item.AirSegments.length > 1 &&( <p>{item.AirSegments.length > 1 && 'via '+item.AirSegments[0].destinationAirportName}</p>)}
                                    </div>
                                    <div className="flight_search_destination">
                                      <p>To</p>
                                      <h3>{item.AirSegments[item.AirSegments.length-1].Destination}</h3>
                                      <h6>{item.AirSegments[item.AirSegments.length-1].Destination} - {item.AirSegments[item.AirSegments.length-1].destinationAirportName}</h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flight_search_right">
                                {/* <h5>
                                  <del>9,560 Rs.</del>
                                </h5> */}
                                {/* <h2>
                                  {item.AirlineFare.BaseFare} Rs.<sup>*20% OFF</sup>
                                </h2> */}
                                <h3>
                                  Rs. {item.AirlineFare.BaseFare} 
                                </h3>
                                <button
                                  onClick={()=>goToBooking(Contracts[index])}
                                  className="btn btn_theme btn_sm"
                                >
                                  Book now
                                </button>
                                {/* <p>*Discount applicable on some conditions</p> */}
                                {/* <h6
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseExample"
                                  aria-expanded="false"
                                  aria-controls="collapseExample"
                                >
                                  Show more <i className="fas fa-chevron-down" />
                                </h6> */}
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
    )}
    </>
  )
}
