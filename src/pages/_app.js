import App from "next/app";

import Script from 'next/script';
import { ToastProvider } from 'react-toast-notifications';



class MyApp extends App {
   render() {
      const { Component, pageProps } = this.props;
      return (
         <ToastProvider autoDismissTimeout={3000} autoDismiss={true}>
            <>
               <Component {...pageProps} />
               <Script type="text/javascript" src="js/metisMenu.min.js" strategy="lazyOnload"></Script>
               <Script src="assets/js/jquery-3.6.0.min.js"></Script>
               <Script src="assets/js/bootstrap.bundle.js"></Script>
               <Script src="assets/js/jquery.meanmenu.js"></Script>
               {/* <Script src="assets/js/owl.carousel.min.js"></Script> */}
               <Script src="assets/js/wow.min.js"></Script>
               {/* <Script src="assets/js/custom.js"></Script> */}
               <Script src="assets/js/add-form.js"></Script>
               <Script src="assets/js/form-dropdown.js"></Script>
            </>
         </ToastProvider>

      )
   }
};

export default MyApp; 