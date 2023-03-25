import { Flex, Heading } from "@chakra-ui/react"

const contribute = () => {
  document.title = "Contribute to CollegeNotes"
  return (
    <Flex height={"94vh"} alignItems={"center"} justifyContent={"center"}>
      <Heading
        size={"lg"}
        fontWeight={"normal"}
        textAlign={"center"}
        fontFamily={"Roboto"}
        opacity={"0.8"}
      >
        Contributions will be made live soon.
      </Heading>
    </Flex>
  )
}

export default contribute