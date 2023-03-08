import { Avatar, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const about = () => {

  return (
    <>
    <Flex
      width={"100%"}
      height={["10em", "12em", "15em"]}
      justifyContent={"center"}
      alignItems={"center"}
      bgImage={"https://images.unsplash.com/photo-1544411047-c491e34a24e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
    >
      <Heading
        size={["2xl", "3xl", "4xl"]}
        fontFamily={"Poppins"}
        color={"white"}
        children={"Made in a college."}
      />
    </Flex>

    <Flex
      width={"100%"}
      direction={"row"}
      justifyContent={"space-around"}
    >
      <Stack
        height={"100%"}
        marginX={"3"}
        marginY={["8","10","12","12","14"]}
        width={["container.md",  "container.md", "container.md", "900px"]}
      >
        <VStack
          gap={"7"}
          width={"100%"}
          paddingBottom={"8"}
          borderBottom={"1px solid lightgray"}
          marginBottom={["12", "12", "14"]}
        >
          <Flex
            direction={["column", "column", "row"]}
            width={"100%"}
          >
            <Flex
              width={["", "", "25%"]}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              marginBottom={"5"}
            >
              <Heading
                size={"sm"}
                children={"About Us"}
                paddingBottom={"2px"}
                borderBottom={"2px solid"}
              />
            </Flex>

            <VStack width={["", "", "75%"]}>
              <Text fontFamily={"Inter"} textAlign={"justify"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tincidunt vitae semper quis lectus nulla. Lobortis mattis aliquam faucibus purus. Feugiat pretium nibh ipsum consequat nisl vel. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Venenatis lectus magna fringilla urna porttitor rhoncus dolor. Ipsum consequat nisl vel pretium lectus quam id leo. Sodales ut eu sem integer. Scelerisque purus semper eget duis at tellus. Egestas integer eget aliquet nibh praesent tristique. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Sagittis id consectetur purus ut faucibus. Arcu dictum varius duis at consectetur lorem donec. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Pellentesque habitant morbi tristique senectus et netus et. Quam vulputate dignissim suspendisse in. Nulla pellentesque dignissim enim sit amet venenatis. Ultrices vitae auctor eu augue ut.
              </Text>
            </VStack>
          </Flex>
          
          <Flex
            direction={["column", "column", "row"]}
            width={"100%"}
          >
            <Flex
              width={["", "", "25%"]}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              marginBottom={"5"}
            >
              <Heading
                size={"sm"}
                children={"Tech Stack"}
                paddingBottom={"2px"}
                borderBottom={"2px solid"}
              />
            </Flex>

            <VStack width={["", "", "75%"]}>
              <Text fontFamily={"Inter"} textAlign={"justify"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tincidunt vitae semper quis lectus nulla. Lobortis mattis aliquam faucibus purus. Feugiat pretium nibh ipsum consequat nisl vel. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Venenatis lectus magna fringilla urna porttitor rhoncus dolor. Ipsum consequat nisl vel pretium lectus quam id leo.
              </Text>
            </VStack>
          </Flex>
        </VStack>
        
        <Flex
          width={"100%"}
          direction={["column-reverse", "column-reverse", "row"]}
        >
          <VStack alignItems={"flex-start"} width={["", "", "70%"]}>
            <Heading
              size={"sm"}
              children={"Message from the founder"}
              paddingBottom={"2px"}
              borderBottom={"2px solid"}
            />

            <Text fontFamily={"Inter"} textAlign={"justify"} paddingTop={"3"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tincidunt vitae semper quis lectus nulla. Lobortis mattis aliquam faucibus purus. Feugiat pretium nibh ipsum consequat nisl vel. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Venenatis lectus magna fringilla urna porttitor rhoncus dolor.
            </Text>
          </VStack>
          
          <VStack
            width={["", "", "30%"]}
            alignItems={"center"}
            justifyContent={"center"}
            fontSize={"sm"}
            textColor={"gray.500"}
            fontFamily={"Inter"}
            marginBottom={["9", "9", ""]}
          >
            <Avatar
              size={"2xl"}
              name={"Swapnil Sachan"}
            />

            <p style={{marginTop: "15px"}}>Swapnil Sachan</p>
            <p style={{marginTop: "1px"}}>Founder, CollegeNotes</p>
          </VStack>
        </Flex>

        <VStack fontFamily={"Inter"} paddingTop={["10", "16"]} fontSize={"13px"}>
          <p>Made with ❤️ in TypeScript</p>
          <p style={{marginTop: "2px"}}>All payments are secured by Razorpay</p>
        </VStack>
      </Stack>
    </Flex>
    </>
  )
}

export default about