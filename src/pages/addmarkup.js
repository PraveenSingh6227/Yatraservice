import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { url } from '../../config/index'
import LoadingSpinner from "../component/Loader";
import Header from '@/component/Header'
import Footer from '@/component/Footer'
import { useToasts } from 'react-toast-notifications';
import Link from 'next/link';

export default function addmarkup() {
    const router = useRouter()
    const { addToast } = useToasts();
    const searchParams = useSearchParams()
    const ticketId = searchParams.get('ticketPrice')
    const [userDetails, setUserDetails] = useState({});
    const [markup, setMarkup] = useState();
    const [Cprice, setPrice] = useState();
    const [isLoading, setIsLoading] = useState(false);
    

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


    // console.log(ticketId)
    useEffect(() => {
        
        getMyBookings()
       
      },[ticketId!=undefined])

      const getMyBookings = async () => {
        setIsLoading(true)
        let bodyFormData = new FormData();
        bodyFormData.append("action", "add_markup");
        bodyFormData.append("ticketId", ticketId);
        await fetch(`${url}markup.php`, {
          method: 'POST',
          body: bodyFormData
        }).then((response) => response.json()).then((response) => {
          setIsLoading(false)
          if (response !== null) {
            console.log(response)
           setPrice(response.Price)
          }
        })
      }


      const signOut = ()=>{
        localStorage.removeItem('userDetails')
        setUserDetails({})
        router.push('/')
      }

async function addingMarkup()  {

    if(markup === ''){
        addToast("Please add Markup", { appearance: 'error' });
        return
    }
    let formDataSent = new FormData();
    formDataSent.append("action", "add_markup_add");
    formDataSent.append("markup", markup);
    formDataSent.append("ticketId",ticketId);
    formDataSent.append("Cprice",Cprice);

    await fetch(`${url}markup.php`, {
        method: 'POST',
        body: formDataSent,
    }).then((response) => response.json()).then((response) => {
        setIsLoading(false)
        if (response !== null) {

            console.log(response)
            if (response.status !== 200) {
                addToast("Yatriservices : " + response.message, { appearance: 'error' });
            } else {
                addToast("Yatriservices : " + response.message, { appearance: 'success' });
               
            }
        }
    })


}

  return (
    <>
     <Header />
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
                                                <img src="https://yatriservice.com/assets/img/common/how-3.png" alt="img" />
                                                <h3>{userDetails.agency_name}</h3>
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
                                            <div className="form-box">
 
  <form action="" method="post">
    <div className="form-group">
      <label htmlFor="name">Ticket Price</label>
      <input
        type="text"
        value={Cprice}
        
        className="form-control"
        placeholder="Enter pan number"
        />
    </div>
    <div className="form-group">
      <label htmlFor="email">Add Markup</label>
      <input
        type="text"
        value={markup}
        onChange={(e) => setMarkup(e.target.value)}
        className="form-control"
        placeholder="Enter pan number"
        />
    </div>
    
    <button className="btn btn_theme btn_md"
                                                            onClick={(e) => { e.preventDefault(); addingMarkup() }}
                                                        >Register</button>
  </form>
</div>

                                                
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
     <Footer />
    </>
 
  )
}
