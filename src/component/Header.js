import React,{ useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'


export default function Header() {
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter()
  useEffect(() => {
    if (
      localStorage.getItem('userDetails') &&
      localStorage.getItem('userDetails') !== undefined
    ) {
      setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
      checkUser()
    }
  },[]);

  const checkUser = async () => {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    let bodyFormData = new FormData();
    if (
        localStorage.getItem('userDetails') &&
        localStorage.getItem('userDetails') !== undefined
      ) {
        bodyFormData.append("action", "user_details");
        bodyFormData.append("user_id", user.id);
        await fetch("https://yatriservice.com/admin/api/api.php", {
            method: 'POST',
            body: bodyFormData
        }).then((response) => response.json()).then(async (responseUser) => {
          if(responseUser.status==200){
            localStorage.setItem('userDetails', JSON.stringify(responseUser.user));
          }
        })  
      }
   
} 
  const signOut = () =>{
    localStorage.removeItem('userDetails')
    setUserDetails({})
    router.push('/')
  }
  return (
    <>
    <header className="main_header_arae">
    {/* Top Bar */}
    <div className="topbar-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6">
            <ul className="topbar-list">
              <li>
                <Link href="#!">
                  <i className="fab fa-facebook" />
                </Link>
                <Link href="#!">
                  <i className="fab fa-twitter-square" />
                </Link>
                <Link href="#!">
                  <i className="fab fa-instagram" />
                </Link>
                <Link href="#!">
                  <i className="fab fa-linkedin" />
                </Link>
              </li>
              <li>
                <Link href="#!">
                  <span>+91-8178020841</span>
                </Link>
              </li>
              <li>
                <Link href="#!">
                  <span>support@serviceyatri.com</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-6">
            <ul className="topbar-others-options">
            {Object.keys(userDetails).length > 0 ? (
              <>
              <li>
                <div className="dropdown language-option">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="lang-name"> Hello, {userDetails.name}</span>
                  </button>
                  <div className="dropdown-menu language-dropdown-menu">
                    <Link className="dropdown-item" href="/UserDashboard">
                      My Dashboard
                    </Link>
                    <Link className="dropdown-item"
                    onClick={()=>signOut()}
                    href="javascript:void(0)">                   
                      Logout
                    </Link>
                    {/* <a className="dropdown-item" onClick={signOut()} href="javascript:void(0)">
                      Logout
                    </a> */}
                  </div>
                </div>
              </li>
              <li>
                <Link href="javascript:void(0)">Wallet (INR {userDetails.wallet})</Link>
              </li>
              {/* <li>
                <Link href="javascript:void(0)"
                 onClick={signOut()}
                >Logout</Link>
              </li> */}
              </>
              
              ) : (
              <li>
                <Link href="/Login">Login</Link>
              </li>
              )}
              {/* <li>
                <div className="dropdown language-option">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="lang-name" />
                  </button>
                  <div className="dropdown-menu language-dropdown-menu">
                    <Link className="dropdown-item" href="#">
                      English
                    </Link>
                    <Link className="dropdown-item" href="#">
                      Arabic
                    </Link>
                    <Link className="dropdown-item" href="#">
                      French
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div className="dropdown language-option">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="lang-name" />
                  </button>
                  <div className="dropdown-menu language-dropdown-menu">
                    <Link className="dropdown-item" href="#">
                      USD
                    </Link>
                    <Link className="dropdown-item" href="#">
                      BD
                    </Link>
                    <Link className="dropdown-item" href="#">
                      URO
                    </Link>
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
    {/* Navbar Bar */}
    <div className="navbar-area">
      <div className="main-responsive-nav">
        <div className="container">
          <div className="main-responsive-menu">
            <div className="logo">
              <Link href="/">
                <img src="https://yatriservice.com/assets/img/logo2.png" alt="logo" width={200}  />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="main-navbar">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <Link className="navbar-brand" href="/">
              <img src="assets/img/logo2.png" alt="logo" width={200} />
            </Link>
            <div
              className="collapse navbar-collapse mean-menu"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/" className="nav-link active">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/About" className="nav-link">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/Searchresult" className="nav-link">
                    Flights
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/Contact" className="nav-link">
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="others-options d-flex align-items-center">
                <div className="option-item">
                  <Link href="#" className="search-box">
                    <i className="bi bi-search" />
                  </Link>
                </div>
                <div className="option-item">
                  <Link href="/becomevendor" className="btn  btn_navber">
                    Become a partner
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="others-option-for-responsive">
        <div className="container">
          <div className="dot-menu">
            <div className="inner">
              <div className="circle circle-one" />
              <div className="circle circle-two" />
              <div className="circle circle-three" />
            </div>
          </div>
          <div className="container">
            <div className="option-inner">
              <div className="others-options d-flex align-items-center">
                <div className="option-item">
                  <Link href="/flight-search-result" className="search-box">
                    <i className="fas fa-search" />
                  </Link>
                </div>
                <div className="option-item">
                  <Link href="/contact" className="btn  btn_navber">
                    Get free quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
    </>
  )
}
