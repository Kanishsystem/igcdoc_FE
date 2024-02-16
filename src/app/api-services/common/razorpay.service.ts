import { Injectable } from '@angular/core';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root',
})
export class RazorpayService {
  constructor() {}

  getRazorOptions(data: any, call_back_func: any) {
    let options = {
      key: data.keyId, // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: data.razorData.comname,
      description: 'Book Purchase',
      image: data.razorData.logo,
      order_id: data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
      //  console.log(" success response ", response);
        //alert(response.razorpay_payment_id);
        //alert(response.razorpay_order_id);
        //alert(response.razorpay_signature);
        call_back_func(response);
      },
      prefill: {
        name: data.razorData.name,
        email: data.razorData.email,
        contact: data.razorData.mobile,
      },
      notes: {
        address: data.razorData.address,
      },
      theme: {
        color: '#3399cc',
      },
    };
    return options;
  }

  openRazorPay(data:any,call_back_func:any,failure_func:any) {
    let options = this.getRazorOptions(data,call_back_func);
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', failure_func);
    rzp1.open();
  }



}

  /*
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
      */