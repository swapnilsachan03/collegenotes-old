import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Link from "next/link"

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
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
            <Link href="/auth/reset_password">
              <Button size={"sm"} variant={"link"}>
                Forgot password?
              </Button>
            </Link>
          </Box>

          <Button marginY={"4"} size={"sm"} colorScheme={"teal"} type="submit">
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
  )
}

export default Login