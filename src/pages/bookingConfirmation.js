import React, { useEffect, useState } from 'react'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import * as moment from 'moment'
import { useRouter } from 'next/router'
import LoadingSpinner from "../component/Loader";


export default function bookingConfirmation() {
    const router = useRouter();
    const [Contracts, setContracts] = useState({});
    const [oneWayTotalTravellers, setOneWayTotalTravellers] = useState([]);
    const [formData, setFormData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [BookingId, setBookingId] = useState("");
    const [userDetails, setUserDetails] = useState({});


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

    useEffect(() => {
        if (Object.keys(router.query).length > 0) {
            setContracts(JSON.parse(router.query.contractData))
            setFormData(JSON.parse(router.query.formData))
            setBookingId(router.query.bookingId)
            setOneWayTotalTravellers(parseInt(router.query.adultCount) + parseInt(router.query.childCount) + parseInt(router.query.InfantCount))
        }
        setIsLoading(false)
    }, [router.query]);


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
                                            <h2>Booking Confirmation</h2>
                                            <ul>
                                                <li><a href="index.html">Home</a></li>
                                                <li><span><i class="fas fa-circle"></i></span> Booking</li>
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
                                            <div class="tour_booking_form_box mb-4">
                                                <div class="booking_success_arae">
                                                    <div class="booking_success_img">
                                                        <img src="assets/img/icon/right.png" alt="img" />
                                                    </div>
                                                    <div class="booking_success_text">
                                                        <h3>{userDetails.name}, your order was submitted successfully!</h3>
                                                        <h6>Your booking details has been sent to: {userDetails.email}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="booking_tour_form">
                                                <h3 class="heading_theme">Your information</h3>
                                                <div class="tour_booking_form_box">
                                                    <div class="your_info_arae">
                                                        <ul>
                                                            <li><span class="name_first">First name:</span> <span
                                                                class="last_name">{router.query !== null && Object.keys(router.query).length > 0 && formData.length > 0 && formData[0].Title + ' ' + formData[0].FirstName}</span></li>
                                                            <li><span class="name_first">Last name:</span> <span
                                                                class="last_name">{router.query !== null && Object.keys(router.query).length > 0 && formData.length > 0 && formData[0].LastName}</span></li>
                                                            <li><span class="name_first">Email address:</span> <span
                                                                class="last_name">{router.query !== null && Object.keys(router.query).length > 0 && formData.length > 0 && formData[0].Email}</span></li>
                                                            <li><span class="name_first">Address:</span> <span class="last_name">{router.query !== null && Object.keys(router.query).length > 0 && formData.length > 0 && formData[0].address}</span></li>
                                                            <li><span class="name_first">State:</span> <span class="last_name">{router.query !== null && Object.keys(router.query).length > 0 && formData.length > 0 && formData[0].state}</span>
                                                            </li>
                                                            <li><span class="name_first">Country:</span> <span class="last_name">{router.query !== null && Object.keys(router.query).length > 0 && formData.length > 0 && formData[0].country}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="tour_details_right_sidebar_wrapper">
                                            <div class="tour_detail_right_sidebar">
                                                <div class="tour_details_right_boxed">
                                                    <div class="tour_details_right_box_heading">
                                                        <h3>Booking details</h3>
                                                    </div>
                                                    <div class="tour_booking_amount_area">
                                                        <ul>
                                                            <li>Booking ID: <span>{Object.keys(router.query).length > 0 && '#' + BookingId}</span></li>
                                                            <li>Booking date: <span>{router.query !== null && Object.keys(router.query).length > 0 && moment(new Date()).format('DD-MM-YYYY')}</span></li>
                                                            {/* <li>Payment method: <span>Bank transfer</span></li> */}
                                                            <li>Booking status: <span>Success</span></li>
                                                        </ul>
                                                        <ul>
                                                            <li>Traveller Price x {Contracts !== null && Object.keys(router.query).length > 0 && oneWayTotalTravellers} <span>{Object.keys(router.query).length > 0 && "Rs. " + Contracts.AirlineFare.BaseFare}</span></li>
                                                            <li>Tax Fare <span>{(Contracts !== null && Object.keys(router.query).length > 0) ? "Rs. " + Contracts.AirlineFare.TaxFare : 0}</span></li>
                                                            <li>Service Charge <span>{(Contracts !== null && Object.keys(router.query).length > 0) ? "Rs. " + Contracts.AirlineFare.ServiceCharge : 0}</span></li>
                                                        </ul>
                                                        <div class="tour_bokking_subtotal_area">
                                                            <h6 class="remove_coupon_tour">Subtotal <span>{(Contracts !== null && Object.keys(router.query).length > 0) ? "Rs. " + (Contracts.AirlineFare.BaseFare + Contracts.AirlineFare.TaxFare + Contracts.AirlineFare.ServiceCharge) : 0}</span></h6>
                                                        </div>
                                                        <div class="coupon_add_area">
                                                            <h6>Commission
                                                                <span>{(Contracts !== null && Object.keys(router.query).length > 0) ? " - Rs. " + Contracts.AirlineFare.Commission : 0}</span>
                                                            </h6>
                                                        </div>
                                                        <div class="total_subtotal_booking">
                                                            <h6 class="remove_coupon_tour">Total Amount <span>{(Contracts !== null && Object.keys(router.query).length > 0) ? "Rs. " + Contracts.AirlineFare.NetFare : 0}</span> </h6>
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
