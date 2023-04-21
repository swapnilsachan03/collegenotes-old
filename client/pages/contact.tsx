import { Box, Button, Container, FormLabel, Heading, Input, Text, Textarea, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactGA from "react-ga4";
import Link from 'next/link';
import Head from 'next/head';
import { FiSend } from 'react-icons/fi';

const Contact = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: document.title + window.location.pathname });
  }, [])

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
    <Head>
      <title>Contact - CollegeNotes</title>
      <meta name='description' content="Contact the CollegeNotes team for any query you have."/>

      <meta property='og:title' content="Contact - CollegeNotes" key={"og-title"} />
      <meta property='og:description' content="Contact the CollegeNotes team for any query you have." key={"og-description"} />

      <meta content="Contact - CollegeNotes" name='twitter:title' key={"twitter-title"} />
      <meta content="Contact the CollegeNotes team for any query you have." name='twitter:description' key={"twitter-description"} />
    </Head>

    <Container height={"95vh"} width={["100%", "25em"]}>
      <VStack height={"full"} justifyContent={"center"} spacing={"6"}>
        <Heading
          as={"h1"}
          size={"lg"}
          fontFamily={"Roboto Condensed"}
          children={"Contact Us"}
          textAlign={"center"}
        />

        <Text
          children={"You can get in touch with us using this form. We will try our best to respond in 24 hours."}
          opacity={"0.8"}
          textAlign={"justify"}
          fontSize={"sm"}
          fontFamily={"Inter"}
        />

        <form style={{width: "100%"}}>
          <Box marginY={"6"}>
            <FormLabel htmlFor="name" children="Name" fontSize={'sm'} marginBottom={"0"} />
            <Input
              required 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              type={"text"}
              variant={"flushed"}
              size={"sm"}
              focusBorderColor={"teal.500"}
            />
          </Box>
          
          <Box marginY={"6"}>
            <FormLabel htmlFor="email" children="Email address" fontSize={'sm'} marginBottom={"0"} />
            <Input 
              required 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              type={"email"}
              variant={"flushed"}
              size={"sm"}
              focusBorderColor={"teal.500"}
            />
          </Box>
          
          <Box marginY={"6"}>
            <FormLabel htmlFor="message" children="Your message" fontSize={'sm'} marginBottom={"0"} />
            <Textarea
              required 
              id="message"
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows={3}
              resize={"none"}
              variant={"flushed"}
              size={"sm"}
              focusBorderColor={"teal.500"}
            />
          </Box>
          
          <Button marginY={"4"} size={"sm"} colorScheme={"teal"} type="submit" leftIcon={<FiSend/>}>
            Send
          </Button>

          <Box marginY={"4"} fontSize={"sm"}>
              Want a new subject? {" "}
              <Link href="/request">
                <Button variant="link" size={"sm"} colorScheme={"teal"}>
                  Request
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

export default Contact