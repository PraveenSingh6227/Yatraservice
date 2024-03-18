import React from 'react'

export default function Footer() {
  return (
   <>
    <footer id="footer_area">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
          <div className="footer_heading_area">
            <h5>Need any help?</h5>
          </div>
          <div className="footer_first_area">
            <div className="footer_inquery_area">
              <h5>Call 24/7 for any help</h5>
              <h3>
                {" "}
                <a href="tel:+918178020841">+91-8178020841</a>
              </h3>
            </div>
            <div className="footer_inquery_area">
              <h5>Mail to our support team</h5>
              <h3>
                {" "}
                <a href="mailto:support@domain.com">Sales@yatriservice.com</a>
              </h3>
            </div>
            
          </div>
        </div>
        <div className="col-lg-2 offset-lg-1 col-md-6 col-sm-6 col-12">
          <div className="footer_heading_area">
            <h5>Company</h5>
          </div>
          <div className="footer_link_area">
            <ul>
              <li>
                <a href="about.html">About Us</a>
              </li>
             
              <li>
                <a href="terms-service.html">Work with Us</a>
              </li>
             
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6 col-12">
          <div className="footer_heading_area">
            <h5>Support</h5>
          </div>
          <div className="footer_link_area">
            <ul>
             
              <li>
                <a href="contact.html">Contact</a>
              </li>
             
              <li>
                <a href="privacy-policy.html">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6 col-12">
          <div className="footer_heading_area">
            <h5>Other Services</h5>
          </div>
          <div className="footer_link_area">
            <ul>
              <li>
                <a href="top-destinations-details.html">Community program</a>
              </li>
            
              <li>
                <a href="flight-search-result.html">Rewards Program</a>
              </li>
            
              <li>
                <a href="testimonials.html">Partners</a>
              </li>
              
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6 col-12">
          <div className="footer_heading_area">
            <h5></h5>
          </div>
       
        </div>
      </div>
    </div>
  </footer>
  <div className="copyright_area">
    <div className="container">
      <div className="row align-items-center">
        <div className="co-lg-6 col-md-6 col-sm-12 col-12">
            <div className='row'>
                <div className='col-6'>
          <div className="copyright_left">
            <p>Copyright © 2022 All Rights Reserved</p>
          </div>
          </div>
          <div className='col-6'>
            <div className='copyright_right'>
                <p>Developed By : VRC Websolution</p>
            </div>
          </div>
          </div>
        </div>
        <div className="co-lg-6 col-md-6 col-sm-12 col-12">
          <div className="copyright_right">
            <img src="assets/img/common/cards.png" alt="img" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="go-top">
    <i className="fas fa-chevron-up" />
    <i className="fas fa-chevron-up" />
  </div></>
  )
}
