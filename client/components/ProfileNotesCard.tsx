import { Button, Heading, HStack, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import { FiArrowUpRight } from 'react-icons/fi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/actions/auth';
import { toast } from 'react-hot-toast';
import { RiDeleteBin4Fill } from 'react-icons/ri';
import { unBookmarkNotes } from '../redux/actions/profile';
import Link from 'next/link';

const ProfileNotesCard = ({_id, views, title, id, contributor, institution}: any) => {
  const { colorMode } = useColorMode();
  const cardBorderColor = colorMode === 'light' ? "lightgray" : "#2D3748";
  const cardBgColor = colorMode === 'light' ? "#F7FAFC" : "#171923";

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state: any) => state.subjects);

  const unBookmarkNotesHandler = async (notesID: string) => {
    await dispatch(unBookmarkNotes(notesID) as any);
    dispatch(getUser() as any);
  }

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch({ type: "clearError"});
    };

    if(message) {
      toast.success(message);
      dispatch({ type: "clearMessage"});
    }
  }, [dispatch, error, message]);

  return (
    <Stack
      direction={"column"}
      minWidth={["250px", "270px"]}
      maxWidth={["250px", "270px"]}
      alignItems={"flex-start"}
      padding={"3"}
      backgroundColor={cardBgColor}
      border={`1px solid ${cardBorderColor}`}
      borderRadius={"10px"}
      fontFamily={"Segoe UI"}
    >
      <Image
        src={"/images/bookmark.png"}
        padding={"11px"}
        background={"radial-gradient(circle, rgba(252,255,187,1) 0%, rgba(248,255,168,1) 48%, rgba(224,228,19,1) 100%)"}
        alt={"Subject reference image"}
        width={50} height={50}
        borderRadius={"10px"}
        marginBottom={"1"}
      />

      <Heading
        as={"h4"}
        noOfLines={1}
        marginTop={"1"}
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
        children={`Institution: ${institution}`}
      />

      <HStack justifyContent="flex-end" width={"100%"} paddingTop={"1"}>
        <Link href={`https://viewer.collegenotes.co.in/notes/${id}`}>
          <Button colorScheme={"teal"} size={"sm"} leftIcon={<FiArrowUpRight />}>
            Open
          </Button>
        </Link>
      
        <Button colorScheme={"red"} size={"sm"} isLoading={loading} onClick={() => unBookmarkNotesHandler(_id)}>
          <RiDeleteBin4Fill />
        </Button>
      </HStack>
    </Stack>
  );
}

export default ProfileNotesCard