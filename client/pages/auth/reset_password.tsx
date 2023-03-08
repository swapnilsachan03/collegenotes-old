import { Box, Button, Container, FormLabel, Heading, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Link from "next/link"

const reset_password = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Container h={"95vh"} width={["90%", "20em"]}>
      <VStack h={"full"} justifyContent={"center"} spacing={"6"}>
        <Heading
          fontFamily={"Roboto Condensed"}
          size={"lg"}
          children={"Account Recovery"}
        />

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

          <Button marginY={"4"} size={"sm"} colorScheme={"teal"} type="submit">
            Send Reset Link
          </Button>
        </form>
      </VStack>
    </Container>
  )
}

export default reset_password