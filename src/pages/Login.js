import React from 'react'
import Header from '@/component/Header'
import Footer from '@/component/Footer'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {useEffect,useState} from 'react'

export default function Login() {

  const router = useRouter()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  async function submited() {
    
    let item = {
      "username": username,
"password": password,
 }
console.log(item);
let result = await fetch("https://whollykart.com/ap/logintest.php",{
  method: 'POST',
  body:JSON.stringify(item),
  headers:{
    "Content-Type":"application/json",
    "Accept":'application/json',
    
  }

});
result= await result.json();

const id = result;
console.log(id);

console.log(id.stat)


if(id.stat = 1){
  
  router.push("/Searchresult")
}

}


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
            <h2>Login</h2>
            <ul>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <span>
                  <i className="fas fa-circle" />
                </span>{" "}
                Login
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
              <h3>Login your account</h3>
              <h2>Logged in to stay in touch</h2>
            </div>
            <div className="common_author_form">
              <form action="#" id="main_author_form">
                <div className="form-group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    className="form-control"
                    placeholder="Enter user name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter password"
                  />
                  <a href="forgot-password.html">Forgot password?</a>
                </div>
                <div className="common_form_submit">
                  <button className="btn btn_theme btn_md"
                  onClick={submited}
                  >Log in</button>
                </div>
                <div className="have_acount_area">
                  <p>
                    Dont have an account?{" "}
                    <a href="register.html">Register now</a>
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
  )
}
