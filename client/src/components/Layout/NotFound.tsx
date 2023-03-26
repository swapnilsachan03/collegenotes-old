import { Heading, Image, VStack } from "@chakra-ui/react"

const NotFound = () => {
  document.title = "404 Not Found - CollegeNotes"
  
  return (
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
  )
}

export default NotFound