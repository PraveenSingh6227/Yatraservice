import Footer from '@/component/Footer'
import Header from '@/component/Header'
import React from 'react'

export default function About() {
  return (
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
  {/* Common Banner Area */}
  <section id="common_banner">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="common_bannner_text">
            <h2>About us</h2>
            <ul>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <span>
                  <i className="fas fa-circle" />
                </span>{" "}
                About
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* About Us */}
  <section id="about_us_top" className="section_padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="about_us_left">
            <h5>About us</h5>
            <h2>We Are The World Best Travel Agency Company Since 2000</h2>
            <p>
              At vero eos et accusam et justo duo dolores et ea rebum. Stet
              clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr{" "}
            </p>
            <p>
              At vero eos et accusam et justo duo dolores et ea rebum. Stet
              clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr{" "}
            </p>
            <a href="tour-search.html" className="btn btn_theme btn_md">
              Find tours
            </a>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="about_us_right">
            <img src="assets/img/common/abour_right.png" alt="img" />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* About Banner */}
  <section id="about_offer_banner" className="section_padding_bottom">
    <div className="container-fluid">
      <div className="row">
        <h2 className="d-none">Heading</h2>
        <div className="col-lg-4">
          <div className="about_offer_banner">
            <a href="%21.html#">
              <img src="assets/img/common/small_banner.png" alt="img" />
            </a>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="about_offer_banner">
            <img src="assets/img/common/big_banner.png" alt="img" />
            <div className="about_offer_text">
              <h3>
                Enjoy <span>20%</span> discount
              </h3>
              <h2>Thailand couple tour</h2>
              <a href="tour-search.html">Find tours</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* About Service Area */}
  <section id="about_service_offer" className="section_padding_bottom">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
          <div className="about_service_boxed">
            <img src="assets/img/icon/world.png" alt="img" />
            <h5>
              <a href="#!">Best services</a>
            </h5>
            <p>
              Phaseus site amet tristique ligua donec iaculis leo sus cipit.
              Consec tetur adipiscing elit. Incididunt ut dolore.
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
          <div className="about_service_boxed">
            <img src="assets/img/icon/walte.png" alt="img" />
            <h5>
              <a href="#!">Trusted payment</a>
            </h5>
            <p>
              Phaseus site amet tristique ligua donec iaculis leo sus cipit.
              Consec tetur adipiscing elit. Incididunt ut dolore.
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
          <div className="about_service_boxed">
            <img src="assets/img/icon/star.png" alt="img" />
            <h5>
              <a href="#!">Top facility</a>
            </h5>
            <p>
              Phaseus site amet tristique ligua donec iaculis leo sus cipit.
              Consec tetur adipiscing elit. Incididunt ut dolore.
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
          <div className="about_service_boxed">
            <img src="assets/img/icon/persentis.png" alt="img" />
            <h5>
              <a href="#!">Awesome deals</a>
            </h5>
            <p>
              Phaseus site amet tristique ligua donec iaculis leo sus cipit.
              Consec tetur adipiscing elit. Incididunt ut dolore.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* consultation Area */}
  <section id="consultation_area" className="section_padding_bottom">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="consultation_area_text">
            <h2>Have you any question? Get A Consultation</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Counter Area */}
  <section id="counter_area" className="section_padding_bottom">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 ">
          <div className="counter_area_wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-6 clo-sm-12 col-12">
                <div className="counter_item">
                  <img src="assets/img/icon/user.png" alt="icon" />
                  <h3 className="counter">2348</h3>
                  <h6>Partners</h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 clo-sm-12 col-12">
                <div className="counter_item">
                  <img src="assets/img/icon/bank.png" alt="icon" />
                  <h3 className="counter">1748</h3>
                  <h6>Listed property</h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 clo-sm-12 col-12">
                <div className="counter_item">
                  <img src="assets/img/icon/world-map.png" alt="icon" />
                  <h3 className="counter">4287</h3>
                  <h6>Destinations</h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 clo-sm-12 col-12">
                <div className="counter_item">
                  <img src="assets/img/icon/calander.png" alt="icon" />
                  <h3 className="counter">40</h3>
                  <h6>Booking</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Customer Area */}
  <section id="customer_reviews" className="section_padding_bottom">
    <div className="container">
      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="section_heading_center">
          <h2>Customer review</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="all_review_box">
            <div className="all_review_date_area">
              <div className="all_review_date">
                <h5>08 Dec, 2021</h5>
              </div>
              <div className="all_review_star">
                <h5>Excellent</h5>
                <div className="review_star_all">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
              </div>
            </div>
            <div className="all_review_text">
              <img src="assets/img/review/review6.png" alt="img" />
              <h4>Jesica simpsn</h4>
              <span>Tourist</span>
              <p>
                " Loved the overall tour for all 6 days covering jaipur jodhpur
                and jaisalmer. worth ur money for sure. thanks. Driver was very
                good and polite and safe driving for all 6 days. on time pickup
                and drop overall. Thanks for it. "
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="all_review_box">
            <div className="all_review_date_area">
              <div className="all_review_date">
                <h5>08 Dec, 2021</h5>
              </div>
              <div className="all_review_star">
                <h5>Excellent</h5>
                <div className="review_star_all">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
              </div>
            </div>
            <div className="all_review_text">
              <img src="assets/img/review/review6.png" alt="img" />
              <h4>Santa mariam</h4>
              <span>traveler</span>
              <p>
                " Loved the overall tour for all 6 days covering jaipur jodhpur
                and jaisalmer. worth ur money for sure. thanks. Driver was very
                good and polite and safe driving for all 6 days. on time pickup
                and drop overall. Thanks for it. "
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="all_review_box">
            <div className="all_review_date_area">
              <div className="all_review_date">
                <h5>08 Dec, 2021</h5>
              </div>
              <div className="all_review_star">
                <h5>Excellent</h5>
                <div className="review_star_all">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
              </div>
            </div>
            <div className="all_review_text">
              <img src="assets/img/review/review7.png" alt="img" />
              <h4>Jack cremer</h4>
              <span>Manager</span>
              <p>
                " Loved the overall tour for all 6 days covering jaipur jodhpur
                and jaisalmer. worth ur money for sure. thanks. Driver was very
                good and polite and safe driving for all 6 days. on time pickup
                and drop overall. Thanks for it. "
              </p>
            </div>
          </div>
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
  )
}
