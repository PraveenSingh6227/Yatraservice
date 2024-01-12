import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications';
import '../../node_modules/react-tabs/style/react-tabs.css';
import LoadingSpinner from "../component/Loader";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function SearchAndFilterComponent({ contractData, totalContractData, bookingKey, adultCount, childCount, InfantCount }) {
  const router = useRouter();
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fareRule, setFareRule] = useState([])
  const [Contracts, setContracts] = useState(contractData)
  const [totalContract, setTotalContracts] = useState(totalContractData);
  const [selectedContract, setSelectedContract] = useState({})
  const [showNetFare, setShowNetFare] = useState(false)
  //filter
  const [priceSlider, setPriceSlider] = useState(80000);
  const [airStops, setAirStops] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [refundable, setRefundable] = useState([]);
  let [seatAvailable, setSeatAvailable] = useState({});
  useEffect(() => {
    handleFilter()
  }, [priceSlider, airStops, airlines, refundable])

  const getFareRule = async () => {
    if (Object.keys(selectedContract).length == 0) {
      addToast("Please select the price to view fare rules", { appearance: 'error' });
      return
    }
    setIsLoading(true)
    setFareRule([])
    await fetch("https://yatriservice.com/admin/api/generateToken.php", {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(async (response) => {
        let bodyFormData = new FormData();
        bodyFormData.append("action", "get_fare_rule");
        bodyFormData.append("BookingKey", bookingKey);
        bodyFormData.append("APIToken", response.ApiToken);
        bodyFormData.append("ContractId[]", selectedContract.ContractId);
        await fetch("https://yatriservice.com/admin/api/api.php", {
          method: 'POST',
          body: bodyFormData
        }).then((response) => response.json()).then((response) => {
          if (response !== null) {
            if (response.Status === 0) {
              addToast("Error : " + response.Error.ErrorDesc, { appearance: 'error' });
            } else {
              setFareRule(response.fareRules)
              setShowModal(true)
            }
          }
          setIsLoading(false)
        })
      }
      )
  }

const htmlDecode = (input) => {
    if(!input) return
    input = input.toString().replace(/\\/g, '')
    input = input.replace (/"/g, "")
    return input
  }

  const goToBooking = () => {
    if (Object.keys(selectedContract).length == 0) {
      addToast("Please select the price", { appearance: 'error' });
      return
    }

    if (
      localStorage.getItem('userDetails') &&
      localStorage.getItem('userDetails') !== undefined
    ) {
      router.push({
        pathname: '/bookingPage',
        query: {
          contractData: JSON.stringify(selectedContract),
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
    let finalPriceFilter = []
    let finalAirStopsFilter = []
    let finalAirlinesFilter = []
    let finalRefundableFilter = []
    if (totalContract !== null) {
      // filter = totalContract.filter((item) =>  item.AirlineFare.BaseFare <= priceSlider);
      // filter = Object.keys(totalContract)
      // .map((item) => console.log('tina---->',totalContract[item][0].AirlineFare.BaseFare))
      // .filter((item) => totalContract[item][0].AirlineFare.BaseFare <= priceSlider)
      Object.keys(totalContract)
        .filter((item) => {
          totalContract[item].filter(items => {
            if (items.AirlineFare.BaseFare <= priceSlider) {
              finalPriceFilter.push(item)
            }
          })
        })
      filter = Object.keys(totalContract)
        .filter(key => [...new Set(finalPriceFilter)].includes(key))
        .reduce((obj, key) => {
          obj[key] = totalContract[key];
          return obj;
        }, {});
    }

    if (airStops.length > 0 && Object.keys(filter).length > 0) {
      // filter = filter.filter(item => {
      //   return airStops.includes(item.AirSegments.length);
      // });

      Object.keys(filter)
        .filter((item) => {
          filter[item].filter(items => {
            if (airStops.includes(items.AirSegments.length)) {
              finalAirStopsFilter.push(item)
            }
          })
        })
      filter = Object.keys(filter)
        .filter(key => [...new Set(finalAirStopsFilter)].includes(key))
        .reduce((obj, key) => {
          obj[key] = totalContract[key];
          return obj;
        }, {});

    } else if (airStops.length > 0 && Object.keys(filter).length === 0 && totalContract !== null && Object.keys(totalContract).length > 0) {
      // filter = totalContract.filter(item => {
      //   return airStops.includes(item.AirSegments.length);
      // });
      Object.keys(totalContract)
        .filter((item) => {
          totalContract[item].filter(items => {
            if (airStops.includes(items.AirSegments.length)) {
              finalAirStopsFilter.push(item)
            }
          })
        })
      filter = Object.keys(totalContract)
        .filter(key => [...new Set(finalAirStopsFilter)].includes(key))
        .reduce((obj, key) => {
          obj[key] = totalContract[key];
          return obj;
        }, {});
    }

    if (airlines.length > 0 && Object.keys(filter).length > 0) {
      // filter = filter.filter(item => {
      //   return airlines.includes(item.AirSegments[0].AirlineCode);
      // });
      Object.keys(filter)
        .filter((item) => {
          filter[item].filter(items => {
            if (airlines.includes(items.AirSegments[0].AirlineCode)) {
              finalAirlinesFilter.push(item)
            }
          })
        })
      filter = Object.keys(filter)
        .filter(key => [...new Set(finalAirlinesFilter)].includes(key))
        .reduce((obj, key) => {
          obj[key] = totalContract[key];
          return obj;
        }, {});
    } else if (airlines.length > 0 && Object.keys(filter).length === 0 && totalContract !== null && Object.keys(totalContract).length > 0) {
      Object.keys(totalContract)
        .filter((item) => {
          totalContract[item].filter(items => {
            if (airlines.includes(items.AirSegments[0].AirlineCode)) {
              finalAirlinesFilter.push(item)
            }
          })
        })
      filter = Object.keys(totalContract)
        .filter(key => [...new Set(finalAirlinesFilter)].includes(key))
        .reduce((obj, key) => {
          obj[key] = totalContract[key];
          return obj;
        }, {});
    }

    if (refundable.length > 0 && Object.keys(filter).length > 0) {
      // filter = filter.filter(item => {
      //   return refundable.includes(String(item.Refundable));
      // });
      Object.keys(filter)
        .filter((item) => {
          filter[item].filter(items => {
            if (refundable.includes(String(items.Refundable))) {
              finalRefundableFilter.push(item)
            }
          })
        })
      filter = Object.keys(filter)
        .filter(key => [...new Set(finalRefundableFilter)].includes(key))
        .reduce((obj, key) => {
          obj[key] = totalContract[key];
          return obj;
        }, {});
    } else if (refundable.length > 0 && Object.keys(filter).length === 0 && totalContract !== null && Object.keys(totalContract).length > 0) {
      // filter = totalContract.filter(item => {
      //   return airStops.includes(String(item.Refundable));
      // });
      Object.keys(totalContract)
        .filter((item) => {
          filter[item].filter(items => {
            if (refundable.includes(String(items.Refundable))) {
              finalRefundableFilter.push(item)
            }
          })
        })
      filter = Object.keys(totalContract)
        .filter(key => [...new Set(finalRefundableFilter)].includes(key))
        .reduce((obj, key) => {
          obj[key] = totalContract[key];
          return obj;
        }, {});
    }
    // console.log('finalFilter--->',[...new Set(finalFilter)])
    console.log('filter--->', filter)
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
    <>
    {isLoading ? (
      <LoadingSpinner />
    ) : (
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
                  <h5>NetFare</h5>
                </div>
                <div className="tour_search_type">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="flexCheckDefaultf1"
                      value={2}
                      onChange={(event) => { showNetFare == true ? setShowNetFare(false) : setShowNetFare(true) }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefaultf1"
                    >
                      <span className="area_flex_one">
                        <span>Show NetFare</span>
                        {/* <span>20</span> */}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
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
                let contractIds = [];
                const selectedContracts = {}
                return (
                  <div className="col-lg-12">
                    <div className="flight_search_result_wrapper">
                  
                      <div className="flight_search_item_wrappper">
                        <div className="flight_search_items">
                          <div className="multi_city_flight_lists">
                            <div className="flight_multis_area_wrapper">
                              <div className="flight_search_left">
                                <div className="flight_logo">
                                  {/* <span className="airlineName fw-500">
                                    {Contracts[item][0].AirSegments[0].AirlineCode}{Contracts[item][0].AirSegments[0].FlightNumber}
                                  </span> */}
                                  {/* <img
                                      src="assets/img/common/biman_bangla.png"
                                      alt="img"
                                    /> */}
                                  {Contracts[item][0].AirSegments[0].AirlineName}<br />
                                  {/* {Contracts[item][0].AirSegments[0].AirlineCode}{Contracts[item][0].AirSegments[0].FlightNumber} */}
                                  <span className="airlineName fw-500">
                                    {Contracts[item][0].AirSegments[0].AirlineCode}{Contracts[item][0].AirSegments[0].FlightNumber}
                                  </span>

                                </div>
                                <div className="flight_search_destination">
                                  <p>From</p>
                                  <h3>{Contracts[item][0].AirSegments[0].Origen}  <span className="time">{moment(new Date(Contracts[item][0].AirSegments[0].DepartureDateTime)).format('h:mm a')}</span></h3>
                                  <h6>{Contracts[item][0].AirSegments[0].Origen} - {Contracts[item][0].AirSegments[0].sourceAirportName}</h6>
                                </div>
                              </div>
                              <div className="flight_search_middel">
                                <div className="flight_right_arrow">
                                  {/* <img
                                      src="assets/img/icon/right_arrow.png"
                                      alt="icon"
                                    /> */}
                                  <img src="https://yatriservice.com/assets/img/icon/right_arrow.png" alt="icon" />
                                  <h6>{Contracts[item][0].AirSegments.length === 1 ? 'Non-stop' : (Contracts[item][0].AirSegments.length - 1) + ' Stop(s)'}</h6>
                                  {/* <p>{Contracts[item][0].AirSegments[0].Duration} </p> */}
                                  <p>{moment(new Date(Contracts[item][0].AirSegments[0].DepartureDateTime)).format('h:mm a')}-{moment(new Date(Contracts[item][0].AirSegments[Contracts[item][0].AirSegments.length - 1].ArrivalDateTime)).format('h:mm a')}</p>
                                  <p>{timeDiff(new Date(Contracts[item][0].AirSegments[0].DepartureDateTime), new Date(Contracts[item][0].AirSegments[Contracts[item][0].AirSegments.length - 1].ArrivalDateTime))}</p>
                                  {/* {Contracts[item][0].AirSegments.length > 1 && (<p>{Contracts[item][0].AirSegments.length > 1 && 'via ' + Contracts[item][0].AirSegments[0].destinationAirportName}</p>)} */}
                                </div>
                                <div className="flight_search_destination">
                                  <p>To</p>
                                  <h3>{Contracts[item][0].AirSegments[Contracts[item][0].AirSegments.length - 1].Destination} <span className="time">{moment(new Date(Contracts[item][0].AirSegments[0].ArrivalDateTime
)).format('h:mm a')}</span></h3>
                                  <h6>{Contracts[item][0].AirSegments[Contracts[item][0].AirSegments.length - 1].Destination} - {Contracts[item][0].AirSegments[Contracts[item][0].AirSegments.length - 1].destinationAirportName}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flight_multis_area_wrapper" style={{ paddingBottom: '2%' }}>
                            <div class="tour_search_type">
                              {Contracts[item].map((item3, index3) => {
                                contractIds[index3] = item3.ContractId;
                                return (
                                  <>
                                    {showNetFare ? (
                                    <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name={`radio_${index}`}
                                      value={`${item3.ContractId}`}
                                      onClick={(e) => {
                                        setSelectedContract(item3)
                                        setSeatAvailable(prev => ({
                                          ...prev,
                                          [Contracts[item][0].AirSegments[0].FlightNumber] : item3.TotalSeats
                                        }))
                                        // seatAvailable = item3.TotalSeats
                                      }}
                                    />
                                    <label class="form-check-label">
                                      <span class="area_flex_one">
                                        <span style={{ textTransform: 'uppercase' }}>({item3.FareType}) Rs. {item3.AirlineFare.NetFare


}</span>
                                      </span>
                                    </label>
                                    </div>
                                    ) : (
                                      <div class="form-check">
                                        <input
                                          class="form-check-input"
                                          type="radio"
                                          name={`radio_${index}`}
                                          value={`${item3.ContractId}`}
                                          onClick={(e) => {
                                            setSelectedContract(item3)
                                            setSeatAvailable(prev => ({
                                              ...prev,
                                              [Contracts[item][0].AirSegments[0].FlightNumber] : item3.TotalSeats
                                            }))
                                          }}
                                        />
                                        <label class="form-check-label">
                                          <span class="area_flex_one">
                                            <span style={{ textTransform: 'uppercase' }}>({item3.FareType}) Rs. {item3.AirlineFare.GrossFare
}</span>
                                          </span>
                                        </label>
                                      </div>
                                    )}
                                  </>

                                )
                              })}
                            </div>
                          </div>
                          <div className="flight_search_right">
                            {/* <h5>
                                  <del>9,560 Rs.</del>
                                </h5> */}
                            {/* <h2>
                                  {item.AirlineFare.BaseFare} Rs.<sup>*20% OFF</sup>
                                </h2> */}
                            {seatAvailable.hasOwnProperty(Contracts[item][0].AirSegments[0].FlightNumber) && (
                            <p>{seatAvailable.hasOwnProperty(Contracts[item][0].AirSegments[0].FlightNumber) ? seatAvailable[Contracts[item][0].AirSegments[0].FlightNumber] : 0} Seat/s Left</p>    
                            )}
                            <p 
                            style={{cursor:'pointer'}}
                            onClick={() => getFareRule()}
                            >
                             View Fare Rules
                            </p>
                            {/* <a>View Fare Rules</a> */}
                            <button
                              onClick={() => goToBooking()}
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
                              // onClick={() => getFareRule(contractIds)}
                            >
                              Show more <i className="fas fa-chevron-down" />
                            </h6>
                          </div>
                        </div>
                        <div
                          className="flight_policy_refund collapse"
                          id={`collapseExample_${index}`}
                        >
                          {Contracts[item][0].AirSegments.map((item2, index2) => {
                            return (
                              <div className="flight_show_down_wrapper">
                              <div className="flight-shoe_dow_item">
                                <div className="airline-details">
                                  {/* <div className="img">
                              <img src="assets/img/icon/bg.png" alt="img" />
                            </div> */}
                                  {/* {console.log('item2--->', item2)} */}
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
                                        <span className="time">{moment(new Date(item2.DepartureDateTime)).format('h:mm a')}</span>
                                      </div>
                                      <p className="airport">
                                        {item2.sourceAirportName}
                                      </p>
                                      <p className="date">{moment(new Date(item2.DepartureDateTime)).format("Do MMM YYYY")}</p>
                                    </div>
                                  </div>
                                  <div className="flight_duration">
                                    <div className="arrow_right" />
                                    <span>{timeDiff(new Date(item2.DepartureDateTime), new Date(item2.ArrivalDateTime))}</span>
                                  </div>
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">{item2.Destination}</span>
                                        <span className="time">{moment(new Date(item2.ArrivalDateTime)).format('h:mm a')}</span>
                                      </div>
                                      <p className="airport">
                                        {item2.destinationAirportName}
                                      </p>
                                      <p className="date">{moment(new Date(item2.ArrivalDateTime)).format('Do MMM YYYY')}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flight_refund_policy">
                                <div className="TabPanelInner flex_widht_less col-6" style={{ paddingBottom: '5%' }}>
                                  <h4>Fare Breakups</h4>
                                  <div class="tour_booking_amount_area">
                                    <ul>
                                      <li>Base Fare <span>{"Rs. " + Contracts[item][0].AirlineFare.BaseFare}</span></li>
                                      <li>Tax Fare<span>{"Rs. " + Contracts[item][0].AirlineFare.TaxFare}</span></li>
                                      <li>Service Charge <span>{"Rs. " + Contracts[item][0].AirlineFare.ServiceCharge}</span></li>
                                    </ul>
                                    <div class="tour_bokking_subtotal_area">
                                      <h6>Subtotal <span>{"Rs. " + (Contracts[item][0].AirlineFare.BaseFare + Contracts[item][0].AirlineFare.TaxFare + Contracts[item][0].AirlineFare.ServiceCharge)}</span></h6>
                                    </div>
                                    <div class="coupon_add_area">
                                      <h6>Commission
                                        <span>{" - Rs. " + Contracts[item][0].AirlineFare.Commission}</span>
                                      </h6>
                                    </div>
                                    <div class="total_subtotal_booking">
                                      <h6>Total Amount <span>{"Rs. " + Contracts[item][0].AirlineFare.NetFare}</span> </h6>
                                    </div>
                                  </div>
                                </div>
                                <div className="TabPanelInner col-7">
                                  <div style={{ float: 'right' }}>
                                    <h4>Baggage</h4>
                                    <div className="flight_info_taable">
                                      <h3>{item2.Origen}-{Contracts[item][0].AirSegments[Contracts[item][0].AirSegments.length - 1].Destination}</h3>
                                     
                                      <p>
                                        <span>Checkin : {item2.BaggageAllowed.CheckInBaggage} /</span> person<br />
                                        <span>Hand  : {item2.BaggageAllowed.HandBaggage && item2.BaggageAllowed.HandBaggage ? item2.BaggageAllowed.HandBaggage : 'N/A'} {item2.BaggageAllowed.HandBaggage && "/"}</span> {item2.BaggageAllowed.HandBaggage && "Person"}
                                      </p>
                                    </div>
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
      <div
        className="modal show"
        style={{ display: `${showModal ? "block" : "none"}`,zIndex:'20000000' }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Fare Rules</Modal.Title>
          </Modal.Header>
  
          <Modal.Body style={{
                maxHeight: '400px',
                overflowY: 'scroll'
          }}>
            {fareRule!="null" || htmlDecode(fareRule)!="" ? (
            <div style={{padding:'2%'}} dangerouslySetInnerHTML={{ __html: htmlDecode(fareRule) }} />
            ):(
              <p>Fare rules are not available at this moment, please connect with customer care.</p>
            )}
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </section>
    )}
    </>
  )
}