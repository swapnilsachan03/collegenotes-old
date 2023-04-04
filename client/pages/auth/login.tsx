import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { login } from '../../redux/actions/auth';
import ProtectedRoute from '@/others/ProtectedRoute';
import Head from 'next/head';

const Login = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: document.title + window.location.pathname });
  }, [])

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  const dispatch = useDispatch();

  const submitHandler = (e: Event) => {
    e.preventDefault();
    dispatch(login(email, password) as any);
    router.push("/");
  }

  return (
    <>
    <Head>
      <title>Login - CollegeNotes</title>
      <meta name='description' content='Login to CollegeNotes.'/>

      <meta property='og:title' content='Login - CollegeNotes'/>
      <meta property='og:description' content='Login to CollegeNotes.'/>

      <meta content='Login - CollegeNotes' name='twitter:title'/>
      <meta content='Login to CollegeNotes.' name='twitter:description'/>
    </Head>
    
    <Container h={"95vh"} width={["90%", "20em"]}>
      <VStack h={"full"} justifyContent={"center"} spacing={"6"}>
        <Heading fontFamily={"Roboto Condensed"} size={"lg"} children={"Login"} />

        <form style={{width: "100%"}}>
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
          
          <Box marginY={"4"}>
            <FormLabel htmlFor="password" children="Password" fontSize={'sm'} marginBottom={"0"} />
            <Input 
              required 
              id="password"
              variant={"flushed"}
              size={"sm"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password here"
              type={"password"}
              focusBorderColor={"teal.500"}
            />
          </Box>
          
          <Box marginY={"4"}>
            <Link href="/auth/forgot-password">
              <Button size={"sm"} variant={"link"}>
                Forgot password?
              </Button>
            </Link>
          </Box>

          <Button marginY={"4"} size={"sm"} colorScheme={"teal"} type="submit" onClick={(e: any) => submitHandler(e)}>
            Login
          </Button>

          <Box marginY={"4"} fontSize={"sm"}>
            New user? {" "}
            <Link href="/auth/register">
              <Button variant="link" size={"sm"} colorScheme={"teal"}>
                Sign Up
              </Button>
            </Link>
            {" "} here!
          </Box>
        </form>
      </VStack>
    </Container>
    </>
  )
}

export default ProtectedRoute(Login, false, false, "/user/profile");