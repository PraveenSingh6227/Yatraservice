import React, { useEffect } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';
import LoadingSpinner from "../component/Loader";
import {url} from '../../config/index'


export default function Login() {

    const { addToast } = useToasts();
    const router = useRouter()
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [l_name, setLName] = useState("");
    const [mobile, setMobile] = useState("");
    const [officePhone, setOfficePhone] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pin, setPin] = useState("");
    const [agencyName, setAgencyName] = useState("");
    const [gstNumber, setGstNumber] = useState("");
    const [panNumber, setPanNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [panCard, setPanCard] = useState("");
    const [gstCard, setGstCard] = useState("");
    const [addressProof, setAddressProof] = useState("");

    useEffect(()=>{
        getCountry()
    },[])

    function handlePanCard(event) {
        setPanCard(event.target.files[0])
      }
      function handleAddressProof(event) {
        setAddressProof(event.target.files[0])
      }
      function handleGstCard(event) {
        setGstCard(event.target.files[0])
      }

    async function registerUser() {
        if (title === '') {
            addToast("Please select your title", { appearance: 'error' });
            return
        }
        if (name === '') {
            addToast("Please enter your first name", { appearance: 'error' });
            return
        }
        if (l_name === '') {
            addToast("Please enter your last name", { appearance: 'error' });
            return
        }
        if (email === '') {
            addToast("Please enter your email", { appearance: 'error' });
            return
        }
        if (mobile === '') {
            addToast("Please enter your mobile", { appearance: 'error' });
            return
        }
        if (address === '') {
            addToast("Please enter your address", { appearance: 'error' });
            return
        }
        if (country === '') {
            addToast("Please select your country", { appearance: 'error' });
            return
        }
        if (state === '') {
            addToast("Please select your state", { appearance: 'error' });
            return
        }
        if (city === '') {
            addToast("Please select your city", { appearance: 'error' });
            return
        }
        if (pin === '') {
            addToast("Please enter your pin", { appearance: 'error' });
            return
        }
        if (agencyName === '') {
            addToast("Please enter agency name", { appearance: 'error' });
            return
        }
        if (gstNumber === '') {
            addToast("Please enter gst number", { appearance: 'error' });
            return
        }
        if (panNumber === '') {
            addToast("Please enter pan number", { appearance: 'error' });
            return
        }
        if (panCard === '') {
            addToast("Please select pan card", { appearance: 'error' });
            return
        }
        if (gstCard === '') {
            addToast("Please select gst certificate", { appearance: 'error' });
            return
        }
        if (addressProof === '') {
            addToast("Please select address proof", { appearance: 'error' });
            return
        }
        if (password === '') {
            addToast("Please enter your password", { appearance: 'error' });
            return
        }
        if (password === '') {
            addToast("Please enter your password", { appearance: 'error' });
            return
        }
        if (confirmPassword === '') {
            addToast("Please re-enter your password", { appearance: 'error' });
            return
        }
        if (password != confirmPassword) {
            addToast("Your password and confirm password doesn't match. Please enter your confirm password again.", { appearance: 'error' });
            return
        }
        setIsLoading(true)
        let bodyFormData = new FormData();
        bodyFormData.append("action", "user_register");
        bodyFormData.append("title", title);
        bodyFormData.append("name", name);
        bodyFormData.append("l_name", l_name);
        bodyFormData.append("email", email);
        bodyFormData.append("mobile", mobile);
        bodyFormData.append("officePhone", officePhone);
        bodyFormData.append("address", address);
        bodyFormData.append("country", country);
        bodyFormData.append("state", state);
        bodyFormData.append("city", city);
        bodyFormData.append("pin", pin);
        bodyFormData.append("agencyName", agencyName);
        bodyFormData.append("gstNumber", gstNumber);
        bodyFormData.append("panNumber", panNumber);
        bodyFormData.append("panCard[]", panCard);
        bodyFormData.append("gstCard[]", gstCard);
        bodyFormData.append("addressProof[]", addressProof);
        bodyFormData.append("password", password);

        await fetch(`${url}api.php`, {
            method: 'POST',
            body: bodyFormData,
        }).then((response) => response.json()).then((response) => {
            setIsLoading(false)
            if (response !== null) {
                if (response.status !== 200) {
                    addToast("API response : " + response.message, { appearance: 'error' });
                } else {
                    addToast("API response : " + response.message, { appearance: 'success' });
                    router.push('/Login');
                }
            }
        })
    }

    const getCountry = async() =>{
        setIsLoading(true)
        let bodyFormData = new FormData();
        bodyFormData.append("action", "get_country");

        await fetch(`${url}api.php`, {
            method: 'POST',
            body: bodyFormData
        }).then((response) => response.json()).then((response) => {
            if (response !== null) {
                if (response.status !== 200) {
                    addToast("API response : " + response.message, { appearance: 'error' });
                } else {
                    setCountryList(response.data)
                }
            }
            setIsLoading(false)
        })
    }

    const getState = async(id) =>{
        setIsLoading(true)
        let bodyFormData = new FormData();
        bodyFormData.append("action", "get_state");
        bodyFormData.append("country_id", id);

        await fetch(`${url}api.php`, {
            method: 'POST',
            body: bodyFormData
        }).then((response) => response.json()).then((response) => {
            if (response !== null) {
                if (response.status !== 200) {
                    addToast("API response : " + response.message, { appearance: 'error' });
                } else {
                    setStateList(response.data)
                }
            }
            setIsLoading(false)
        })
    }

    const getCity = async(id) =>{
        setIsLoading(true)
        let bodyFormData = new FormData();
        bodyFormData.append("action", "get_city");
        bodyFormData.append("state_id", id);

        await fetch(`${url}api.php`, {
            method: 'POST',
            body: bodyFormData
        }).then((response) => response.json()).then((response) => {
            if (response !== null) {
                if (response.status !== 200) {
                    addToast("API response : " + response.message, { appearance: 'error' });
                } else {
                    setCityList(response.data)
                }
            }
            setIsLoading(false)
        })
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
                        {/* Common Banner Area */}
                        <section id="common_banner">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="common_bannner_text">
                                            <h2>Register</h2>
                                            <ul>
                                                <li>
                                                    <a href="index.html">Home</a>
                                                </li>
                                                <li>
                                                    <span>
                                                        <i className="fas fa-circle" />
                                                    </span>{" "}
                                                    Register
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/*  Common Author Area */}
                        <section id="common_author_area" className="section_padding">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 offset-lg-2">
                                        <div className="common_author_boxed">
                                            <div className="common_author_heading">
                                                <h3>Register account</h3>
                                                <h2>Register your account</h2>
                                            </div>
                                            <div className="common_author_form">
                                                <form action="#" id="main_author_form">
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>Title*</label>
                                                                <select class="form-control" value={title}
                                                                    onChange={(e) => setTitle(e.target.value)}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="0">Mr.</option>
                                                                    <option value="1">Ms.</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>First name*</label>
                                                                <input
                                                                    type="text"
                                                                    value={name}
                                                                    onChange={(e) => setName(e.target.value)}
                                                                    className="form-control"
                                                                    placeholder="Enter your first name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>Last name*</label>
                                                                <input
                                                                    type="text"
                                                                    value={l_name}
                                                                    onChange={(e) => setLName(e.target.value)}
                                                                    className="form-control"
                                                                    placeholder="Enter your last name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <label  style={{float:'left'}}>Email Id*</label>
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    className="form-control"
                                                                    placeholder="Enter your email"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>Mobile no.*</label>
                                                                <input
                                                                    type="text"
                                                                    value={mobile}
                                                                    onChange={(e) => setMobile(e.target.value)}
                                                                    className="form-control"
                                                                    placeholder="Enter your mobile number"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>Office phone no.</label>
                                                                <input
                                                                    type="text"
                                                                    value={officePhone}
                                                                    onChange={(e) => setOfficePhone(e.target.value)}
                                                                    className="form-control"
                                                                    placeholder="Enter your office phone number"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>Address*</label>
                                                                <input
                                                                    type="text"
                                                                    value={address}
                                                                    onChange={(e) => setAddress(e.target.value)}
                                                                    className="form-control"
                                                                    placeholder="Enter your address"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>Country*</label>
                                                                <select class="form-control" value={country} onChange={(event) => {setCountry(event.target.value);getState(event.target.value)}}>
                                                                    <option value="">Select</option>
                                                                    {countryList.map((element, index) =>{
                                                                       return  <option key={index} value={element.id}>{element.name}</option>
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>State*</label>
                                                                <select class="form-control" value={state} onChange={(event) => {setState(event.target.value); getCity(event.target.value)}}>
                                                                    <option value="">Select</option>
                                                                    {stateList.map((element, index) =>{
                                                                       return  <option key={index} value={element.id}>{element.name}</option>
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>City*</label>
                                                                <select class="form-control" value={city} onChange={(event) => {setCity(event.target.value);}}>
                                                                    <option value="">Select</option>
                                                                    {cityList.map((element, index) =>{
                                                                       return  <option key={index} value={element.id}>{element.name}</option>
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>PIN Code*</label>
                                                                <input
                                                                    type="text"
                                                                    value={pin}
                                                                    onChange={(e) => setPin(e.target.value)}
                                                                    className="form-control"
                                                                    placeholder="Enter your pin code"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>Agency Name*</label>
                                                                <input
                                                                    type="text"
                                                                    value={agencyName}
                                                                    onChange={(e) => setAgencyName(e.target.value)}
                                                                    className="form-control"
                                                                    placeholder="Enter agency name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>GST Number*</label>
                                                                <input
                                                                    type="text"
                                                                    value={gstNumber}
                                                                    onChange={(e) => setGstNumber(e.target.value)}
                                                                    className="form-control"
                                                                    placeholder="Enter gst number"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>PAN Number*</label>
                                                                <input
                                                                    type="text"
                                                                    value={panNumber}
                                                                    onChange={(e) => setPanNumber(e.target.value)}
                                                                    className="form-control"
                                                                    placeholder="Enter pan number"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>PAN Card*</label>
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    onChange={(e)=>handlePanCard(e)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>GST Certificate*</label>
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    onChange={(e)=>handleGstCard(e)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>Address Proof*</label>
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    onChange={(e)=>handleAddressProof(e)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>Password*</label>
                                                                <input
                                                                    type="password"
                                                                    value={password}
                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                    className="form-control"
                                                                    placeholder="Enter your password"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div className="form-group">
                                                                <label  style={{float:'left'}}>Confirm Password*</label>
                                                                <input
                                                                    type="password"
                                                                    value={confirmPassword}
                                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                                    className="form-control"
                                                                    placeholder="Enter your password"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="common_form_submit">
                                                        <button className="btn btn_theme btn_md"
                                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); registerUser() }}
                                                        >Register</button>
                                                    </div>
                                                    <div className="have_acount_area">
                                                        <p>
                                                            Already have an account?{" "}
                                                            <Link href="/Login">Login now</Link>
                                                        </p>
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
            )}
        </>
    )
}
