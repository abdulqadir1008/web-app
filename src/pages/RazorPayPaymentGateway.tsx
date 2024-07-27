import axios from 'axios';

import HeadersLogo from '../assets/HeadersLogo.png';

function loadscript(src: any) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default async function displayRazorpay() {
  const res = await loadscript('https://checkout.razorpay.com/v1/checkout.js');
  if (!res) {
    alert('wrong sdk');
    return;
  }

  const {
    data: {
      data: { createPayment }
    }
  } = await axios.post(import.meta.env.VITE_BACKEND_BASE_URL, {
    query: `mutation{
  createPayment(input:{
    amount:123
    receipt:"123"
  }){
    amount
    orderId
    currency
  }
}`
  });

  const options = {
    key: __DEV ? 'rzp_test_iCRbGTr1V4CxK8' : 'null', // Enter the Key ID generated from the Dashboard
    amount: '100', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Infila',
    description: 'Test Transaction',
    image: { HeadersLogo },
    order_id: createPayment.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    // callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
    prefill: {
      name: 'Gaurav Kumar',
      email: 'gaurav.kumar@example.com',
      contact: '9000090000'
    },
    notes: {
      address: 'Razorpay Corporate Office'
    },
    theme: {
      color: '#3399cc'
    },
    handler: async function (response: any) {
      const { razorpay_payment_id } = response;
      // setPaymentId(razorpay_payment_id);
      const { data } = await axios.post(import.meta.env.VITE_BACKEND_BASE_URL, {
        query: `mutation{
  verifyPayment(input:{
    paymentId:"${razorpay_payment_id}"
    
  }){
    amount
    orderId
    currency
  }
}`
      });
    }
  };
  const __window = window as any;
  const paymentObject = new __window.Razorpay(options);
  paymentObject.open();
}
const __DEV = 'localhost';
