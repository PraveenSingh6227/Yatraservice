import Footer from '@/component/Footer'
import Header from '@/component/Header'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import * as moment from 'moment'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications';
import jsPDF from "jspdf";
import LoadingSpinner from "../component/Loader";




export default function DownloadTicket() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const ticketId = searchParams.get('ticket')
    const [myBookings, setMyBookings] = useState({});
    const [travellers, setTravellers] = useState([]);
    const [bookingResponse, setBookingResponse] = useState({});
    const [contract, setContract] = useState([]);
    const [contractOld, setContractOld] = useState([]);
    const [flightPassenger, setFlightPassenger] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const handlePrint = () => {
        let w = window.open(`/downloadTicket?ticket=${ticketId}`);
        w.document.write($('#printArea').html());
        w.print();
        w.close();
    };

    useEffect(() => {
        if (
          localStorage.getItem('userDetails') &&
          localStorage.getItem('userDetails') !== undefined
        ) {
          getMyBookings()
        }else{
            router.push('/')
        }
      },[ticketId!=undefined]);

      const getMyBookings = async () => {
        if(ticketId!==undefined){
            setIsLoading(true)
            let bodyFormData = new FormData();
            bodyFormData.append("action", "get_booking_details");
            bodyFormData.append("booking_id", ticketId);
            await fetch("https://yatriservice.com/admin/api/api.php", {
              method: 'POST',
              body: bodyFormData
            }).then((response) => response.json()).then(async(response) => {
              setIsLoading(false)
              if (response !== null) {
                setMyBookings(response.booking)
                setBookingResponse(JSON.parse(response.booking.booking_response))
                setContractOld([JSON.parse(response.booking.Contracts)])
                setTravellers(JSON.parse(response.booking.customer_data))
                // console.log('response--->',response,response.booking.booking_key,JSON.parse(response.booking.booking_response).BookingId)              
                let newBodyFormData = new FormData();
                newBodyFormData.append("BookingId", JSON.parse(response.booking.booking_response).BookingId);
                newBodyFormData.append("BookingKey", response.booking.booking_key);
                newBodyFormData.append("action", "get_flight_booking_details");
                await fetch("https://yatriservice.com/admin/api/generateToken.php", {
                    method: 'GET',
                })
                    .then((response) => response.json())
                    .then(async (response) => {
                        if(response.ApiToken){
                            newBodyFormData.append("APIToken", response.ApiToken);
                            await fetch("https://yatriservice.com/admin/api/api.php", {
                                method: 'POST',
                                body: newBodyFormData
                            }).then((response) => response.json()).then((bookingResp) => {
                                // console.log('bookingResp--->',bookingResp)
                                // setTravellers(bookingResp.Flightpassenger)
                                setContract(bookingResp.Contracts)
                            })  
                        }
                })       
             



              }
            })
        }
      }

    return (
        <>
        {isLoading ? (
                <LoadingSpinner />
            ) : (
            <div>
                 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
                 <div className='col-md-4 col-md-offset-4' style={{marginLeft:"46%",padding:'1%'}}>
                    <button className='btn btn-primary' onClick={() => handlePrint()}>Print Ticket</button>
                 </div>
                <div class="container" id='printArea' style={{ border: '1px solid #000' }}>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
                {/* {console.log('travellers--->',travellers)} */}
                    <div class="row">
                        <div class="col-sm-3">
                            <img src="https://yatriservice.com/assets/img/logo2.png" class="img-fluid" style={{ height: '125px' }} />
                        </div>
                        <div class="col-sm-9">
                            <p class="text-end">{myBookings.name}</p>
                            <p class="text-end">S/O : RAMESH CHANDRA, ASAINAPUR, ASAINA, KANPUR. DEHAT ASIANAPUR,</p>
                            <p class="text-end">UTTAR PRADESH-209301,</p>
                            <p class="text-end">Kanpur,</p>
                            <p class="text-end">INDIA, Phone : {myBookings.mobile}</p>
                            <p class="text-end">Email Id : {myBookings.email}</p>
                        </div>

                    </div>
                    <div class="row" style={{ borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>

                        <div class="col-sm-6">
                            <p class="text-start">Your e-Ticket</p>
                        </div>

                        <div class="col-sm-6"><p class="text-end">{moment(new Date(myBookings.created_at)).format('Do MMM YYYY h:mm:a')}</p></div>
                    </div>
                    <div class="row" style={{ bordeTop: '1px solid #000', borderBottom: '1px solid #000' }}>

                        <div class="col-sm-6">
                            {/* <img src="img/1.png" height="25px" /> */}
                            <p class="text-start">{contract!=null && contract.length > 0 ? contract[0].AirSegments[0].AirlineCode : contractOld.length>0 && contractOld[0].AirSegments[0].AirlineCode}-{contract!=null && contract.length > 0 ? contract[0].AirSegments[0].FlightNumber : contractOld.length>0 && contractOld[0].AirSegments[0].FlightNumber}</p>
                        </div>

                        <div class="col-sm-6">
                            <h3 class="text-end">Booking Reference : {bookingResponse.BookingId ? bookingResponse.BookingId : bookingResponse.AirlinePnr}</h3>
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
                            {console.log('new->>>',contract)}
                            {console.log('old->>>',contractOld)}
                            {/* {console.log('contract===',contract)} */}
                            {/* {console.log('contractOld===',contractOld,contractOld.AirSegments[0].DepartureDateTime)} */}
                            {/* {console.log('contract[0].AirSegments[0].DepartureDateTime--->',contract[0].AirSegments[0].DepartureDateTime,'--->',moment(new Date(contract[0].AirSegments[0].DepartureDateTime)).format('DD MMM YYYY'))} */}
                            <tr>
                                <td>
                                    <p>{contract!=null && contract.length > 0 ? contract[0].AirSegments[0].sourceAirportName+'('+contract[0].AirSegments[0].Origen+')' : contractOld.length>0 && contractOld[0].AirSegments[0].sourceAirportName+'('+contractOld[0].AirSegments[0].Origen+')'}</p>
                                    <p>{contractOld.length > 0 &&  moment(new Date(contractOld[0].AirSegments[0].DepartureDateTime)).format('Do MMM YYYY h:mm:a')}</p></td>
                                <td><p>{contract!=null && contract.length > 0 ?  contract[0].AirSegments[contract[0].AirSegments.length - 1].destinationAirportName +'('+ contract[0].AirSegments[contract[0].AirSegments.length - 1].Destination+')' : contractOld.length>0 && contractOld[0].AirSegments[contractOld[0].AirSegments.length - 1].destinationAirportName +'('+ contractOld[0].AirSegments[contractOld[0].AirSegments.length - 1].Destination+')' }</p>
                                    <p>{contractOld.length > 0 &&  moment(new Date(contractOld[0].AirSegments[contractOld[0].AirSegments.length - 1].ArrivalDateTime)).format('Do MMM YYYY h:mm:a') } </p></td>
                                {/* <td>{contract!=null && contract.length > 0 && contract[0].AirSegments[0].AirlineCode}-{contract!=null && contract.length > 0 && contract[0].AirSegments[0].FlightNumber}</td> */}
                                <td>
                                    <p class="text-start">{contract!=null && contract.length > 0 ? contract[0].AirSegments[0].AirlineCode : contractOld.length>0 && contractOld[0].AirSegments[0].AirlineCode}-{contract!=null && contract.length > 0 ? contract[0].AirSegments[0].FlightNumber : contractOld.length>0 && contractOld[0].AirSegments[0].FlightNumber}</p>
                                </td>    
                                <td>BT </td>
                                <td>{bookingResponse.AirlinePnr}</td>
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
                                {/* <th scope="col">Meal</th> */}
                                <th scope="col">Seat </th>
                                <th scope="col">Refundable  </th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {travellers.map((item, i) => (
                            <tr>
                                <td>{item.Title} {item.FirstName} </td>
                                <td>{item.TicketNumber ? item.TicketNumber : bookingResponse.AirlinePnr} </td>
                                <td>{contract!=null && contract.length > 0 ? contract[0].AirSegments[0].BaggageAllowed.CheckInBaggage : contractOld.length>0 && contractOld[0].AirSegments[0].BaggageAllowed.CheckInBaggage} </td>
                                {/* <td>BT </td> */}
                                <td>N/A</td>
                                <td>{contract!=null && contract.length > 0 && contract[0].Refundable ? 'YES' : 'No'}</td>
                                <td>Booked</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>


                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Basic Fare</th>
                                <th scope="col">Tax & Others </th>
                                <th scope="col">Gross Amount</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>INR {contract!=null && contract.length > 0 ? contract[0].AirlineFare.BaseFare : contractOld.length > 0 && contractOld[0].AirlineFare.BaseFare} </td>
                                <td>INR {contract!=null && contract.length > 0 ? contract[0].AirlineFare.TaxFare : contractOld.length > 0 && contractOld[0].AirlineFare.TaxFare} </td>
                                <td>NR {contract!=null && contract.length > 0 ? contract[0].AirlineFare.GrossFare : contractOld.length > 0 && contractOld[0].AirlineFare.GrossFare} </td>

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
            )}
        </>
    )
}   