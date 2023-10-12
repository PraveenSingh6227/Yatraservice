import React from 'react'

export default function Header() {
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
                <a href="#!">
                  <i className="fab fa-facebook" />
                </a>
                <a href="#!">
                  <i className="fab fa-twitter-square" />
                </a>
                <a href="#!">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#!">
                  <i className="fab fa-linkedin" />
                </a>
              </li>
              <li>
                <a href="#!">
                  <span>+91-8178020841</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span>support@serviceyatri.com</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-6">
            <ul className="topbar-others-options">
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/becomevendor">Sign up</a>
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
                    <a className="dropdown-item" href="#">
                      English
                    </a>
                    <a className="dropdown-item" href="#">
                      Arabic
                    </a>
                    <a className="dropdown-item" href="#">
                      French
                    </a>
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
                    <a className="dropdown-item" href="#">
                      USD
                    </a>
                    <a className="dropdown-item" href="#">
                      BD
                    </a>
                    <a className="dropdown-item" href="#">
                      URO
                    </a>
                  </div>
                </div>
              </li>
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
              <a href="/">
                <img src="assets/img/logo2.png" alt="logo" width={200}  />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="main-navbar">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <a className="navbar-brand" href="/">
              <img src="assets/img/logo2.png" alt="logo" width={200} />
            </a>
            <div
              className="collapse navbar-collapse mean-menu"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="/" className="nav-link active">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/About" className="nav-link">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/Searchresult" className="nav-link">
                    Flights
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/Contact" className="nav-link">
                    Contact
                  </a>
                </li>
              </ul>
              <div className="others-options d-flex align-items-center">
                <div className="option-item">
                  <a href="#" className="search-box">
                    <i className="bi bi-search" />
                  </a>
                </div>
                <div className="option-item">
                  <a href="/becomevendor" className="btn  btn_navber">
                    Become a partner
                  </a>
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
                  <a href="/flight-search-result" className="search-box">
                    <i className="fas fa-search" />
                  </a>
                </div>
                <div className="option-item">
                  <a href="/contact" className="btn  btn_navber">
                    Get free quote
                  </a>
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
