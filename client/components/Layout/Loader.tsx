import { Spinner, VStack } from '@chakra-ui/react';

const Loader = ({color = "teal.400"}) => {
  return (
    <VStack height={["93vh", "100vh"]} justifyContent={"center"}>
      <div style={{ transform: "scale(2)" }}>
        <Spinner
          thickness="3px"
          speed="0.75s"
          emptyColor={"transparent"}
          color={color}
          size={"xl"}
        />
      </div>
    </VStack>
  )
}

export default Loader;