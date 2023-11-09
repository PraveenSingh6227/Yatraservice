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
          }
        })
      }

    const signOut = ()=>{
        localStorage.removeItem('userDetails')
        setUserDetails({})
        router.push('/')
      }

    const downloadTicket = (item) => {
        const html = `<html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <title></title>
            <style type="text/css">
                p{
                    margin: 0px !important;
                }
                .container {
                    width:800px;
                }
            </style>
        </head>
        <body>
        <div>
            <div class="container" style="border:1px solid #000">
                <div class="row">
                    <div class="col-sm-2">
                        <img src="img/download.jpg" class="img-fluid" style="height: 125px;">
                    </div>
                    <div class="col-sm-10">
                        <p class="text-end">TRAVELS D K</p>
                        <p class="text-end">S/O : RAMESH CHANDRA, ASAINAPUR, ASAINA, KANPUR. DEHAT ASIANAPUR,</p>
                        <p class="text-end">UTTAR PRADESH-209301,</p>
                        <p class="text-end">Kanpur,</p>
                        <p class="text-end">INDIA, Phone : 9818877541</p>
                        <p class="text-end">Email Id : traveldk286@gmail.com</p>
                    </div>
        
                </div>
        <div class="row" style="border-top:1px solid #000;border-bottom:1px solid #000">
        
                <div class="col-sm-6">
                <p  class="text-start">Your e-Ticket</p>
                </div>
                
                <div class="col-sm-6"><p class="text-end">3-Sep-2023</p></div>
            </div>
            <div class="row" style="border-top:1px solid #000;border-bottom:1px solid #000">
        
                <div class="col-sm-6">
                    <img src="img/1.png" height="25px">
                <p  class="text-start">Air Asia-I5 775</p>
                </div>
                
                <div class="col-sm-6">
                    <h3 class="text-end">Booking Reference : E3512J</h3>
                <h3 class="text-end">Ticket Status : Booked</h3></div>
            </div>
            <table class="table">
          <thead>
            <tr>
              <th scope="col">Departure </th>
              <th scope="col">Arrival</th>
              <th scope="col">Flight No </th>
              <th scope="col">Class </th>
              <th scope="col">Pnr</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                  <p>Guwahati[GAU]</p>
        <p>04/09/2023 22:45</p></td>
              <td><p>Delhi[DEL]</p>
                  <p>5/09/2023 01:25 </p></td>
              <td>I5-775</td>
              <td>BT </td>
              <td>E3512J</td>
            </tr>
            
          </tbody>
        </table>
        <h4>Pax Details Customer Contact No:6900286627</h4>
            <table class="table">
          <thead>
            <tr>
              <th scope="col">Passenger Name</th>
              <th scope="col">Ticket No</th>
              <th scope="col">Baggage </th>
              <th scope="col">Meal</th>
              <th scope="col">Seat </th>
              <th scope="col">Refundable  </th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ms NIMA ZANGMU(Adult) </td>
              <td>3512J </td>
              <td>15 KG </td>
              <td>BT </td>
              <td>NA</td>
              <td>Yes</td>
              <td>Booked</td>
            </tr>
            <tr>
              <td>Ms NIMA ZANGMU(Adult) </td>
              <td>3512J </td>
              <td>15 KG </td>
              <td>BT </td>
              <td>NA</td>
              <td>Yes</td>
              <td>Booked</td>
            </tr>
            <tr>
              <td>Ms NIMA ZANGMU(Adult) </td>
              <td>3512J </td>
              <td>15 KG </td>
              <td>BT </td>
              <td>NA</td>
              <td>Yes</td>
              <td>Booked</td>
            </tr>
            
          </tbody>
        </table>
        
        
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Basic Fare</th>
              <th scope="col">Tax & Others </th>
              <th scope="col">ross Amount</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>INR 16616 </td>
              <td>INR 8804</td>
              <td>NR 25420</td>
              
            </tr>
           
            
          </tbody>
        </table>
        
        
        <h5>Term And Condition</h5>
        <ul>
            <li>All passengers must produce a valid photo identification proof at the time of check in.</li>
            <li> Guests will be subjected to a security screening prior to boarding the aircraft. This is mandatory per Indian
        Regulations.</li>
            <li> For Flights within Indian Check-in counters open 3 hours prior to departure of flights and close 1 hour prior to
        departure of flights. You may be denied boarding if you do not report in time.
        </li>
            <li>For International flights Check-in usually starts 3 hours prior to departure, and Check- in counters will be closed
        75 minutes before departure time for all classes of guests.
        </li>
            <li>Flight timings are subject to change without prior notice. Please recheck with the carrier prior to departure</li>
            <li>For Fare Rules/ Cancellation policty-refer to fare rules laid by the carrier.</li>
            <li> While compliling the all above information, we have endeavored to ensure that all information is correct.
        However, no guarantee or representation is made to the accuracy or completenses of the information contained
        here. This information is cubject to changes by airlines without notice.
        </li>
            <li>For bookints made under class HBO fare, each of the passenger shall be allowed to carry only one(01) piece of
        luggage of maximum seven(07) kg. of weight (having maximum overall dimensions of:115 cms. (L+W+H) on
        Boeigng aircarft and 108 cms(L+W+H) on Bombardier aircarft).</li>
        </ul>
        
        
        
        
        </div>
            
        </div>
        </body>
        </html>`
        const doc = new jsPDF("p", "pt", "letter");
        doc.html(html, {
        callback: function (doc) {
            doc.save('sample.pdf');
        }
        });
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
                                                            <h3>Total bookings</h3>
                                                            <h1>{myBookings.length}</h1>
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
                                                            <h1>0</h1>
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
                                                            <th>Download Ticket</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {myBookings.map((item, i) => (
                                                        <tr>
                                                            <td>{i+1}</td>
                                                            <td>{JSON.parse(item.booking_response).BookingId}</td>
                                                            <td>Flight</td>
                                                            <td>{'Rs. '+item.total_price}</td>
                                                            <td class="complete">Completed</td>
                                                            <td>{moment(new Date(item.created_at)).format('DD-MM-YYYY h:mm a')}</td>
                                                            <td><a href='javascript:void(0)' onClick={(e) => downloadTicket(item)}><i class="fas fa-download"></i></a></td>
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
