import { Button, Heading, HStack, Image, Stack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { FiArrowUpRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { bookmarkNotes } from '../redux/actions/subject';
import { getUser } from '@/redux/actions/auth';

const NotesCard = ({_id, views, title, imageSrc, id, contributor, institution, loading}: any) => {
  const { colorMode } = useColorMode();
  const cardBorderColor = colorMode === 'light' ? "lightgray" : "#2D3748";
  const cardBgColor = colorMode === 'light' ? "#F7FAFC" : "#171923";

  const dispatch = useDispatch();
  const bookmarkNotesHandler = async (notesID: string) => {
    await dispatch(bookmarkNotes(notesID) as any);
    dispatch(getUser() as any);
  }

  return (
    <Stack
      direction={"column"}
      minWidth={"260px"}
      maxWidth={"260px"}
      alignItems={"flex-start"}
      padding={"3"}
      backgroundColor={cardBgColor}
      border={`1px solid ${cardBorderColor}`}
      borderRadius={"10px"}
      fontFamily={"Segoe UI"}
    >
      <Image
        src={imageSrc}
        alt={"Notes icon"}
        width={50} height={50}
        borderRadius={"10px"}
        marginBottom={"1"}
      />
      
      <Heading
        as={"h4"}
        noOfLines={1}
        textAlign={"left"}
        fontFamily={"Inter"}
        size={"md"}
        children={title}
      />

      <Text
        fontFamily={"Inter"}
        size={"md"}
        children={`${views} views`}
      />

      <Text
        fontSize={"13px"}
        children={`by ${contributor}`}
      />

      <Text
        textAlign={"center"}
        size={"xs"}
        fontSize={"13px"}
        fontStyle={"italic"}
        children={`Source: ${institution}`}
      />

      <HStack justifyContent="flex-end" width={"100%"} paddingTop={"1"}>
        <Link href={`/notes/${id}`}>
          <Button colorScheme={"teal"} size={"sm"} leftIcon={<FiArrowUpRight />}>
            Open
          </Button>
        </Link>
      
        <Button color={useColorModeValue("teal.600", "teal.300")} size={"sm"} isLoading={loading} onClick={() => bookmarkNotesHandler(_id)}>
          <BsFillBookmarkFill />
        </Button>
      </HStack>
    </Stack>
  );
}

export default NotesCard