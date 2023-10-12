import Footer from '@/component/Footer'
import Header from '@/component/Header'
import React from 'react'

export default function Contact() {
  return (
    <>
    <Header />
    <>
  {/* search */}
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
            <h2>Contact</h2>
            <ul>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <span>
                  <i className="fas fa-circle" />
                </span>
                Contact
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Contact Area */}
  <section id="contact_main_arae" className="section_padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="section_heading_center">
            <h2>Contact with us</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="phone_tuch_area">
            <h3>Stay in touch</h3>
            <h3>
              <a href="tel:+00-123-456-789">+00 123 456 789</a>
            </h3>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
          <div className="contact_boxed">
            <h6>Head office</h6>
            <h3>New Mexico</h3>
            <p>4140 Parker Rd. Allentown, New Mexico 31134</p>
            <a
              href="%21.html#"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              View on map
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
          <div className="contact_boxed">
            <h6>Washington office</h6>
            <h3>Washington</h3>
            <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
            <a
              href="%21.html#"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              View on map
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
          <div className="contact_boxed">
            <h6>California office</h6>
            <h3>California</h3>
            <p>3891 Ranchview Dr. Richardson, California 62639</p>
            <a
              href="%21.html#"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              View on map
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
          <div className="contact_boxed">
            <h6>Office schedule</h6>
            <h3>Working hours</h3>
            <p>
              Monday to Friday <br /> 9 am to 10pm
            </p>
            <a
              href="%21.html#"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              View on map
            </a>
          </div>
        </div>
      </div>
      <div className="contact_main_form_area">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="section_heading_center">
              <h2>Leave us a message</h2>
            </div>
            <div className="contact_form">
              <form
                action="https://andit.co/projects/html/and-tour/demo/!#"
                id="contact_form_content"
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
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        className="form-control bg_input"
                        rows={5}
                        placeholder="Message"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button type="button" className="btn btn_theme btn_md">
                        Send message
                      </button>
                    </div>
                  </div>
                </div>
              </form>
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
