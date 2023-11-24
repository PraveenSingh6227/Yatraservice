import Header from '@/component/Header'
import Footer from '@/component/Footer'
import { useRouter } from 'next/navigation'
import React,{ useEffect, useState } from 'react'
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';
import LoadingSpinner from "../component/Loader";
import * as moment from 'moment'
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";



export default function UserDashboard() {

    const { addToast } = useToasts();
    const router = useRouter()
    const [userDetails, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [myBookings, setMyBookings] = useState([]);
    const [confirmBooking, setConfirmBooking] = useState([]);
    const [pendingBooking, setPendingBooking] = useState([]);

    useEffect(() => {
        if (
          localStorage.getItem('userDetails') &&
          localStorage.getItem('userDetails') !== undefined
        ) {
          setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
          let userData = JSON.parse(localStorage.getItem('userDetails'))
          getMyBookings(userData.id)
        }else{
            router.push('/')
        }
      },[]);

      const getMyBookings = async (user_id) => {
        setIsLoading(true)
        let bodyFormData = new FormData();
        bodyFormData.append("action", "get_my_bookings");
        bodyFormData.append("user_id", user_id);
        await fetch("https://vrcwebsolutions.com/yatra/api/api.php", {
          method: 'POST',
          body: bodyFormData
        }).then((response) => response.json()).then((response) => {
          setIsLoading(false)
          if (response !== null) {
            setMyBookings(response.booking)
            setConfirmBooking(response.completeBooking)
            setPendingBooking(response.pendingBooking)
          }
        })
      }

    const signOut = ()=>{
        localStorage.removeItem('userDetails')
        setUserDetails({})
        router.push('/')
      }

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
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
                        <section id="common_banner">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="common_bannner_text">
                                            <h2>Customer dashboard</h2>
                                            <ul>
                                                <li><a href="index.html">Home</a></li>
                                                <li><span><i class="fas fa-circle"></i></span>Customer dashboard</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="dashboard_main_arae" class="section_padding">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="dashboard_sidebar">
                                            <div class="dashboard_sidebar_user">
                                                <img src="assets/img/common/how-3.png" alt="img" />
                                                <h3>{userDetails.name}</h3>
                                                <p><a href={`tel:${userDetails.name}`}>{userDetails.mobile}</a></p>
                                                <p><a href="mailto:sherlyn@domain.com">{userDetails.email}</a></p>
                                            </div>
                                            <div class="dashboard_menu_area">
                                                <ul>
                                                    <li><Link href="/UserDashboard" class="active"><i
                                                        class="fas fa-tachometer-alt"></i>Dashboard</Link></li>
                                                    {/* <li class="dashboard_dropdown_button" id="dashboard_dropdowns"><i
                                                        class="fas fa-address-card"></i>My bookings
                                                        <span> <i class="fas fa-angle-down"></i></span>
                                                        <div class="booing_sidebar_dashboard" id="show_dropdown_item"
                                                          >
                                                            <ul>
                                                                <li><a href="hotel-booking.html"><i class="fas fa-hotel"></i>Hotel
                                                                    booking</a></li>
                                                                <li><a href="flight-booking.html"><i class="fas fa-paper-plane"></i>Flight
                                                                    booking</a></li>
                                                                <li>
                                                                    <a href="tour-booking.html">
                                                                        <i class="fas fa-map"></i>Tour booking
                                                                    </a>
                                                                </li>
                                                                <li><a href="booking-history.html">
                                                                    <i class="fas fa-history"></i>Booking history</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li> */}
                                                    {/* <li><a href="my-profile.html"><i class="fas fa-user-circle"></i>My profile</a></li>
                                                    <li><a href="wallet.html"><i class="fas fa-wallet"></i>Wallet</a></li>
                                                    <li><a href="notification.html"><i class="fas fa-bell"></i>Notifications</a></li> */}
                                                    <li>
                                                        {/* <button onClick={signOut()} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                            <i class="fas fa-sign-out-alt"></i>Logout
                                                        </button> */}
                                                        <a onClick={()=> signOut()}>
                                                            <i class="fas fa-sign-out-alt"></i>Logout
                                                        </a> 
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="dashboard_main_top">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="dashboard_top_boxed">
                                                        <div class="dashboard_top_icon">
                                                            <i class="fas fa-shopping-bag"></i>
                                                        </div>
                                                        <div class="dashboard_top_text">
                                                            <h3>Confirmed bookings</h3>
                                                            <h1>{confirmBooking}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="dashboard_top_boxed">
                                                        <div class="dashboard_top_icon">
                                                            <i class="fas fa-sync"></i>
                                                        </div>
                                                        <div class="dashboard_top_text">
                                                            <h3>Pending bookings</h3>
                                                            <h1>{pendingBooking}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dashboard_common_table">
                                            <h3>My bookings</h3>
                                            <div class="table-responsive-lg table_common_area">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Sl no.</th>
                                                            <th>Booking ID</th>
                                                            <th>Booking type</th>
                                                            <th>Booking amount</th>
                                                            <th>Status</th>
                                                            <th>Date of Booking</th>
                                                            <th>Print Ticket</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {myBookings.map((item, i) => (
                                                        <tr>
                                                            <td>{i+1}</td>
                                                            {/* <td>{JSON.parse(item.booking_response).BookingId}</td> */}
                                                            <td>{item.booking_id}</td>
                                                            <td>Flight</td>
                                                            <td>{'Rs. '+item.total_price}</td>
                                                            {/* <td class="complete">{JSON.parse(item.booking_response).BookingId ? 'Completed' : 'Pending'}</td> */}
                                                            <td>
                                                            {JSON.parse(item.booking_response).BookingId ? (
                                                                <p style={{color:'#21be1d'}}>Confirmed</p>
                                                            ):(
                                                                <p style={{color:'#f3ae0b'}}>Pending</p>
                                                            )}
                                                            </td>
                                                            <td>{moment(new Date(item.created_at)).format('DD-MM-YYYY h:mm a')}</td>
                                                            <td>
                                                            {JSON.parse(item.booking_response).BookingId ? (
                                                                <Link 
                                                            // href={`downloadTicket/${item.id}`} 
                                                            href="/[id]"
                                                            as={`ticket/${item.id}`}
                                                            target='_bank'><i class="fas fa-print"></i></Link>
                                                            ) : (
                                                                <p>N/A</p>
                                                            )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                        {/* <tr>
                                                            <td>05.</td>
                                                            <td>#JK589V80</td>
                                                            <td>Hotel</td>
                                                            <td>7540.00 Rs.</td>
                                                            <td class="cancele">Canceled</td>
                                                            <td><i class="fas fa-eye"></i></td>
                                                        </tr> */}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        {/* <div class="pagination_area">
                                            <ul class="pagination">
                                                <li class="page-item">
                                                    <a class="page-link" href="#" aria-label="Previous">
                                                        <span aria-hidden="true">«</span>
                                                        <span class="sr-only">Previous</span>
                                                    </a>
                                                </li>
                                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#" aria-label="Next">
                                                        <span aria-hidden="true">»</span>
                                                        <span class="sr-only">Next</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div> */}
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
