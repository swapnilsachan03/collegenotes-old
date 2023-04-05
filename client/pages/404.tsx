import { Heading, Image, VStack } from "@chakra-ui/react"
import Head from "next/head";
import { useEffect } from "react";
import ReactGA from "react-ga4";

const NotFound = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: document.title + window.location.pathname });
  }, []);

  return (
    <>
    <Head>
      <title>404 Not Found - CollegeNotes</title>
      <meta name='description' content='Error 404 - Not Found.'/>

      <meta property='og:title' content='404 Not Found - CollegeNotes' key={"og-title"} />
      <meta property='og:description' content='Error 404 - Not Found' key={"og-description"} />

      <meta content='404 Not Found - CollegeNotes' name='twitter:title' key={"twitter-title"} />
      <meta content='Error 404 - Not Found' name='twitter:description' key={"twitter-description"} />
    </Head>

    <VStack height={"95vh"} alignItems={"center"} justifyContent={"center"} gap={"8"}>
      <Image
        src={"/images/404.png"}
        width={"25em"}
        alt={"404 Not Found"}
        paddingX={["3", "3", "unset"]}
        loading={"lazy"}
      />

      <Heading textAlign={"center"} fontFamily={"Raleway"} fontWeight={"normal"} fontSize={"1.7em"}>
        I looked everywhere, but...
      </Heading>
    </VStack>
    </>
  )
}

export default NotFound