const ErrorValidation =(error:any)=>{
  if(error){
    const {message,code} = error[0]
    throw {message}
  }
}
export default ErrorValidation

// const ErrorHandler = ({error,resetErrorBoundary}:any) => {
// alert(error)
// window.location.reload();
// };
// export default ErrorHandler;

// import React from "react";
// import CustomerLogin from "../pages/CustomerLogin";

// class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
//   constructor(props: any) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   // static getDerivedStateFromError(error:any) {
//   //   // Update state so the next render will show the fallback UI.
//   //   return { hasError: true };
//   // }

//   componentDidCatch(error: any) {
//     // You can also log the error to an error reporting service
//     // logErrorToMyService(error);
//     this.setState({ hasError: true });
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return <h1>Something went wrong.</h1>;
//     }
//   }
// }
// export default ErrorBoundary
