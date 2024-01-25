import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications';
import '../../node_modules/react-tabs/style/react-tabs.css';
import LoadingSpinner from "./Loader";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { url } from '../../config/index'


export default function RoundTripSearch({ contractData, contractRoundData, totalContractData, totalContractRoundData, bookingKey, bookingKeyRound, adultCount, childCount, InfantCount }) {
  const router = useRouter();
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterDisplay, setIsFilterDisplay] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fareRule, setFareRule] = useState([])
  const [Contracts, setContracts] = useState(contractData)
  const [ContractsRound, setContractRound] = useState(contractRoundData)
  const [totalContract, setTotalContracts] = useState(totalContractData);
  const [totalContractRound, setTotalContractRound] = useState(totalContractRoundData);
  const [selectedContract, setSelectedContract] = useState({})
  const [selectedRoundTripContract, setSelectedRoundTripContract] = useState({})
  const [showNetFare, setShowNetFare] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedRoundTripIndex, setSelectedRoundTripIndex] = useState(0)
  //filter
  const [priceSlider, setPriceSlider] = useState(80000);
  const [airStops, setAirStops] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [refundable, setRefundable] = useState([]);
  let [seatAvailable, setSeatAvailable] = useState({});
  useEffect(() => {
    handleFilter()
    handleRoundTripFilter()
  }, [priceSlider, airStops, airlines, refundable])

  const getFareRule = async (bookingKey) => {
    if (Object.keys(selectedContract).length == 0) {
      addToast("Please select the price to view fare rules", { appearance: 'error' });
      return
    }
    setIsLoading(true)
    setFareRule([])
    await fetch(`${url}generateToken.php`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(async (response) => {
        let bodyFormData = new FormData();
        bodyFormData.append("action", "get_fare_rule");
        bodyFormData.append("BookingKey", bookingKey);
        bodyFormData.append("APIToken", response.ApiToken);
        bodyFormData.append("ContractId[]", selectedContract.ContractId);
        await fetch(`${url}api.php`, {
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

  const filterContractByPrice = (Contracts) => {
    let clean = Contracts.filter((arr, index, self) =>
      index === self.findIndex((t) => (t.AirlineFare.GrossFare === arr.AirlineFare.GrossFare)))
    return clean
  }

  const htmlDecode = (input) => {
    if (!input) return
    input = input.toString().replace(/\\/g, '')
    input = input.replace(/"/g, "")
    return input
  }

  const goToBooking = () => {
    if (Object.keys(selectedContract).length == 0) {
      addToast("Please select the onward price", { appearance: 'error' });
      return
    }

    if (Object.keys(selectedRoundTripContract).length == 0) {
      addToast("Please select the round trip price", { appearance: 'error' });
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
          contractReturnData: JSON.stringify(selectedRoundTripContract),
          bookingKey: bookingKey,
          bookingKeyRound: bookingKeyRound,
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

   //one way filter
  const handleFilter = () => {
    let filter = []
    let finalPriceFilter = []
    let finalAirStopsFilter = []
    let finalAirlinesFilter = []
    let finalRefundableFilter = []
    if (totalContract !== null) {
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
    setContracts(filter);
  }

  //round trip filter
  const handleRoundTripFilter = () => {
    let filter = []
    let finalPriceFilter = []
    let finalAirStopsFilter = []
    let finalAirlinesFilter = []
    let finalRefundableFilter = []
    if (totalContractRound !== null) {
      Object.keys(totalContractRound)
        .filter((item) => {
          totalContractRound[item].filter(items => {
            if (items.AirlineFare.BaseFare <= priceSlider) {
              finalPriceFilter.push(item)
            }
          })
        })
      filter = Object.keys(totalContractRound)
        .filter(key => [...new Set(finalPriceFilter)].includes(key))
        .reduce((obj, key) => {
          obj[key] = totalContractRound[key];
          return obj;
        }, {});
    }

    if (airStops.length > 0 && Object.keys(filter).length > 0) {
      Object.keys(filter)
        .filter((item) => {
          filter[item].filter(items => {
            if (airStops.includes(items.AirSegments.length)) {
              console.log('los--->',airStops,items)
              finalAirStopsFilter.push(item)
            }
          })
        })
        console.log('finalAirStopsFilter--->',finalAirStopsFilter)
      filter = Object.keys(filter)
        .filter(key => [...new Set(finalAirStopsFilter)].includes(key))
        .reduce((obj, key) => {
          obj[key] = totalContractRound[key];
          return obj;
        }, {});
        console.log('filter>>--->',filter)
    } else if (airStops.length > 0 && Object.keys(filter).length === 0 && totalContractRound !== null && Object.keys(totalContractRound).length > 0) {
      Object.keys(totalContractRound)
        .filter((item) => {
          totalContractRound[item].filter(items => {
            if (airStops.includes(items.AirSegments.length)) {
              finalAirStopsFilter.push(item)
            }
          })
        })
      filter = Object.keys(totalContractRound)
        .filter(key => [...new Set(finalAirStopsFilter)].includes(key))
        .reduce((obj, key) => {
          obj[key] = totalContractRound[key];
          return obj;
        }, {});
    }

    if (airlines.length > 0 && Object.keys(filter).length > 0) {
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
          obj[key] = totalContractRound[key];
          return obj;
        }, {});
    } else if (airlines.length > 0 && Object.keys(filter).length === 0 && totalContractRound !== null && Object.keys(totalContractRound).length > 0) {
      Object.keys(totalContractRound)
        .filter((item) => {
          totalContractRound[item].filter(items => {
            if (airlines.includes(items.AirSegments[0].AirlineCode)) {
              finalAirlinesFilter.push(item)
            }
          })
        })
      filter = Object.keys(totalContractRound)
        .filter(key => [...new Set(finalAirlinesFilter)].includes(key))
        .reduce((obj, key) => {
          obj[key] = totalContractRound[key];
          return obj;
        }, {});
    }

    if (refundable.length > 0 && Object.keys(filter).length > 0) {
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
          obj[key] = totalContractRound[key];
          return obj;
        }, {});
    } else if (refundable.length > 0 && Object.keys(filter).length === 0 && totalContractRound !== null && Object.keys(totalContractRound).length > 0) {
      Object.keys(totalContractRound)
        .filter((item) => {
          filter[item].filter(items => {
            if (refundable.includes(String(items.Refundable))) {
              finalRefundableFilter.push(item)
            }
          })
        })
      filter = Object.keys(totalContractRound)
        .filter(key => [...new Set(finalRefundableFilter)].includes(key))
        .reduce((obj, key) => {
          obj[key] = totalContractRound[key];
          return obj;
        }, {});
    }
    setContractRound(filter);
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
        <section id="explore_area" class="section_padding">
          <div class="container">
            {/* Section Heading */}
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                <div class="section_heading_center">
                  <h2>{Contracts !== null ? Object.keys(Contracts).length : 0} tours found</h2>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                <div class="section_heading_center">
                  <h2>{Contracts !== null ? Object.keys(ContractsRound).length : 0} tours found</h2>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3">
                <button class="btn btn_theme" onClick={() => isFilterDisplay ? setIsFilterDisplay(false) : setIsFilterDisplay(true)} style={{ zIndex: 99, left: 0, position: 'fixed', top: '300px' }}
                ><i class="fa fa-filter" aria-hidden="true"></i></button>
              </div>
            </div>
            {isFilterDisplay && (
              <div class="row" id='displayFilter' style={{ position: 'absolute', background: '#dedede', zIndex: '1', paddingTop: '2%', width:'20%' }}>
                <div class="col-lg-3" style={{ width: '100%', maxHeight: '500px', overflowY: 'scroll' }}>
                  <div class="left_side_search_area">
                    <div class="left_side_search_boxed">
                      <div class="left_side_search_heading">
                        <h5>NetFare</h5>
                      </div>
                      <div class="tour_search_type">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefaultf1"
                            value={2}
                            onChange={(event) => { showNetFare == true ? setShowNetFare(false) : setShowNetFare(true) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaultf1"
                          >
                            <span class="area_flex_one">
                              <span>Show NetFare</span>
                              {/* <span>20</span> */}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="left_side_search_boxed">
                      <div class="left_side_search_heading">
                        <h5>Filter by price</h5>
                      </div>
                      <div class="filter-price">
                        <div id="price-slider" />
                        <input type="range" min="2000" max="80000" value={priceSlider} onChange={(event) => { handlePriceSlider(event) }} style={{ width: '100%' }} />
                        <p>Value: <span id="demo">Rs. {priceSlider}</span></p>
                      </div>
                      <button class="apply" type="button">
                        Apply
                      </button>
                    </div>
                    <div class="left_side_search_boxed">
                      <div class="left_side_search_heading">
                        <h5>Number of stops</h5>
                      </div>
                      <div class="tour_search_type">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefaultf1"
                            value={2}
                            checked={airStops.includes(2)}
                            onChange={(event) => { handleStopFilter(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaultf1"
                          >
                            <span class="area_flex_one">
                              <span>1 stop</span>
                              {/* <span>20</span> */}
                            </span>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefaultf2"
                            value={3}
                            checked={airStops.includes(3)}
                            onChange={(event) => { handleStopFilter(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaultf2"
                          >
                            <span class="area_flex_one">
                              <span>2 stop</span>
                              {/* <span>16</span> */}
                            </span>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefaultf4"
                            value={1}
                            checked={airStops.includes(1)}
                            onChange={(event) => { handleStopFilter(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaultf4"
                          >
                            <span class="area_flex_one">
                              <span>Non-stop</span>
                              {/* <span>22</span> */}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="left_side_search_boxed">
                      <div class="left_side_search_heading">
                        <h5>Airlines</h5>
                      </div>
                      <div class="tour_search_type">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            value={"AI"}
                            checked={airlines.includes("AI")}
                            id="flexCheckDefaults2"
                            onChange={(event) => { handleAirlinesFilter(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaults2"
                          >
                            <span class="area_flex_one">
                              <span>Air India</span>
                              {/* <span>14</span> */}
                            </span>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefaults3"
                            value={"IX"}
                            checked={airlines.includes("IX")}
                            onChange={(event) => { handleAirlinesFilter(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaults3"
                          >
                            <span class="area_flex_one">
                              <span>Air India Express</span>
                            </span>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefaults4"
                            value={"I5"}
                            checked={airlines.includes("I5")}
                            onChange={(event) => { handleAirlinesFilter(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaults4"
                          >
                            <span class="area_flex_one">
                              <span>Air Asia</span>
                            </span>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefaults5"
                            value={"G8"}
                            checked={airlines.includes("G8")}
                            onChange={(event) => { handleAirlinesFilter(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaults5"
                          >
                            <span class="area_flex_one">
                              <span>Go First</span>
                            </span>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefaults5"
                            value={"6E"}
                            checked={airlines.includes("6E")}
                            onChange={(event) => { handleAirlinesFilter(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaults5"
                          >
                            <span class="area_flex_one">
                              <span>IndiGo</span>
                            </span>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            value={"SG"}
                            checked={airlines.includes("SG")}
                            id="flexCheckDefaults1"
                            onChange={(event) => { handleAirlinesFilter(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaults1"
                          >
                            <span class="area_flex_one">
                              <span>SpiceJet</span>
                            </span>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefaults5"
                            value={"2T"}
                            checked={airlines.includes("2T")}
                            onChange={(event) => { handleAirlinesFilter(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaults5"
                          >
                            <span class="area_flex_one">
                              <span>TruJet</span>
                            </span>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            value={"UK"}
                            id="flexCheckDefaults5"
                            checked={airlines.includes("Uk")}
                            onChange={(event) => { handleAirlinesFilter(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaults5"
                          >
                            <span class="area_flex_one">
                              <span>Vistara</span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="left_side_search_boxed">
                      <div class="left_side_search_heading">
                        <h5>Refundable</h5>
                      </div>
                      <div class="tour_search_type">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefaultp1"
                            value={"true"}
                            onChange={(event) => { handleRefundable(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaultp1"
                          >
                            <span class="area_flex_one">
                              <span>Yes</span>
                              {/* <span>17</span> */}
                            </span>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefaultp2"
                            value={"false"}
                            onChange={(event) => { handleRefundable(event) }}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexCheckDefaultp2"
                          >
                            <span class="area_flex_one">
                              <span>No</span>
                              {/* <span>14</span> */}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class='col-lg-6'>
                    {(Contracts !== null && Object.keys(Contracts).length > 0) && Object.keys(Contracts).map((item, index) => {
                      let contractIds = [];
                      return (
                        <>
                          {Contracts[item][0].ContractType == 'Onword' && (
                            <>
                              <div class="row">
                                <div class="col-lg-12">
                                  <div class="flight_search_result_wrapper">
                                    <div class="flight_search_item_wrappper">
                                      <div class="flight_search_items">
                                        <div class="multi_city_flight_lists">
                                          <div class="flight_multis_area_wrapper">
                                            <div class="flight_search_left">
                                              <div class="flight_search_destination">
                                                <p>From</p>
                                                <h3>{Contracts[item][0].AirSegments[0].Origen}  <span className="time">{moment(new Date(Contracts[item][0].AirSegments[0].DepartureDateTime)).format('h:mm a')}</span></h3>
                                                <h6>{Contracts[item][0].AirSegments[0].Origen} - {Contracts[item][0].AirSegments[0].sourceAirportName}</h6>
                                              </div>
                                            </div>
                                            <div class="flight_search_middel">
                                              <div class="flight_right_arrow">
                                                <div class="flight_logo">
                                                  {Contracts[item][0].AirSegments[0].AirlineName}<br />
                                                  <span className="airlineName fw-500">
                                                    {Contracts[item][0].AirSegments[0].AirlineCode}{Contracts[item][0].AirSegments[0].FlightNumber}
                                                  </span>
                                                </div>
                                                <img src="https://yatriservice.com/assets/img/icon/right_arrow.png" alt="icon" />
                                                <h6>{Contracts[item][0].AirSegments.length === 1 ? 'Non-stop' : (Contracts[item][0].AirSegments.length - 1) + ' Stop(s)'}</h6>
                                                <p>{moment(new Date(Contracts[item][0].AirSegments[0].DepartureDateTime)).format('h:mm a')}-{moment(new Date(Contracts[item][0].AirSegments[Contracts[item][0].AirSegments.length - 1].ArrivalDateTime)).format('h:mm a')}</p>
                                                <p>{timeDiff(new Date(Contracts[item][0].AirSegments[0].DepartureDateTime), new Date(Contracts[item][0].AirSegments[Contracts[item][0].AirSegments.length - 1].ArrivalDateTime))}</p>
                                              </div>
                                              <div class="flight_search_destination">
                                                <p>To</p>
                                                <h3>{Contracts[item][0].AirSegments[Contracts[item][0].AirSegments.length - 1].Destination} <span className="time">{moment(new Date(Contracts[item][0].AirSegments[Contracts[item][0].AirSegments.length - 1].ArrivalDateTime)).format('h:mm a')}</span></h3>
                                                <h6>{Contracts[item][0].AirSegments[Contracts[item][0].AirSegments.length - 1].Destination} - {Contracts[item][0].AirSegments[Contracts[item][0].AirSegments.length - 1].destinationAirportName}</h6>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                        <div class="flight_search_right">
                                          <div class="tour_search_type">
                                            {filterContractByPrice(Contracts[item]).map((item3, index3) => {
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
                                                        checked={selectedContract.ContractId == item3.ContractId}
                                                        onClick={(e) => {
                                                          setSelectedContract(item3)
                                                          setSelectedIndex(index)
                                                          setSeatAvailable(prev => ({
                                                            ...prev,
                                                            [Contracts[item][0].AirSegments[0].FlightNumber]: item3.TotalSeats
                                                          }))
                                                          // seatAvailable = item3.TotalSeats
                                                        }}
                                                      />
                                                      <label class="form-check-label">
                                                        <span class="area_flex_one">
                                                          <span style={{ textTransform: 'uppercase' }}>({item3.FareType}) Rs. {item3.AirlineFare.GrossFare} <br /> Net Fare : Rs. {item3.AirlineFare.NetFare}</span>
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
                                                        checked={selectedContract.ContractId == item3.ContractId}
                                                        onClick={(e) => {
                                                          setSelectedContract(item3)
                                                          setSelectedIndex(index)
                                                          setSeatAvailable(prev => ({
                                                            ...prev,
                                                            [Contracts[item][0].AirSegments[0].FlightNumber]: item3.TotalSeats
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
                                          <div className="flight_search_right">
                                            {seatAvailable.hasOwnProperty(Contracts[item][0].AirSegments[0].FlightNumber) && (
                                              <p>{seatAvailable.hasOwnProperty(Contracts[item][0].AirSegments[0].FlightNumber) ? seatAvailable[Contracts[item][0].AirSegments[0].FlightNumber] : 0} Seat/s Left</p>
                                            )}
                                            <p
                                              style={{ cursor: 'pointer' }}
                                              onClick={() => getFareRule(bookingKey)}
                                            >
                                              View Fare Rules
                                            </p>
                                            <h6
                                              data-bs-toggle="collapse"
                                              data-bs-target={`#collapseExample_onward_${index}`}
                                              aria-expanded="false"
                                              aria-controls={`collapseExample_onward_${index}`}
                                            >
                                              Show more <i className="fas fa-chevron-down" />
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="flight_policy_refund collapse"
                                        id={`collapseExample_onward_${index}`}
                                        style={{width: '100%',overflowX: 'scroll'}}
                                      >
                                        {Contracts[item][0].AirSegments.map((item2, index2) => {
                                          return (
                                            <div className="flight_show_down_wrapper">
                                              <div className="flight-shoe_dow_item">
                                                <div className="airline-details">
                                                  <span className="airlineName fw-500">
                                                    {item2.AirlineName} &nbsp;  {item2.AirlineCode}{item2.FlightNumber}
                                                  </span>
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
                                                {index2 == (Contracts[item][0].AirSegments.length - 1) && (
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
                                                )}
                                                {index2 != (Contracts[item][0].AirSegments.length - 1) && (
                                                  <div className={`TabPanelInner flex_widht_less  col-6`}></div>
                                                )}
                                                <div className={`TabPanelInner ${index2 == (Contracts[item][0].AirSegments.length - 1) ? `col-7` : `col-11`}`}>
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
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )
                    })}
                  </div>
                  <div class='col-lg-6'>
                    {(ContractsRound !== null && Object.keys(ContractsRound).length > 0) && Object.keys(ContractsRound).map((item, index) => {
                      let contractIds = [];
                      return (
                        <>
                          {ContractsRound[item][0].ContractType == 'Onword' && (
                            <>
                              <div class="row">
                                <div class="col-lg-12">
                                  <div class="flight_search_result_wrapper">
                                    <div class="flight_search_item_wrappper">
                                      <div class="flight_search_items">
                                        <div class="multi_city_flight_lists">
                                          <div class="flight_multis_area_wrapper">
                                            <div class="flight_search_left">
                                              <div class="flight_search_destination">
                                                <p>From</p>
                                                <h3>{ContractsRound[item][0].AirSegments[0].Origen}  <span className="time">{moment(new Date(ContractsRound[item][0].AirSegments[0].DepartureDateTime)).format('h:mm a')}</span></h3>
                                                <h6>{ContractsRound[item][0].AirSegments[0].Origen} - {ContractsRound[item][0].AirSegments[0].sourceAirportName}</h6>
                                              </div>
                                            </div>
                                            <div class="flight_search_middel">
                                              <div class="flight_right_arrow">
                                                <div class="flight_logo">
                                                  {ContractsRound[item][0].AirSegments[0].AirlineName}<br />
                                                  <span className="airlineName fw-500">
                                                    {ContractsRound[item][0].AirSegments[0].AirlineCode}{ContractsRound[item][0].AirSegments[0].FlightNumber}
                                                  </span>
                                                </div>
                                                <img src="https://yatriservice.com/assets/img/icon/right_arrow.png" alt="icon" />
                                                <h6>{ContractsRound[item][0].AirSegments.length === 1 ? 'Non-stop' : (ContractsRound[item][0].AirSegments.length - 1) + ' Stop(s)'}</h6>
                                                <p>{moment(new Date(ContractsRound[item][0].AirSegments[0].DepartureDateTime)).format('h:mm a')}-{moment(new Date(ContractsRound[item][0].AirSegments[ContractsRound[item][0].AirSegments.length - 1].ArrivalDateTime)).format('h:mm a')}</p>
                                                <p>{timeDiff(new Date(ContractsRound[item][0].AirSegments[0].DepartureDateTime), new Date(ContractsRound[item][0].AirSegments[ContractsRound[item][0].AirSegments.length - 1].ArrivalDateTime))}</p>
                                              </div>
                                              <div class="flight_search_destination">
                                                <p>To</p>
                                                <h3>{ContractsRound[item][0].AirSegments[ContractsRound[item][0].AirSegments.length - 1].Destination} <span className="time">{moment(new Date(ContractsRound[item][0].AirSegments[ContractsRound[item][0].AirSegments.length - 1].ArrivalDateTime)).format('h:mm a')}</span></h3>
                                                <h6>{ContractsRound[item][0].AirSegments[ContractsRound[item][0].AirSegments.length - 1].Destination} - {ContractsRound[item][0].AirSegments[ContractsRound[item][0].AirSegments.length - 1].destinationAirportName}</h6>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                        <div class="flight_search_right">
                                          <div class="tour_search_type">
                                            {filterContractByPrice(ContractsRound[item]).map((item3, index3) => {
                                              contractIds[index3] = item3.ContractId;
                                              return (
                                                <>
                                                  {showNetFare ? (
                                                    <div class="form-check">
                                                      <input
                                                        class="form-check-input"
                                                        type="radio"
                                                        name={`radio_round_${index}`}
                                                        value={`${item3.ContractId}`}
                                                        checked={selectedRoundTripContract.ContractId == item3.ContractId}
                                                        onClick={(e) => {
                                                          setSelectedRoundTripContract(item3)
                                                          setSelectedRoundTripIndex(index)
                                                          setSeatAvailable(prev => ({
                                                            ...prev,
                                                            [ContractsRound[item][0].AirSegments[0].FlightNumber]: item3.TotalSeats
                                                          }))
                                                          // seatAvailable = item3.TotalSeats
                                                        }}
                                                      />
                                                      <label class="form-check-label">
                                                        <span class="area_flex_one">
                                                          <span style={{ textTransform: 'uppercase' }}>({item3.FareType}) Rs. {item3.AirlineFare.GrossFare} <br /> Net Fare : Rs. {item3.AirlineFare.NetFare}</span>
                                                        </span>
                                                      </label>
                                                    </div>
                                                  ) : (
                                                    <div class="form-check">
                                                      <input
                                                        class="form-check-input"
                                                        type="radio"
                                                        name={`radio_round_${index}`}
                                                        value={`${item3.ContractId}`}
                                                        checked={selectedRoundTripContract.ContractId == item3.ContractId}
                                                        onClick={(e) => {
                                                          setSelectedRoundTripContract(item3)
                                                          setSelectedRoundTripIndex(index)
                                                          setSeatAvailable(prev => ({
                                                            ...prev,
                                                            [ContractsRound[item][0].AirSegments[0].FlightNumber]: item3.TotalSeats
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
                                          <div className="flight_search_right">
                                            {seatAvailable.hasOwnProperty(ContractsRound[item][0].AirSegments[0].FlightNumber) && (
                                              <p>{seatAvailable.hasOwnProperty(ContractsRound[item][0].AirSegments[0].FlightNumber) ? seatAvailable[ContractsRound[item][0].AirSegments[0].FlightNumber] : 0} Seat/s Left</p>
                                            )}
                                            <p
                                              style={{ cursor: 'pointer' }}
                                              onClick={() => getFareRule(bookingKeyRound)}
                                            >
                                              View Fare Rules
                                            </p>
                                            <h6
                                              data-bs-toggle="collapse"
                                              data-bs-target={`#collapseExample_return_${index}`}
                                              aria-expanded="false"
                                              aria-controls={`collapseExample_return_${index}`}
                                            >
                                              Show more <i className="fas fa-chevron-down" />
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="flight_policy_refund collapse"
                                        id={`collapseExample_return_${index}`}
                                        style={{width: '100%',overflowX: 'scroll'}}
                                      >
                                        {ContractsRound[item][0].AirSegments.map((item2, index2) => {
                                          return (
                                            <div className="flight_show_down_wrapper">
                                              <div className="flight-shoe_dow_item">
                                                <div className="airline-details">
                                                  <span className="airlineName fw-500">
                                                    {item2.AirlineName} &nbsp;  {item2.AirlineCode}{item2.FlightNumber}
                                                  </span>
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
                                                {index2 == (ContractsRound[item][0].AirSegments.length - 1) && (
                                                  <div className="TabPanelInner flex_widht_less col-6" style={{ paddingBottom: '5%' }}>
                                                    <h4>Fare Breakups</h4>
                                                    <div class="tour_booking_amount_area">
                                                      <ul>
                                                        <li>Base Fare <span>{"Rs. " + ContractsRound[item][0].AirlineFare.BaseFare}</span></li>
                                                        <li>Tax Fare<span>{"Rs. " + ContractsRound[item][0].AirlineFare.TaxFare}</span></li>
                                                        <li>Service Charge <span>{"Rs. " + ContractsRound[item][0].AirlineFare.ServiceCharge}</span></li>
                                                      </ul>
                                                      <div class="tour_bokking_subtotal_area">
                                                        <h6>Subtotal <span>{"Rs. " + (ContractsRound[item][0].AirlineFare.BaseFare + ContractsRound[item][0].AirlineFare.TaxFare + ContractsRound[item][0].AirlineFare.ServiceCharge)}</span></h6>
                                                      </div>
                                                      <div class="coupon_add_area">
                                                        <h6>Commission
                                                          <span>{" - Rs. " + ContractsRound[item][0].AirlineFare.Commission}</span>
                                                        </h6>
                                                      </div>
                                                      <div class="total_subtotal_booking">
                                                        <h6>Total Amount <span>{"Rs. " + ContractsRound[item][0].AirlineFare.NetFare}</span> </h6>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                                {index2 != (ContractsRound[item][0].AirSegments.length - 1) && (
                                                  <div className={`TabPanelInner flex_widht_less  col-6`}></div>
                                                )}
                                                <div className={`TabPanelInner ${index2 == (ContractsRound[item][0].AirSegments.length - 1) ? `col-7` : `col-11`}`}>
                                                  <div style={{ float: 'right' }}>
                                                    <h4>Baggage</h4>
                                                    <div className="flight_info_taable">
                                                      <h3>{item2.Origen}-{ContractsRound[item][0].AirSegments[ContractsRound[item][0].AirSegments.length - 1].Destination}</h3>

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
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal show"
            style={{ display: `${showModal ? "block" : "none"}`, zIndex: '20000000' }}
          >
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Fare Rules</Modal.Title>
              </Modal.Header>

              <Modal.Body style={{
                maxHeight: '400px',
                overflowY: 'scroll'
              }}>
                {fareRule != "null" || htmlDecode(fareRule) != "" ? (
                  <div style={{ padding: '2%' }} dangerouslySetInnerHTML={{ __html: htmlDecode(fareRule) }} />
                ) : (
                  <p>Fare rules are not available at this moment, please connect with customer care.</p>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
            <div class="fixed_price">
              <div class="col-md-11 m-auto">
                <div class="row">
                  <div id="divOnwordSelection" class="col-6 col-sm-4 p-2">
                    <p class="head">
                      <span class="bg">Onword</span>
                      {(selectedContract !== null && Object.keys(selectedContract).length > 0) && (
                        <>
                        <span>{selectedContract.AirSegments[0].AirlineCode}-{selectedContract.AirSegments[0].AirlineName}</span><i class="fa fa-circle"></i><span>{moment(new Date(selectedContract.AirSegments[0].DepartureDateTime)).format("Do MMM YYYY")}</span>
                        </>
                      )}
                    </p>
                    <div class="box">
                      <div class="b1">
                      {(selectedContract !== null && Object.keys(selectedContract).length > 0) && (
                        <span class="time">{selectedContract.AirSegments[0].Origen}  <span className="time">{moment(new Date(selectedContract.AirSegments[0].DepartureDateTime)).format('h:mm a')}</span><i class="arrow fa fa-arrow-right"></i>{moment(new Date(selectedContract.AirSegments[selectedContract.AirSegments.length - 1].ArrivalDateTime)).format('h:mm a')}</span>
                      )}
                      </div>
                      <div class="b1">
                      {(selectedContract !== null && Object.keys(selectedContract).length > 0) && (
                        <span class="price">
                          RS. {selectedContract.AirlineFare.GrossFare}
                        </span>
                      )}
                      </div>
                    </div>
                  </div>
                  <div id="divReturnSelection" class="col-6 col-sm-4 p-2">
                  <p class="head">
                      <span class="bg">Return</span>
                      {(selectedRoundTripContract !== null && Object.keys(selectedRoundTripContract).length > 0) && (
                        <>
                        <span>{selectedRoundTripContract.AirSegments[0].AirlineCode}-{selectedRoundTripContract.AirSegments[0].AirlineName}</span><i class="fa fa-circle"></i><span>{moment(new Date(selectedRoundTripContract.AirSegments[selectedRoundTripContract.AirSegments.length - 1].ArrivalDateTime)).format('Do MMM YYYY')}</span>
                        </>
                      )}
                    </p>
                    <div class="box">
                      <div class="b1">
                      {(selectedRoundTripContract !== null && Object.keys(selectedRoundTripContract).length > 0) && (
                        <span class="time">{selectedRoundTripContract.AirSegments[0].Origen}  <span className="time">{moment(new Date(selectedRoundTripContract.AirSegments[0].DepartureDateTime)).format('h:mm a')}</span><i class="arrow fa fa-arrow-right"></i>{moment(new Date(selectedRoundTripContract.AirSegments[selectedRoundTripContract.AirSegments.length - 1].ArrivalDateTime)).format('h:mm a')}</span>
                      )}
                      </div>
                      <div class="b1">
                      {(selectedRoundTripContract !== null && Object.keys(selectedRoundTripContract).length > 0) && (
                        <span class="price">
                          RS. {selectedRoundTripContract.AirlineFare.GrossFare}
                        </span>
                      )}
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4 text-right">
                    <div class="totalfare">
                    {(selectedContract !== null && Object.keys(selectedContract).length > 0) && (selectedRoundTripContract !== null && Object.keys(selectedRoundTripContract).length > 0) && (
                      <span id="divTotal" class="fare">RS. {selectedContract.AirlineFare.GrossFare+selectedRoundTripContract.AirlineFare.GrossFare}</span>
                    )}
                      {/* <span class="over_link">Fare Details</span> */}
                    </div>
                    <button onClick={() => goToBooking()} className="btn_book"> Book now </button>
                    {/* <input type="button" class="btn_book" value="Book Now" onclick="ValidateRoundFare();" /> */}
                  </div>
                </div>
              </div>
            </div>
        </section>
      )}
    </>
  )
}