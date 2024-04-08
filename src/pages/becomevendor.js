import Footer from '../component/Footer'
import Header from '../component/Header'
import React from 'react'

export default function becomevendor() {
  return (
    <>
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
  {/* Common Banner Area */}
  <section id="common_banner">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="common_bannner_text">
            <h2>Become a vendor</h2>
            <ul>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <span>
                  <i className="fas fa-circle" />
                </span>{" "}
                Become a vendor
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* How It Work */}
  <section id="how_it_work_area" className="section_padding">
    <div className="container">
      {/* Section Heading */}
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="section_heading_center">
            <h2>How it works</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12 col-12">
          <div className="how_it_boxed">
            <img src="assets/img/common/how-1.png" alt="img" />
            <h3>Sign up</h3>
            <p>
              Duis laboris culpa cupidatat do consequat esse officia ex.
              Reprehenderit quis est id sint ea dolore sint nostrud demos
              adipisicing.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 col-12">
          <div className="how_it_boxed">
            <img src="assets/img/common/how-2.png" alt="img" />
            <h3>Contact with client</h3>
            <p>
              Duis laboris culpa cupidatat do consequat esse officia ex.
              Reprehenderit quis est id sint ea dolore sint nostrud demos
              adipisicing.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 col-12">
          <div className="how_it_boxed">
            <img src="assets/img/common/how-3.png" alt="img" />
            <h3>Start earnings</h3>
            <p>
              Duis laboris culpa cupidatat do consequat esse officia ex.
              Reprehenderit quis est id sint ea dolore sint nostrud demos
              adipisicing.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Video Area */}
  <section id="video_area">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="video_area_vendor">
            <img src="assets/img/common/video.png" alt="img" />
            <div className="video_play_button">
              <div className="">
                <a
                  className="video_btn video_play_area"
                  href="https://www.youtube.com/watch?v=_2LLXnUdUIc"
                  title="Youtube Video"
                >
                  <i className="fas fa-play" />
                </a>
              </div>
              <h4>Explore amazing tours</h4>
              <h2>Get some travel idea</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* About Service Area */}
  <section id="about_service_offer" className="section_padding">
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
  {/* Vendor Form Area */}
  <section id="vendor_form_area" className="section_padding_bottom">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="vendor_form_heading">
            <h2>Become a vendor</h2>
            <p>
              Eu sint minim tempor anim aliqua officia voluptate incididunt
              deserunt.
              <br /> Velitgo quis Lorem culpa qui pariatur occaecat.
            </p>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="vendor_form">
            <div className="tour_booking_form_box">
              <form
                action="https://andit.co/projects/html/and-tour/demo/!#"
                id="tour_bookking_form_item"
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg_input"
                        placeholder="First name*"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg_input"
                        placeholder="Last name*"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg_input"
                        placeholder="Email address (Optional)"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg_input"
                        placeholder="Mobile number*"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg_input"
                        placeholder="Landline Number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg_input"
                        placeholder="Agency Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg_input"
                        placeholder="address"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg_input"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg_input"
                        placeholder="Reenter Password"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg_input"
                        placeholder="Pan No"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg_input"
                        placeholder="Aadhar Number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="file"
                        className="form-control bg_input"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="file"
                        className="form-control bg_input"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="file"
                        className="form-control bg_input"
                        placeholder="Address Proof"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <select className="form-control form-select bg_input">
                        <option value={1}>Country</option>
                        <option value={1}>New York</option>
                        <option value={1}>Barisal</option>
                        <option value={1}>Nator</option>
                        <option value={1}>Joybangla</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="booking_tour_form_submit pt-4">
              <div className="form-check write_spical_check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="flexCheckDefaultf1"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckDefaultf1"
                >
                  I have read and accept the{" "}
                  <a href="terms-service.html">Terms and conditions</a> and{" "}
                  <a href="privacy-policy.html">Privacy policy</a>
                </label>
              </div>
              <a
                href="booking-confirmation.html"
                className="btn btn_theme btn_md"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="vendor_img">
            <img src="assets/img/common/vendor.png" alt="img" />
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
  {/* Footer  */}
 <Footer />
</>
</>
  )
}
