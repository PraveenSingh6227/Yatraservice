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
                <a href="tel:+00-123-456-789">+00 123 456 789</a>
              </h3>
            </div>
            <div className="footer_inquery_area">
              <h5>Mail to our support team</h5>
              <h3>
                {" "}
                <a href="mailto:support@domain.com">support@domain.com</a>
              </h3>
            </div>
            <div className="footer_inquery_area">
              <h5>Follow us on</h5>
              <ul className="soical_icon_footer">
                <li>
                  <a href="#!">
                    <i className="fab fa-facebook" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="fab fa-twitter-square" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="fab fa-linkedin" />
                  </a>
                </li>
              </ul>
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
                <a href="testimonials.html">Testimonials</a>
              </li>
              <li>
                <a href="faqs.html">Rewards</a>
              </li>
              <li>
                <a href="terms-service.html">Work with Us</a>
              </li>
              <li>
                <a href="tour-guides.html">Meet the Team </a>
              </li>
              <li>
                <a href="news.html">Blog</a>
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
                <a href="dashboard.html">Account</a>
              </li>
              <li>
                <a href="faq.html">Faq</a>
              </li>
              <li>
                <a href="testimonials.html">Legal</a>
              </li>
              <li>
                <a href="contact.html">Contact</a>
              </li>
              <li>
                <a href="top-destinations.html"> Affiliate Program</a>
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
                <a href="top-destinations-details.html">Investor Relations</a>
              </li>
              <li>
                <a href="flight-search-result.html">Rewards Program</a>
              </li>
              <li>
                <a href="room-booking.html">PointsPLUS</a>
              </li>
              <li>
                <a href="testimonials.html">Partners</a>
              </li>
              <li>
                <a href="hotel-search.html">List My Hotel</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6 col-12">
          <div className="footer_heading_area">
            <h5>Top cities</h5>
          </div>
          <div className="footer_link_area">
            <ul>
              <li>
                <a href="room-details.html">Chicago</a>
              </li>
              <li>
                <a href="hotel-details.html">New York</a>
              </li>
              <li>
                <a href="hotel-booking.html">San Francisco</a>
              </li>
              <li>
                <a href="tour-search.html">California</a>
              </li>
              <li>
                <a href="tour-booking.html">Ohio </a>
              </li>
              <li>
                <a href="tour-guides.html">Alaska</a>
              </li>
            </ul>
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
