import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Link from "next/link"

const reset_password = () => {
  const [cnfPassword, setCnfPassword] = useState();
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

          <Button marginY={"3"} size={"sm"} colorScheme={"teal"} type="submit">
            Reset
          </Button>
        </form>
      </VStack>
    </Container>
  )
}

export default reset_password