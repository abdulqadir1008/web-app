import { Route, Routes } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import EmployeeLogin from '../pages/EmployeeLogin';
import MapsLatLngs from '../components/MapsLatLnd';
import OwnerLogin from '../pages/OwnerLogin';
import AboutUs from '../pages/infoPages/AboutUs';
import CarListingPage from '../pages/CarListingPage';
import CarRegistration from '../pages/CarRegistration';
import Compare from '../pages/HomePage/Compare';
import ContactUs from '../pages/infoPages/ContactUs';
import ListingPage from '../pages/ListingPage';
import Wishlist from '../pages/Wishlist';
import OwnerProfile from '../pages/OwnerProfile';
import EmployeeSignUp from '../pages/EmployeeSignUp';
import OwnerSignUp from '../pages/OwnerSignUp';
import PrivateRoutsOwner from './PrivateRoutsOwner';
import CustomerSignUp from '../pages/SignIn/CustomerSignUp';
import CustomerLogin from '../pages/SignIn/CustomerLogin';
import PrivateRoutsCustomer from './PrivateRoutsCustomer';
import CustomerProfile from '../pages/Account/CustomerProfile';
import MyBookings from '../pages/Account/MyBookings';
import LoginWithPhone from '../pages/LoginWithPhone';
import TermsAndCondition from '../pages/infoPages/TermsAndCondition';
import CancellationPage from '../pages/infoPages/CancellationAndRefundPolicy';
import FaqPage from '../pages/infoPages/FAQ';
import CareerPage from '../pages/infoPages/CareerPage';
import PrivacyPolicy from '../pages/infoPages/PrivacyPolicy';
import Hyderabad from '../pages/Blogs/Hyderabad';
import Vision from '../pages/Blogs/Vision';
import CarImagesCard from '../components/carImagesCarousel';
import LandingPage from '../pages/LandingPage/LandingPage';
import HomePage from '../pages/HomePage/HomePage';
import BillingPage from '../pages/BillingPage/BillingPage';
import PaymentFormPage from '../pages/BillingPage/PaymentFormPage';
import BookingSuccess from '../pages/BookingStatusPage/BookingSucces';
import BookingFailure from '../pages/BookingStatusPage/BookingFailure';
import KYC from '../pages/Account/KYC';
import AdminPanelRoutes from './AdminPanelRoutes';
import BookingUpdate from '../pages/BookingUpdate/BookingUpdate';
import HomePage2 from '../pages/HomePage/HomePage2';
const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/panel/*" element={<AdminPanelRoutes />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/images" element={<CarImagesCard />} />
        <Route path="/allCars" element={<HomePage />} />
        <Route path="/allCars2" element={<HomePage2 />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/carRegistration" element={<CarRegistration />} />
        <Route path="/listingPage" element={<ListingPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/customer/Profile" element={<CustomerProfile />} />
        <Route path="/bottom" element={<BottomMenu />} />
        <Route path="/list" element={<CarListingPage />} />
        <Route path="/termsandcondition" element={<TermsAndCondition />} />
        <Route path="/cancellationpage" element={<CancellationPage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />

        <Route path="/success/:customer_booking_id" element={<BookingSuccess />} />
        <Route path="/failure/:customer_booking_id" element={<BookingFailure />} />
        <Route path="/updatebooking/:customer_booking_id" element={<BookingUpdate />} />
        <Route path="/maps" element={<MapsLatLngs />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
        <Route path="/faqpage" element={<FaqPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/employee">
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/signup" element={<EmployeeSignUp />} />
        </Route>
        <Route path="/blog">
          <Route path="/blog/hyderabad" element={<Hyderabad />} />
          <Route path="/blog/vision" element={<Vision />} />
        </Route>
        <Route path="/owner">
          <Route path="/owner/login" element={<OwnerLogin />} />
          <Route path="/owner/signup" element={<OwnerSignUp />} />
        </Route>
        <Route path="/signUp" element={<CustomerSignUp />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/phoneauth" element={<LoginWithPhone />} />
        <Route element={<PrivateRoutsOwner />}>
          <Route path="/owner/Profile" element={<OwnerProfile />} />
          <Route path="/list" element={<CarListingPage />} />
        </Route>
        <Route element={<PrivateRoutsCustomer />}>
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/PaymentFormPage" element={<PaymentFormPage />} />
        </Route>
        {/* <Route path="/datepicker" element={<DatePicke />} /> */}
      </Routes>
    </div>
  );
};

export default Body;
