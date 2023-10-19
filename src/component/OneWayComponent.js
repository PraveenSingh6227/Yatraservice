import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import { useRouter } from 'next/router'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useToasts } from 'react-toast-notifications';
export default function OneWayComponent (){
    const { addToast } = useToasts();
    const [oneWayFrom, setOneWayFrom] = useState("");
    const [oneWayFromData, setOneWayFromData] = useState("");
    const [oneWayTo, setOneWayTo] = useState("");
    const [oneWayToData, setOneWayToData] = useState("");
    const [oneWayTravelDate, setOneWayTravelDate] = useState("");
    const [oneWayTravelDay, setOneWayTravelDay] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [oneWayTravelTotalPassenger, setOneWayTravelTotalPassenger] = useState(0);
    const [oneWayTravelAdult, setOneWayTravelAdult] = useState(0);
    const [oneWayTravelChildren, setOneWayTravelChildren] = useState(0);
    const [oneWayTravelInfant, setOneWayTravelInfant] = useState(0);
    const [oneWayTravelCabinClass, setOneWayTravelCabinClass] = useState("Economy");
    const [airportData, setAirportData] = useState([]);
  
    const router = useRouter();
  
    useEffect(() => {
      const date = moment(new Date()).format('YYYY-MM-DD')
      setOneWayTravelDate(date)
      setCurrentDate(date)
      setOneWayTravelDay(moment(new Date()).format('dddd'))
      handlePassengerCount('adult', 'add')
      fetchAirports()
    }, [])
  
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
        if (calculation > 0) {
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
  
    const searchFlight = () => {
      if (oneWayFrom === '') {
        addToast("Please enter the source airport name", { appearance: 'error' });
        return
      }
      if (oneWayTo === '') {
        addToast("Please enter the destination airport name", { appearance: 'error' });
        return
      }
      router.push({
        pathname: '/Searchresult',
        query: {
          oneWayFrom: oneWayFrom,
          oneWayFromData: oneWayFromData,
          oneWayTo: oneWayTo,
          oneWayToData: oneWayToData,
          oneWayTravelDate: oneWayTravelDate,
          oneWayTravelTotalPassenger: oneWayTravelTotalPassenger,
          oneWayTravelAdult: oneWayTravelAdult,
          oneWayTravelChildren: oneWayTravelChildren,
          oneWayTravelInfant: oneWayTravelInfant,
          oneWayTravelCabinClass: oneWayTravelCabinClass
        }
      }, '/Searchresult');
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
        <div className="row">
            <div className="col-lg-12">
                <div className="oneway_search_form">
                    <form action="#!">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                    <p>From</p>
                                    {/* <input type="text" defaultValue={oneWayFrom} onChange={(event)=> setOneWayFrom(event.target.value)}/> */}
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
                                    {/* <input type="text" defaultValue={oneWayTo} onChange={(event)=> setOneWayTo(event.target.value)} /> */}
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
                                            styling={{ zIndex: '10000000' }}
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
                                                onChange={(event) => { setOneWayTravelDate(event.target.value); setOneWayTravelDay(moment(event.target.value).format('dddd')) }}
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
                                    type="button"
                                    // href="/Searchresult"
                                    onClick={() => searchFlight()}
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
    )
}