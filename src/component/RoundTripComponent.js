import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import { useRouter } from 'next/router'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useToasts } from 'react-toast-notifications';
export default function RoundTripComponent ({airlinesData}){
    const { addToast } = useToasts();
    const [roundTripFrom, setRoundTripFrom] = useState("");
    const [roundTripFromData, setRoundTripFromData] = useState("");
    const [roundTripTo, setRoundTripTo] = useState("");
    const [roundTripToData, setRoundTripToData] = useState("");
    const [roundTripTravelDate, setRoundTripTravelDate] = useState("");
    const [roundTripReturnDate, setRoundTripReturnDate] = useState("");
    const [roundTripTravelDay, setRoundTripTravelDay] = useState("");
    const [roundTripReturnDay, setRoundTripReturnDay] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [roundTripTravelTotalPassenger, setRoundTripTravelTotalPassenger] = useState(0);
    const [roundTripTravelAdult, setRoundTripTravelAdult] = useState(0);
    const [roundTripTravelChildren, setRoundTripTravelChildren] = useState(0);
    const [roundTripTravelInfant, setRoundTripTravelInfant] = useState(0);
    const [roundTripTravelCabinClass, setRoundTripTravelCabinClass] = useState("Economy");
    const [airportData, setAirportData] = useState(airlinesData);
  
    const router = useRouter();
  
    useEffect(() => {
      const date = moment(new Date()).format('YYYY-MM-DD')
      setRoundTripTravelDate(date)
      const nextDate = moment(new Date()).add(1, 'day').format('YYYY-MM-DD')
      setRoundTripReturnDate(nextDate)
      setCurrentDate(date)
      setRoundTripTravelDay(moment(new Date()).format('dddd'))
      setRoundTripReturnDay(moment(new Date()).add(1, 'day').format('dddd'))
      handlePassengerCount('adult', 'add')
    }, [])
  
    const handlePassengerCount = (passengerType, operation) => {
      if (passengerType === 'adult' && operation === 'add') {
        let calculation = 0
        calculation = roundTripTravelAdult + 1;
        setRoundTripTravelAdult(calculation);
        setRoundTripTravelTotalPassenger(calculation + roundTripTravelChildren + roundTripTravelInfant)
      }
      if (passengerType === 'adult' && operation === 'substract') {
        let calculation = 0;
        calculation = roundTripTravelAdult - 1
        if (calculation > 0) {
          setRoundTripTravelAdult(calculation)
          setRoundTripTravelTotalPassenger(calculation + roundTripTravelChildren + roundTripTravelInfant)
        }
      }
  
      if (passengerType === 'children' && operation === 'add') {
        let calculation = 0;
        calculation = roundTripTravelChildren + 1
        setRoundTripTravelChildren(calculation)
        setRoundTripTravelTotalPassenger(roundTripTravelAdult + calculation + roundTripTravelInfant)
      }
      if (passengerType === 'children' && operation === 'substract') {
        let calculation = 0;
        calculation = roundTripTravelChildren - 1
        if (calculation > -1) {
          setRoundTripTravelChildren(calculation)
          setRoundTripTravelTotalPassenger(roundTripTravelAdult + calculation + roundTripTravelInfant)
        }
      }
  
      if (passengerType === 'infant' && operation === 'add') {
        let calculation = 0;
        calculation = roundTripTravelInfant + 1
        setRoundTripTravelInfant(calculation)
        setRoundTripTravelTotalPassenger(roundTripTravelAdult + roundTripTravelChildren + calculation)
      }
      if (passengerType === 'infant' && operation === 'substract') {
        let calculation = 0;
        calculation = roundTripTravelInfant - 1
        if (calculation > -1) {
          setRoundTripTravelInfant(calculation)
          setRoundTripTravelTotalPassenger(roundTripTravelAdult + roundTripTravelChildren + calculation)
        }
      }
    }
  
    const handlePassengerClass = (passengerClass) => {
      setRoundTripTravelCabinClass(passengerClass)
    }
  
    const searchFlight = () => {
      if (roundTripFrom === '') {
        addToast("Please enter the source airport name", { appearance: 'error' });
        return
      }
      if (roundTripTo === '') {
        addToast("Please enter the destination airport name", { appearance: 'error' });
        return
      }
      router.push({
        pathname: '/Searchresult',
        query: {
            oneWayFrom: roundTripFrom,
            oneWayFromData: roundTripFromData,
            oneWayTo: roundTripTo,
            oneWayToData: roundTripToData,
            oneWayTravelDate: roundTripTravelDate,
            oneWayReturnDate: roundTripReturnDate,
            oneWayTravelTotalPassenger: roundTripTravelTotalPassenger,
            oneWayTravelAdult: roundTripTravelAdult,
            oneWayTravelChildren: roundTripTravelChildren,
            oneWayTravelInfant: roundTripTravelInfant,
            oneWayTravelCabinClass: roundTripTravelCabinClass,
            tripType: '1'
        }
      }, '/Searchresult');
    }
  
  
    const handleOnSearchroundTripFrom = (string, results) => {
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.
      setRoundTripFrom(string)
    }
  
    const handleOnSearchroundTripTo = (string, results) => {
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.
      setRoundTripTo(string)
    }
  
    const handleOnHover = (result) => {
      // the item hovered
    //   console.log(result)
    }
  
    const handleOnSelectroundTripFrom = (item) => {
      // the item selected
      setRoundTripFrom(item.code)
      setRoundTripFromData(item.name)
    //   console.log(item)
    }
  
    const handleOnSelectroundTripTo = (item) => {
      // the item selected
      setRoundTripTo(item.code)
      setRoundTripToData(item.name)
    //   console.log(item)
    }
  
    const handleOnFocus = () => {
    //   console.log('Focused')
    }
  
    const formatResult = (item) => {
      return (
        <>
          {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
          <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        </>
      )
    }
  
    const clearroundTripFromResult = (item) => {
      setRoundTripFrom("")
      setRoundTripFromData("")
    }
  
    const clearroundTripToResult = (item) => {
      setRoundTripTo("")
      setRoundTripToData("")
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
                                    {/* <input type="text" defaultValue={roundTripFrom} onChange={(event)=> setRoundTripFrom(event.target.value)}/> */}
                                    <div style={{ width: '80%', backgroundColor: '#f4ecff' }}>
                                        {<ReactSearchAutocomplete
                                            items={airportData}
                                            onSearch={handleOnSearchroundTripFrom}
                                            onHover={handleOnHover}
                                            onSelect={handleOnSelectroundTripFrom}
                                            onFocus={handleOnFocus}
                                            autoFocus
                                            formatResult={formatResult}
                                            onClear={clearroundTripFromResult}
                                        // styling={{borderRadius:'0',border:'none'}}
                                        />}
                                    </div>
                                    <span>
                                        {roundTripFromData}
                                    </span>
                                    <div className="plan_icon_posation">
                                        <i className="fas fa-plane-departure" />
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                    <p>To</p>
                                    {/* <input type="text" defaultValue={roundTripTo} onChange={(event)=> setRoundTripTo(event.target.value)} /> */}
                                    <div style={{ width: '80%', backgroundColor: '#f4ecff' }}>
                                        {<ReactSearchAutocomplete
                                            items={airportData}
                                            onSearch={handleOnSearchroundTripTo}
                                            onHover={handleOnHover}
                                            onSelect={handleOnSelectroundTripTo}
                                            onFocus={handleOnFocus}
                                            autoFocus
                                            formatResult={formatResult}
                                            onClear={clearroundTripToResult}
                                            styling={{ zIndex: '10000000' }}
                                        />}
                                    </div>
                                    <span>{roundTripToData}</span>
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
                                                defaultValue={roundTripTravelDate}
                                                // onChange={(event) => { setRoundTripTravelDate(event.target.value); setRoundTripTravelDay(moment(event.target.value).format('dddd')) }}
                                                onChange={(event)=>{ setRoundTripTravelDate(event.target.value); setRoundTripTravelDay(moment(event.target.value).format('dddd')); setRoundTripReturnDate(moment(event.target.value).add(1,'day').format('YYYY-MM-DD'));setRoundTripReturnDay(moment(event.target.value).add(1,'day').format('dddd'));setReturnDate(moment(event.target.value).add(1,'day').format('YYYY-MM-DD'))}}
                                                min={currentDate}
                                            />
                                            <span>{roundTripTravelDay}</span>
                                        </div>
                                        <div className="Journey_date">
                                            <p>Return date</p>
                                            <input
                                                type="date"
                                                defaultValue={roundTripReturnDate}
                                                onChange={(event) => { setRoundTripReturnDate(event.target.value); setRoundTripReturnDay(moment(event.target.value).format('dddd')) }}
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
                                            {roundTripTravelTotalPassenger} Passenger
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
                                                                    {roundTripTravelAdult}
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
                                                                    {roundTripTravelChildren}
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
                                                                    {roundTripTravelInfant}
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
                                                            className={(roundTripTravelCabinClass === 'Economy') ? 'label-select-btn active' : 'label-select-btn'}
                                                        >
                                                            <span className="muiButton-label">
                                                                Economy
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerClass('Business') }}
                                                            className={(roundTripTravelCabinClass === 'Business') ? 'label-select-btn active' : 'label-select-btn'}
                                                        >
                                                            <span className="muiButton-label">
                                                                Business
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => { event.preventDefault(); event.stopPropagation(); handlePassengerClass('First Class') }}
                                                            className={(roundTripTravelCabinClass === 'First Class') ? 'label-select-btn active' : 'label-select-btn'}
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
                                    <span>{roundTripTravelCabinClass}</span>
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