import ProtectedRoute from "@/others/ProtectedRoute";
import { Flex, Heading } from "@chakra-ui/react"
import Head from "next/head";
import { useEffect } from "react"
import ReactGA from "react-ga4";

const Contribute = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: document.title })
  }, [])

  return (
    <>
      <Head>
        <title>Contribute to CollegeNotes</title>
        <meta name='description' content='Contribute any notes or study materials to CollegeNotes that you have prepared and think are good enough for other people to study.'/>

        <meta property='og:title' content='Contribute to CollegeNotes'/>
        <meta property='og:description' content='Contribute any notes or study materials to CollegeNotes that you have prepared and think are good enough for other people to study.'/>

        <meta content='Contribute to CollegeNotes' name='twitter:title'/>
        <meta content='Contribute any notes or study materials to CollegeNotes that you have prepared and think are good enough for other people to study.' name='twitter:description'/>
      </Head>

      <Flex height={"94vh"} alignItems={"center"} justifyContent={"center"}>
        <Heading
          size={"lg"}
          fontWeight={"normal"}
          fontStyle={"italic"}
          textAlign={"center"}
          fontFamily={"Inter"}
          opacity={"0.8"}
        >
          Contributions will be made live soon.
        </Heading>
      </Flex>
    </>
  )
}

export default ProtectedRoute(Contribute, true, false);