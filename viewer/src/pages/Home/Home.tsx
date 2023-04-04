import { Flex, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "https://www.collegenotes.co.in";
    }, 1000)
  }, [])

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"95vh"}
    >
      <Heading size={"sm"} fontFamily={"Inter"} textAlign={"center"} lineHeight={"1.6"}>
        This is CollegeNotes Viewer, <br/>
        Redirecting to CollegeNotes main site...
      </Heading>
    </Flex>
  )
}

export default Home