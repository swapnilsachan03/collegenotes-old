import { Flex, HStack, Img, Text, useColorMode, VStack } from '@chakra-ui/react';

const ReviewCard = ({review}: any) => {
  const { colorMode } = useColorMode();
  const cardBorderColor = colorMode === 'light' ? "lightgray" : "#2D3748";
  const cardBgColor = colorMode === 'light' ? "#F7FAFC" : "#171923";

  return (
    <Flex
      direction={"column"}
      gap={"10"}
      maxW={["full", "full", "300px", "550px"]}
      padding={"6"}
      backgroundColor={cardBgColor}
      border={`1px solid ${cardBorderColor}`}
      borderRadius={"2xl"}
      boxShadow={"lg"}
    >
      <Text fontSize={"lg"} children={review.content} />

      <HStack gap={"4"}>
        <Img
          src={review.profileImg}
          width={"5.5em"}
          borderRadius={"lg"}
        />

        <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
          <Text
            fontFamily={"Inter"}
            fontSize={"xl"}
            fontWeight={"bold"}
            children={review.name}
          />

          <Flex direction={"column"} alignItems={"flex-start"}>
            <Text fontSize={"sm"} children={review.institution} />
            <Text color={"darkslategray"} fontSize={"sm"} children={review.degreeAndYear} />
          </Flex>
        </VStack>
      </HStack>
    </Flex>
  )
}

export default ReviewCard