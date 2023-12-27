import React from 'react'
import Header from '@/component/Header'
import Footer from '@/component/Footer'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';
import LoadingSpinner from "../component/Loader";



export default function Login() {

    const { addToast } = useToasts();
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    async function registerUser() {
        if (name === '') {
            addToast("Please enter your name", { appearance: 'error' });
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

          if (password === '') {
            addToast("Please enter your password", { appearance: 'error' });
            return
          }
          setIsLoading(true)
          let bodyFormData = new FormData();
          bodyFormData.append("action", "user_register");
          bodyFormData.append("name", name);
          bodyFormData.append("email", email);
          bodyFormData.append("mobile", mobile);
          bodyFormData.append("password", password);

              await fetch("https://yatriservice.com/admin/api/api.php", {
                method: 'POST',
                body: bodyFormData
              }).then((response) => response.json()).then((response) => {
                setIsLoading(false)
                if(response!==null){
                  if(response.status!==200){
                    addToast("API response : "+response.message, { appearance: 'error' });
                  }else{
                    addToast("API response : "+response.message, { appearance: 'success' });
                    router.push('/Login');
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
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            className="form-control"
                                                            placeholder="Enter your name"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="form-control"
                                                            placeholder="Enter your email"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            value={mobile}
                                                            onChange={(e) => setMobile(e.target.value)}
                                                            className="form-control"
                                                            placeholder="Enter your mobile number"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            className="form-control"
                                                            placeholder="Enter your password"
                                                        />
                                                    </div>
                                                    <div className="common_form_submit">
                                                        <button className="btn btn_theme btn_md"
                                                            onClick={(e)=>{e.preventDefault(); e.stopPropagation();registerUser()}}
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
