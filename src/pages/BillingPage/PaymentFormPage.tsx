import React, { Component } from 'react';

import { resolvePostApiWithHeaders } from '../../Common/ResolveApi';
import { PayuQuery } from '../../graphqlQueries/PaymentQuery';
interface Payment {
  amount?: number;
  booking_id?: string;
  full_name?: string;
  email_id?: string;
  phone_number?: string;
  car_id?: string;
  hash?: string;
  key?: string;
  customer_booking_id?: string;
}
interface IState {
  car_id: string;
  starts: string;
  ends: string;
  bookingAmount: number;
  token: string;
  PaymentForm: Payment;
  protection_plan_amount: any;
  protection_plan_type: any;
}

export default class PaymentFormPage extends Component {
  searchParams = new URLSearchParams(window.location.search);
  state: IState = {
    car_id: this.searchParams.get('car_id')!,
    starts: this.searchParams.get('starts')!.replace('GMT ', 'GMT+')!,
    ends: this.searchParams.get('ends')!.replace('GMT ', 'GMT+')!,
    bookingAmount: parseInt(this.searchParams.get('amount')!),
    token: this.searchParams.get('token')!,
    PaymentForm: {},
    protection_plan_amount: this.searchParams.get('plan_amount'),
    protection_plan_type: this.searchParams.get('plan_type')
  };
  handleProceed = async () => {
    try {
      const { createPayUPayment } = await resolvePostApiWithHeaders(
        import.meta.env.VITE_BACKEND_BASE_URL,
        PayuQuery(this.state.car_id, this.state.starts, this.state.ends, this.state.bookingAmount, this.state.protection_plan_type, this.state.protection_plan_amount),
        this.state.token
      );
      this.setState({ PaymentForm: createPayUPayment });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.handleProceed();
  }
  componentDidUpdate(prevProps: Readonly<{}>, prevState: any, snapshot?: any): void {
    if (this.state.PaymentForm !== prevState.PaymentForm) {
      this.submitForm();
    }
  }
  submitForm() {
    // This will submit the form
    const PayuForm: any = this.refs.PayuForm;
    PayuForm.submit();
  }

  render() {
    const { PaymentForm } = this.state;
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h1 className="fst-italic">Taking you to payment gateway</h1>
        <form ref="PayuForm" action={import.meta.env.VITE_PAYU_URL} method="post">
          <input type="hidden" name="key" value={PaymentForm.key} />
          <input type="hidden" name="txnid" value={PaymentForm.booking_id} />
          <input type="hidden" name="productinfo" value={PaymentForm.car_id} />
          <input type="hidden" name="amount" value={PaymentForm.amount} />
          <input type="hidden" name="email" value={PaymentForm.email_id} />
          <input type="hidden" name="firstname" value={PaymentForm.full_name} />
          <input type="hidden" name="surl" value={`${import.meta.env.VITE_INFILA_URL}/success/${PaymentForm.customer_booking_id}`} />
          <input type="hidden" name="furl" value={`${import.meta.env.VITE_INFILA_URL}/failure/${PaymentForm.customer_booking_id}`} />
          <input type="hidden" name="phone" value={PaymentForm.phone_number} />
          <input type="hidden" name="hash" value={PaymentForm.hash} />
          <input type="submit" className="button-box book-button-color border-0  heading-text  " value="Complete Booking" style={{ display: 'none' }} />
        </form>
      </div>
    );
  }
}
