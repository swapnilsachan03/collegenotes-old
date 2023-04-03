import ProtectedRoute from "@/others/ProtectedRoute";
import { Flex, Heading } from "@chakra-ui/react"
import { useEffect } from "react"
import ReactGA from "react-ga4";

const Contribute = () => {
  document.title = "Contribute to CollegeNotes"

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: document.title })
  }, [])

  return (
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
  )
}

export default ProtectedRoute(Contribute, true, false);