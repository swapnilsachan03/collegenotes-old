import { useEffect } from "react";
import { ChakraProvider } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppProps } from 'next/app'
import ReactGA from "react-ga4";
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { getUser } from "../redux/actions/auth";
import toast, { Toaster } from "react-hot-toast";
import '@/styles/globals.css'
import store from "../redux/store"
import theme from '@/config/theme';
import { createWrapper } from 'next-redux-wrapper';
import Loader from "@/components/Layout/Loader";

const wrapper = createWrapper(store);

const TRACKING_ID = "G-M2VTB22JD3";
ReactGA.initialize(TRACKING_ID);

function App({ Component, ...rest }: AppProps) {
  const { props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser() as unknown as any);
  }, [dispatch])

  const { isAuthenticated, user, loading, error, message } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if(error && error !== "Please login to access") {
      toast.error(error)
      dispatch({ type: "clearError" });
    }

    if(message) {
      toast.success(message)
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message])

  return (
    <ChakraProvider theme={theme}>
      { loading ? (<Loader />) : (
        <>
        <Navbar isAuthenticated={isAuthenticated} />
        <Component {...pageProps} user={user} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"} />
        <Footer />
        </>
      )}
      <Toaster />
    </ChakraProvider>
  );
}

export default wrapper.withRedux(App);