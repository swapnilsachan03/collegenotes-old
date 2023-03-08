import { Button, Heading, HStack, Image, Stack, Text, useColorMode, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

const SubjectCard = ({views, title, imageSrc, id, description, notesCount, yearOfStudy}: any) => {
  const {colorMode, toggleColorMode} = useColorMode();
  const cardBorderColor = colorMode === 'light' ? "lightgray" : "#2D3748";
  const cardBgColor = colorMode === 'light' ? "#F7FAFC" : "#171923";

  return (
    <Stack
      direction={"column"}
      width={["16.5em", "16.5em", "16.5em", "20em", "20em"]}
      alignItems={"flex-start"}
      padding={"3"}
      backgroundColor={cardBgColor}
      border={`1px solid ${cardBorderColor}`}
      borderRadius={"10px"}
    >
      <Image
        src={imageSrc}
        alt={"Subject reference image"}
        width={50} height={50}
        borderRadius={"10px"}
        marginBottom={"1"}
      />
      
      <Heading
        textAlign={"left"}
        fontFamily={"Inter"}
        size={"md"}
        children={title}
      />

      <HStack>
        <Text
          fontFamily={"Inter"}
          size={"md"}
          children={views}
        />

        <Text
          fontFamily={"Inter"}
          size={"md"}
          children={"views"}
        />
      </HStack>

      <Text noOfLines={4} children={description} fontSize={"13px"} textAlign={"justify"} />

      <Text
        textAlign={"center"}
        size={"xs"}
        fontSize={"13px"}
        fontStyle={"italic"}
        children={`${notesCount} notes available`}
      />

      <Stack direction={"row"} justifyContent="flex-end" width={"100%"}>
        <Link href={`/notes/${id}`}>
          <Button colorScheme={"teal"} size={"sm"} leftIcon={<FiArrowUpRight />}>
            Open
          </Button>
        </Link>
      
        <Button color={"red.400"} size={"sm"}>
          <FaHeart />
        </Button>
      </Stack>
    </Stack>
  );
}

export default SubjectCard