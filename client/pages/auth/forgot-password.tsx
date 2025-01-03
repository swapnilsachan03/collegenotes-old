import ProtectedRoute from '@/others/ProtectedRoute';
import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ReactGA from "react-ga4";
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/actions/profile';

const ForgotPassword = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: document.title + window.location.pathname });
  }, []);

  const [email, setEmail] = useState<string>();
  const { loading, error, message } = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if(message) {
      toast.success(message)
      dispatch({ type: "clearMessage" })
    }
    
    if(error) {
      toast.error(error)
      dispatch({ type: "clearError" })
    }
  }, [dispatch, error, message])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword(email) as any);
  }

  return (
    <>
    <Head>
      <title>CollegeNotes Account Recovery</title>
      <meta name='description' content='Account recovery for CollegeNotes in case of forgetting password - send a password reset link to your registered email.'/>

      <meta property='og:title' content='CollegeNotes Account Recovery' key={"og-title"} />
      <meta property='og:description' content='Account recovery for CollegeNotes in case of forgetting password - send a password reset link to your registered email.' key={"og-description"} />

      <meta content='CollegeNotes Account Recovery' name='twitter:title' key={"twitter-title"} />
      <meta content='Account recovery for CollegeNotes in case of forgetting password - send a password reset link to your registered email.' name='twitter:description' key={"twitter-description"} />
    </Head>
    
    <Container h={"95vh"} width={["90%", "20em"]}>
      <VStack h={"full"} justifyContent={"center"} spacing={"6"}>
        <Heading
          fontFamily={"Roboto Condensed"}
          size={"lg"}
          children={"Account Recovery"}
        />

        <form style={{width: "100%"}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}>
          <Box marginY={"6"}>
            <FormLabel htmlFor="email" children="Email address" fontSize={'sm'} marginBottom={"0"} />
            <Input
              required
              id="email"
              variant={"flushed"}
              size={"sm"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              type={"email"}
              focusBorderColor={"teal.500"}
            />
          </Box>

          <Button marginY={"4"} size={"sm"} colorScheme={"teal"} isLoading={loading} type="submit">
            Send Reset Link
          </Button>
        </form>
      </VStack>
    </Container>
    </>
  )
}

export default ProtectedRoute(ForgotPassword, false, false, "/user/profile");