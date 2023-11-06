import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications';

export default function SearchAndFilterComponent({ contractData, totalContractData, bookingKey, adultCount, childCount, InfantCount }) {
  const router = useRouter();
  const { addToast } = useToasts();
  const [Contracts, setContracts] = useState(contractData)
  const [totalContract, setTotalContracts] = useState(totalContractData);
  //filter
  const [priceSlider, setPriceSlider] = useState(80000);
  const [airStops, setAirStops] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [refundable, setRefundable] = useState([]);
  useEffect(() => {
    handleFilter()
  }, [priceSlider, airStops, airlines, refundable])
  const goToBooking = (contractData) => {
    if (
      localStorage.getItem('userDetails') &&
      localStorage.getItem('userDetails') !== undefined
    ) {
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
    } else {
      addToast("Please login in order to proceed with flight booking", { appearance: 'error' });
    }
  }

  const handlePriceSlider = (event) => {
    setPriceSlider(event.target.value)
  }

  const handleStopFilter = (event) => {
    let data = []
    if (event.target.checked) {
      data = [...airStops, parseInt(event.target.value)]
      setAirStops(data)
    } else {
      data = airStops.filter((filterTag) => filterTag !== parseInt(event.target.value))
      setAirStops(data)
    }

  }

  const handleAirlinesFilter = (event) => {
    let data = []
    if (event.target.checked) {
      data = [...airlines, event.target.value]
      setAirlines(data)
    } else {
      data = airlines.filter((filterTag) => filterTag !== event.target.value)
      setAirlines(data)
    }

  }

  const handleRefundable = (event) => {
    let data = []
    if (event.target.checked) {
      data = [...refundable, event.target.value]
      setRefundable(data)
    } else {
      data = refundable.filter((filterTag) => filterTag !== event.target.value)
      setRefundable(data)
    }

  }

  const handleFilter = () => {
    let filter = []
    if (totalContract !== null && totalContract.length > 0) {
      filter = totalContract.filter((item) => item.AirlineFare.BaseFare <= priceSlider);
    }

    if (airStops.length > 0 && filter.length > 0) {
      filter = filter.filter(item => {
        return airStops.includes(item.AirSegments.length);
      });
    } else if (airStops.length > 0 && filter.length === 0 && totalContract !== null && totalContract.length > 0) {
      filter = totalContract.filter(item => {
        return airStops.includes(item.AirSegments.length);
      });
    }

    if (airlines.length > 0 && filter.length > 0) {
      filter = filter.filter(item => {
        return airlines.includes(item.AirSegments[0].AirlineCode);
      });
    } else if (airlines.length > 0 && filter.length === 0 && totalContract !== null && totalContract.length > 0) {
      filter = totalContract.filter(item => {
        return airStops.includes(item.AirSegments[0].AirlineCode);
      });
    }
    if (refundable.length > 0 && filter.length > 0) {
      filter = filter.filter(item => {
        return refundable.includes(String(item.Refundable));
      });
    } else if (refundable.length > 0 && filter.length === 0 && totalContract !== null && totalContract.length > 0) {
      filter = totalContract.filter(item => {
        return airStops.includes(String(item.Refundable));
      });
    }
    setContracts(filter);
  }

  const timeDiff = (startT, endT) => {
    // start time and end time
    const startTime = moment(startT, 'HH:mm:ss a');
    const endTime = moment(endT, 'HH:mm:ss a');

    // calculate total duration
    const duration = moment.duration(endTime.diff(startTime));

    // duration in hours
    const hours = parseInt(duration.asHours());

    // duration in minutes
    const minutes = parseInt(duration.asMinutes()) % 60;
    return hours + ' h ' + minutes + ' m'
  }



  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        {/* Section Heading */}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="section_heading_center">
              <h2>{Contracts !== null ? Object.keys(Contracts).length : 0} tours found</h2>
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
                  <input type="range" min="2000" max="80000" value={priceSlider} onChange={(event) => { handlePriceSlider(event) }} style={{ width: '100%' }} />
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
                      onChange={(event) => { handleStopFilter(event) }}
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
                      onChange={(event) => { handleStopFilter(event) }}
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
                      onChange={(event) => { handleStopFilter(event) }}
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
                      onChange={(event) => { handleAirlinesFilter(event) }}
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
                      onChange={(event) => { handleAirlinesFilter(event) }}
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
                      onChange={(event) => { handleAirlinesFilter(event) }}
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
                      onChange={(event) => { handleAirlinesFilter(event) }}
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
                      onChange={(event) => { handleAirlinesFilter(event) }}
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
                      onChange={(event) => { handleAirlinesFilter(event) }}
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
                      onChange={(event) => { handleAirlinesFilter(event) }}
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
                      onChange={(event) => { handleAirlinesFilter(event) }}
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
                      onChange={(event) => { handleRefundable(event) }}
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
                      onChange={(event) => { handleRefundable(event) }}
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
              {(Contracts !== null && Object.keys(Contracts).length > 0) && Object.keys(Contracts).map((item, index) => {
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
                                  <h6>{item.AirSegments.length === 1 ? 'Non-stop' : (item.AirSegments.length - 1) + ' Stop(s)'}</h6>
                                  {/* <p>{item.AirSegments[0].Duration} </p> */}
                                  <p>{item.AirSegments[0].Duration}</p>
                                  {item.AirSegments.length > 1 && (<p>{item.AirSegments.length > 1 && 'via ' + item.AirSegments[0].destinationAirportName}</p>)}
                                </div>
                                <div className="flight_search_destination">
                                  <p>To</p>
                                  <h3>{item.AirSegments[item.AirSegments.length - 1].Destination}</h3>
                                  <h6>{item.AirSegments[item.AirSegments.length - 1].Destination} - {item.AirSegments[item.AirSegments.length - 1].destinationAirportName}</h6>
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
                              onClick={() => goToBooking(Contracts[index])}
                              className="btn btn_theme btn_sm"
                            >
                              Book now
                            </button>
                            {/* <p>*Discount applicable on some conditions</p> */}
                            <h6
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapseExample_${index}`}
                              aria-expanded="false"
                              aria-controls={`collapseExample_${index}`}
                            >
                              Show more <i className="fas fa-chevron-down" />
                            </h6>
                          </div>
                        </div>
                        <div
                          className="flight_policy_refund collapse"
                          id={`collapseExample_${index}`}
                        >
                          {console.log('item.AirSegments--->',item.AirSegments)}
                          {item.AirSegments.map((item2, index2) => {
                            return (
                            <div className="flight_show_down_wrapper">
                              <div className="flight-shoe_dow_item">
                                <div className="airline-details">
                                  <div className="img">
                                    <img src="assets/img/icon/bg.png" alt="img" />
                                  </div>
                                  <span className="airlineName fw-500">
                                    {item2.AirlineName} &nbsp;  {item2.AirlineCode}{item2.FlightNumber}
                                  </span>
                                  {/* <span className="flightNumber">
                                    BOEING 737-800 - 738
                                  </span> */}
                                </div>
                                <div className="flight_inner_show_component">
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">{item2.Origen}</span>
                                        <span className="time">{moment(new Date(item2.DepartureDateTime)).format("h:mm a")}</span>
                                      </div>
                                      <p className="airport">
                                        {item2.sourceAirportName}
                                      </p>
                                      <p className="date">{moment(new Date(item2.DepartureDateTime)).format("Do MMM YYYY")}</p>
                                    </div>
                                  </div>
                                  <div className="flight_duration">
                                    <div className="arrow_right" />
                                    {/* <span>{item2.Duration}</span> */}
                                  </div>
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">{item2.Destination}</span>
                                        <span className="time">{moment(new Date(item2.ArrivalDateTime)).format("h:mm a")}</span>
                                      </div>
                                      <p className="airport">
                                        {item2.destinationAirportName}
                                      </p>
                                      <p className="date">{moment(new Date(item2.ArrivalDateTime)).format("Do MMM YYYY")}</p>
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
                                    <h3>{item2.Origen}-{item2.Destination}</h3>
                                    <p>
                                      <span>Chekin : {item2.BaggageAllowed.CheckInBaggage} /</span> person<br/>
                                      <span>Hand : {item2.BaggageAllowed.HandBaggage ? item2.BaggageAllowed.HandBaggage : 'N/A'} /</span> person
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            )
                          })}
                          {/* <div className="flight_show_down_wrapper">
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
                          </div> */}
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
  )
}