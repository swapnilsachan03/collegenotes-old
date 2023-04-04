import { useState, useEffect } from "react";
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { getUser } from "../redux/actions/auth";
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import store from "../redux/store"
import type { AppProps } from 'next/app'
import theme from '@/config/theme';
import { createWrapper } from 'next-redux-wrapper';
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/Layout/Loader";

const wrapper = createWrapper(store);

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