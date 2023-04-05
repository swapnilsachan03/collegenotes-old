import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { resetPassword } from '../../../redux/actions/profile';
import ProtectedRoute from '@/others/ProtectedRoute';
import Head from 'next/head';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: document.title + window.location.pathname });
  }, []);

  const [cnfPassword, setCnfPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { loading, message, error } = useSelector((state: any) => state.profile);
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
    dispatch(resetPassword(token, password) as any);
  }

  return (
    <>
    <Head>
      <title>Reset Password - CollegeNotes</title>
      <meta name='description' content='Reset CollegeNotes password using the password reset link you received on your registered email.'/>

      <meta property='og:title' content='Reset Password - CollegeNotes' key={"og-title"} />
      <meta property='og:description' content='Reset CollegeNotes password using the password reset link you received on your registered email.' key={"og-description"} />

      <meta content='Reset Password - CollegeNotes' name='twitter:title' key={"twitter-title"} />
      <meta content='Reset CollegeNotes password using the password reset link you received on your registered email.' name='twitter:description' key={"twitter-description"} />
    </Head>
    
    <Container h={"95vh"} width={["90%", "20em"]}>
      <VStack h={"full"} justifyContent={"center"} spacing={"6"}>
        <Heading
          fontFamily={"Roboto Condensed"}
          size={"lg"}
          children={"Reset Password"}
        />

        <form style={{width: "100%"}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          if(password === cnfPassword) {
            submitHandler(e);
          } else {
            e.preventDefault();
            toast.error("Passwords do not match");
          }
        }}>
          <Box marginY={"6"}>
            <FormLabel htmlFor="password" children="Password" fontSize={'sm'} marginBottom={"0"} />
            <Input 
              required 
              id="password"
              variant={"flushed"}
              size={"sm"}
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              type={"password"}
              focusBorderColor={"teal.500"}
            />
          </Box>
          
          <Box marginY={"6"}>
            <FormLabel htmlFor="password" children="Confirm password" fontSize={'sm'} marginBottom={"0"} />
            <Input 
              required 
              id="password"
              variant={"flushed"}
              size={"sm"}
              value={cnfPassword} 
              onChange={(e) => setCnfPassword(e.target.value)}
              placeholder="Confirm your new password"
              type={"password"}
              focusBorderColor={"teal.500"}
            />
          </Box>

          <Button marginY={"3"} size={"sm"} colorScheme={"teal"} isLoading={loading} type="submit">
            Reset
          </Button>
        </form>
      </VStack>
    </Container>
    </>
  )
}

export default ProtectedRoute(ResetPassword, false, false, "/user/profile");