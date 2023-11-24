import Footer from '@/component/Footer'
import Header from '@/component/Header'
import React,{ useEffect, useState } from 'react'
import * as moment from 'moment'
import { useRouter } from 'next/router'
import LoadingSpinner from "../component/Loader";
import { useToasts } from 'react-toast-notifications';


export default function bookingPage() {
    const router = useRouter();
    const { addToast } = useToasts();
    const [Contracts, setContracts] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [formData, setFormData] = useState([]);
    const [agencyKey, setAgencyKey] = useState("81854E61-DB4D-4BC1-87BC-D30DAC649886");


    const [oneWayFrom, setOneWayFrom] = useState("DEL");
    const [oneWayTo, setOneWayTo] = useState("BOM");
    const [oneWayTravelDate, setOneWayTravelDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [currentDate, setCurrentDate] = useState("");
    const [oneWayTravelTotalPassenger, setOneWayTravelTotalPassenger] = useState(0);
    const [oneWayTravelAdult, setOneWayTravelAdult] = useState(0);
    const [oneWayTravelChildren, setOneWayTravelChildren] = useState(0);
    const [oneWayTravelInfant, setOneWayTravelInfant] = useState(0);
    const [oneWayTravelCabinClass, setOneWayTravelCabinClass] = useState("Economy");
    const [bookingKey, setBookingKey] = useState("");
    const [oneWayTotalTravellers, setOneWayTotalTravellers] = useState([]);

    useEffect(() => {
        if (Object.keys(router.query).length === 0) {
            router.push('/');
        }
        if (
            localStorage.getItem('userDetails') &&
            localStorage.getItem('userDetails') !== undefined
          ) {
            setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
          }
    }, [])

    const handleFieldChange = (e, i) => {
        const field = e.target.name;
        const newFormData = [...formData];
        newFormData[i - 1][field] = e.target.value;
        setFormData(newFormData);
    };

    useEffect(() => {
        if (Object.keys(router.query).length > 0) {
            setBookingKey(router.query.bookingKey)
            setContracts(JSON.parse(router.query.contractData))
            const travelForm = []
            for (let i = 1; i <= (parseInt(router.query.adultCount) + parseInt(router.query.childCount) + parseInt(router.query.InfantCount)); i++) {
                formData[i-1] = { Title: "Mr", FirstName: "", LastName: "", ContactNo: "", Email: "", State: "", Country: "" }
                travelForm.push(<>
                    {/* {i<=parseInt(router.query.adultCount) && (
                    <h4 class="heading_theme">Adult {i}</h4>
                    )}
                    {i>parseInt(router.query.adultCount) && i<parseInt(router.query.childCount) && (
                    <h4 class="heading_theme">Children {i}</h4>
                    )}
                    {i>parseInt(router.query.adultCount) && i<parseInt(router.query.childCount) && (
                    <h4 class="heading_theme">Infant {i}</h4>
                    )} */}
                    <h4 class="heading_theme">Traveller {i}</h4>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <select name='Title' onChange={(e) => handleFieldChange(e, i)} class="form-control form-select bg_input" required>
                                    <option value="Mr">Mr</option>
                                    <option value="Ms">Ms</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <input name='FirstName' type="text" onChange={(e) => handleFieldChange(e, i)} class="form-control bg_input"
                                    placeholder="First name*" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <input type="text" name='LastName' onChange={(e) => handleFieldChange(e, i)} class="form-control bg_input"
                                    placeholder="Last name*" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <input type="date" name='DateOfBirth' onChange={(e) => handleFieldChange(e, i)} class="form-control bg_input"
                                    placeholder="DOB*" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <input type="text" name='Email' onChange={(e) => handleFieldChange(e, i)} class="form-control bg_input"
                                    placeholder="Email address" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <input type="text" name='ContactNo' onChange={(e) => handleFieldChange(e, i)} class="form-control bg_input"
                                    placeholder="Mobile number*" required />
                            </div>
                        </div>

                    </div>
                </>);
            }
            setOneWayTotalTravellers(travelForm)
        }
    }, [router.query]);

    const handleSubmit = async () => {
        setIsLoading(true)
        let bodyFormData = new FormData();
        let ApiToken = ""
        bodyFormData.append("action", "pax_details");
        bodyFormData.append("BookingKey", bookingKey);
        bodyFormData.append("ContractId", Contracts.ContractId);
        await fetch("https://vrcwebsolutions.com/yatra/api/generateToken.php", {
            method: 'GET',
        })
            .then((response) => response.json())
            .then(async (response) => {
                if(response.ApiToken){
                    bodyFormData.append("APIToken", response.ApiToken);
                    ApiToken = response.ApiToken;
                    await fetch("https://vrcwebsolutions.com/yatra/api/api.php", {
                        method: 'POST',
                        body: bodyFormData
                    }).then((response) => response.json()).then(async (response) => {
                        if(response.Sell!==null){
                            let bookingFormData = new FormData();
                            bookingFormData.append("action", "book_flight");
                            bookingFormData.append("BookingKey", bookingKey);
                            bookingFormData.append("ContractId", Contracts.ContractId);
                            bookingFormData.append("APIToken", ApiToken);
                            bookingFormData.append("user_id", userDetails.id);
                            bookingFormData.append("TotalPrice", Contracts.AirlineFare.NetFare);
                            for (let i = 0; i < formData.length; i++) {
                                formData[i].PaxFare = response.Sell.Contracts[0].PexFareDetails[0];
                                formData[i].Gender = null;
                                formData[i].PaxType = response.Sell.Contracts[0].PexFareDetails[0].PaxType;
                                formData[i].DateOfBirth = moment(formData[i].DateOfBirth).format('DD-MM-YYYY');
                                formData[i].PassportNo = null;
                                formData[i].PassportExpiry = null;
                                formData[i].IsLeadPax = true;
                                formData[i].MealCode = "";
                                formData[i].BaggageCode = "";
                                formData[i].SeatCode = "";
                                formData[i].TicketNumber = null;
                            }
                            bookingFormData.append("Flightpassenger", JSON.stringify(formData));
                            await fetch("https://vrcwebsolutions.com/yatra/api/api.php", {
                                method: 'POST',
                                body: bookingFormData
                            }).then((response) => response.json()).then((response) => {
                                if (response !== null) {
                                    if (response.Status === 0) {
                                        addToast("Fly24 API response : " + response.Error.ErrorDesc, { appearance: 'error' });
                                    } else {
                                        router.push({
                                            pathname: '/bookingConfirmation',
                                            query: {
                                              contractData: JSON.stringify(Contracts),
                                              adultCount: router.query.adultCount,
                                              childCount: router.query.childCount,
                                              InfantCount: router.query.InfantCount,
                                              formData: JSON.stringify(formData),
                                              bookingId: response.BookingId,
                                              responseStatus: response.Error.ErrorCode
                                            }
                                          }, '/bookingConfirmation');
                                    }
                                }
                                setIsLoading(false)
                            })
                        }else{
                            setIsLoading(false)
                            addToast("Something went wrong, please try again later", { appearance: 'error' });
                        }
                    })
                }else{
                    setIsLoading(false)
                    addToast(`Error : ${response.Error.ErrorDesc} Something went wrong, please try again later`, { appearance: 'error' });
                }
            }
            )
    };


    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Header />
                    <>
                        <div class="search-overlay">
                            <div class="d-table">
                                <div class="d-table-cell">
                                    <div class="search-overlay-layer"></div>
                                    <div class="search-overlay-layer"></div>
                                    <div class="search-overlay-layer"></div>
                                    <div class="search-overlay-close">
                                        <span class="search-overlay-close-line"></span>
                                        <span class="search-overlay-close-line"></span>
                                    </div>
                                    <div class="search-overlay-form">
                                        <form>
                                            <input type="text" class="input-search" placeholder="Search here..." />
                                            <button type="button"><i class="fas fa-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section id="common_banner">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="common_bannner_text">
                                            <h2>Flight submission</h2>
                                            <ul>
                                                <li><a href="index.html">Home</a></li>
                                                <li><span><i class="fas fa-circle"></i></span><a href="flight-search-result.html">Flight
                                                    search </a></li>
                                                <li><span><i class="fas fa-circle"></i></span> Flight booking</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="tour_booking_submission" class="section_padding">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-8">
                                        <div class="tou_booking_form_Wrapper">
                                            <div class="booking_tour_form">
                                                <h3 class="heading_theme">Passenger information</h3>
                                                <div class="tour_booking_form_box">
                                                    <form id="tour_bookking_form_item">
                                                        {(Contracts !== null && Object.keys(Contracts).length > 0) && (
                                                            <>
                                                                {oneWayTotalTravellers}
                                                            </>
                                                        )}
                                                    </form>
                                                </div>
                                            </div>
                                            {/* <div class="booking_tour_form">
                                                <h3 class="heading_theme">Payment method</h3>
                                                <div class="tour_booking_form_box">
                                                    <div class="booking_payment_boxed">
                                                        <form action="https://andit.co/projects/html/and-tour/demo/!#" id="payment_checked">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                                    id="flexRadioDefault1" value="red" />
                                                                <label class="form-check-label" for="flexRadioDefault1">
                                                                    Payment by card
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                                    id="flexRadioDefault2" value="green" />
                                                                <label class="form-check-label" for="flexRadioDefault2">
                                                                    Paypal
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                                    id="flexRadioDefault3" value="black" />
                                                                <label class="form-check-label" for="flexRadioDefault3">
                                                                    Payoneer
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                                    id="flexRadioDefault4" value="white" />
                                                                <label class="form-check-label" for="flexRadioDefault4">
                                                                    Cash on delivery
                                                                </label>
                                                            </div>
                                                            <div class="payment_filed_wrapper">
                                                                <div class="payment_card payment_toggle red">
                                                                    <div class="row">
                                                                        <div class="col-lg-6">
                                                                            <div class="form-group">
                                                                                <input type="text" class="form-control bg_input"
                                                                                    placeholder="Card number" />
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6">
                                                                            <div class="form-group">
                                                                                <input type="text" class="form-control bg_input"
                                                                                    placeholder="Cardholder name" />
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6">
                                                                            <div class="form-group">
                                                                                <input type="text" class="form-control bg_input"
                                                                                    placeholder="Date of expiry" />
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6">
                                                                            <div class="form-group">
                                                                                <input type="text" class="form-control bg_input"
                                                                                    placeholder="Security code" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="paypal_payment payment_toggle green">
                                                                    <div class="row">
                                                                        <div class="col-lg-6">
                                                                            <div class="form-group">
                                                                                <input type="text" class="form-control bg_input"
                                                                                    placeholder="Email Address" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="payoneer_payment payment_toggle black">
                                                                    <div class="row">
                                                                        <div class="col-lg-6">
                                                                            <div class="form-group">
                                                                                <input type="text" class="form-control bg_input"
                                                                                    placeholder="Email Address" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div class="booking_tour_form_submit">
                                                {/* <div class="form-check write_spical_check">
                                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaultf1" />
                                                    <label class="form-check-label" for="flexCheckDefaultf1" >
                                                        I read and accept all <a href="terms-service.html">Terms and conditios</a>

                                                    </label>
                                                </div> */}
                                                <button onClick={handleSubmit} class="btn btn_theme btn_md">Book now</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="tour_details_right_sidebar_wrapper">
                                            <div class="tour_detail_right_sidebar">
                                                <div class="tour_details_right_boxed">
                                                    <div class="tour_details_right_box_heading">
                                                        <h3>Flights</h3>
                                                    </div>
                                                    <div class="flight_sidebar_right">
                                                        <div class="flight_search_left_sidebar">
                                                            <div class="flight_search_destination_sidebar">
                                                                <p>From</p>
                                                                <h3>{(Contracts !== null && Object.keys(Contracts).length > 0) ? Contracts !== undefined && Contracts.AirSegments[0].Origen : ""}</h3>
                                                                <h6>{(Contracts !== null && Object.keys(Contracts).length > 0) && Contracts !== undefined ? Contracts.AirSegments[0].Origen : ""} - {(Contracts !== null && Object.keys(Contracts).length > 0) ? Contracts !== undefined && Contracts.AirSegments[0].sourceAirportName : ""}</h6>
                                                            </div>
                                                        </div>
                                                        <div class="flight_search_middel_sidebar">
                                                            <div class="flight_right_arrow_sidebar">
                                                                <img src="assets/img/icon/right_arrow.png" alt="icon" />
                                                                <h6>{(Contracts !== null && Object.keys(Contracts).length > 0) ? Contracts.AirSegments[0].NumberofStops === 0 ? 'Non-stop' : Contracts.AirSegments[0].NumberofStops + ' Stop' : ""}</h6>
                                                                <p>{(Contracts !== null && Object.keys(Contracts).length > 0) ? moment(new Date(Contracts.AirSegments[0].DepartureDateTime)).format('h:mm a') : ""}-{(Contracts !== null && Object.keys(Contracts).length > 0) ? moment(new Date(Contracts.AirSegments[0].ArrivalDateTime)).format('h:mm a') : ""}</p>
                                                            </div>
                                                            <div class="flight_search_destination_sidebar">
                                                                <p>To</p>
                                                                <h3>{(Contracts !== null && Object.keys(Contracts).length > 0) ? Contracts.AirSegments[0].Destination : ""} </h3>
                                                                <h6>{(Contracts !== null && Object.keys(Contracts).length > 0) ? Contracts.AirSegments[0].Destination : ""} - {(Contracts !== null && Object.keys(Contracts).length > 0) ? Contracts.AirSegments[0].destinationAirportName : ""} </h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div class="tour_package_details_bar_list">
                                                        <h5>Package rules</h5>
                                                        <ul>
                                                            <li><i class="fas fa-circle"></i>Buffet breakfast as per the Itinerary</li>
                                                            <li><i class="fas fa-circle"></i>Visit eight villages showcasing Polynesian
                                                                culture
                                                            </li>
                                                            <li><i class="fas fa-circle"></i>Complimentary Camel safari, Bonfire,</li>
                                                            <li><i class="fas fa-circle"></i>All toll tax, parking, fuel, and driver
                                                                allowances
                                                            </li>
                                                            <li><i class="fas fa-circle"></i>Comfortable and hygienic vehicle</li>
                                                        </ul>
                                                    </div> */}
                                                    <div class="tour_package_details_bar_price">
                                                        <h5>Price</h5>
                                                        <div class="tour_package_bar_price">
                                                            {/* <h6><del> 35,500 Rs</del></h6> */}
                                                            <h3> {(Contracts !== null && Object.keys(Contracts).length > 0) ? "Rs. " + Contracts.AirlineFare.BaseFare : ""}<sub> / Seats X {(Contracts !== null && Object.keys(Contracts).length > 0) ? parseInt(router.query.adultCount) + parseInt(router.query.childCount) + parseInt(router.query.InfantCount) : 0}</sub> </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tour_detail_right_sidebar">
                                                <div class="tour_details_right_boxed">
                                                    <div class="tour_details_right_box_heading">
                                                        <h3>Travel date</h3>
                                                    </div>
                                                    <div class="edit_date_form">
                                                        <div class="form-group">
                                                            {/* <label for="dates">Edit Date</label> */}
                                                            <input type="date" disabled={true} value={(Contracts !== null && Object.keys(Contracts).length > 0) ? moment(Contracts.AirSegments[0].DepartureDateTime).format('YYYY-MM-DD') : ""} class="form-control" id="dates" />
                                                        </div>
                                                    </div>
                                                    <div class="tour_package_details_bar_list">
                                                        <h5>Tourist</h5>
                                                        <div class="select_person_item">
                                                            <div class="select_person_left">
                                                                <h6>Adult</h6>
                                                                <p>12y+</p>
                                                            </div>
                                                            <div class="select_person_right">
                                                                <h6>{(Contracts !== null && Object.keys(Contracts).length > 0) ? router.query.adultCount : 0}</h6>
                                                            </div>
                                                        </div>

                                                        <div class="select_person_item">
                                                            <div class="select_person_left">
                                                                <h6>Children</h6>
                                                                <p>2 - 12 years</p>
                                                            </div>
                                                            <div class="select_person_right">
                                                                <h6>{(Contracts !== null && Object.keys(Contracts).length > 0) ? router.query.childCount : 0}</h6>
                                                            </div>
                                                        </div>
                                                        <div class="select_person_item">
                                                            <div class="select_person_left">
                                                                <h6>Infant</h6>
                                                                <p>Below 2 years</p>
                                                            </div>
                                                            <div class="select_person_right">
                                                                <h6>{(Contracts !== null && Object.keys(Contracts).length > 0) ? router.query.InfantCount : 0}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div class="edit_person">
                                                        <p>Edit person</p>
                                                    </div> */}
                                                </div>
                                            </div>
                                            {/* <div class="tour_detail_right_sidebar">
                                                <div class="tour_details_right_boxed">
                                                    <div class="tour_details_right_box_heading">
                                                        <h3>Coupon code</h3>
                                                    </div>
                                                    <div class="coupon_code_area_booking">
                                                        <form action="#!">
                                                            <div class="form-group">
                                                                <input type="text" class="form-control bg_input"
                                                                    placeholder="Enter coupon code" />
                                                            </div>
                                                            <div class="coupon_code_submit">
                                                                <button class="btn btn_theme btn_md">Apply voucher</button>
                                                            </div>
                                                        </form>
                                                    </div>

                                                </div>
                                            </div> */}
                                            <div class="tour_detail_right_sidebar">
                                                <div class="tour_details_right_boxed">
                                                    <div class="tour_details_right_box_heading">
                                                        <h3>Booking amount</h3>
                                                    </div>

                                                    <div class="tour_booking_amount_area">
                                                        <ul>
                                                            <li>Base Fare <span>{(Contracts !== null && Object.keys(Contracts).length > 0) ? "Rs. " + Contracts.AirlineFare.BaseFare : 0}</span></li>
                                                            <li>Tax Fare<span>{(Contracts !== null && Object.keys(Contracts).length > 0) ? "Rs. " + Contracts.AirlineFare.TaxFare : 0}</span></li>
                                                            <li>Service Charge <span>{(Contracts !== null && Object.keys(Contracts).length > 0) ? "Rs. " + Contracts.AirlineFare.ServiceCharge : 0}</span></li>
                                                        </ul>
                                                        <div class="tour_bokking_subtotal_area">
                                                            <h6>Subtotal <span>{(Contracts !== null && Object.keys(Contracts).length > 0) ? "Rs. " + (Contracts.AirlineFare.BaseFare + Contracts.AirlineFare.TaxFare + Contracts.AirlineFare.ServiceCharge) : 0}</span></h6>
                                                        </div>
                                                        <div class="coupon_add_area">
                                                            <h6>Commission
                                                                <span>{(Contracts !== null && Object.keys(Contracts).length > 0) ? " - Rs. " + Contracts.AirlineFare.Commission : 0}</span>
                                                            </h6>
                                                        </div>
                                                        <div class="total_subtotal_booking">
                                                            <h6>Total Amount <span>{(Contracts !== null && Object.keys(Contracts).length > 0) ? "Rs. " + Contracts.AirlineFare.NetFare : 0}</span> </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="cta_area">
                            <div class="container">
                                <div class="row align-items-center">
                                    <div class="col-lg-7">
                                        <div class="cta_left">
                                            <div class="cta_icon">
                                                <img src="assets/img/common/email.png" alt="icon" />
                                            </div>
                                            <div class="cta_content">
                                                <h4>Get the latest news and offers</h4>
                                                <h2>Subscribe to our newsletter</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="cat_form">
                                            <form id="cta_form_wrappper">
                                                <div class="input-group"><input type="text" class="form-control"
                                                    placeholder="Enter your mail address" /><button class="btn btn_theme btn_md"
                                                        type="button">Subscribe</button></div>
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
