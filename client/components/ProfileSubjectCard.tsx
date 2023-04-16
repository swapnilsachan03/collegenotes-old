import { useEffect } from 'react';
import { Button, Heading, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import { FiArrowUpRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/actions/auth';
import { unfavoriteSubject } from '../redux/actions/profile';
import toast from 'react-hot-toast';
import { RiDeleteBin4Fill } from 'react-icons/ri';
import Link from 'next/link';

const ProfileSubjectCard = ({_id, views, title, id, description, notesCount}: any) => {
  const { colorMode } = useColorMode();
  const cardBorderColor = colorMode === 'light' ? "lightgray" : "#2D3748";
  const cardBgColor = colorMode === 'light' ? "#F7FAFC" : "#171923";

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state: any) => state.subjects);

  const unfavoriteSubjectHandler = async (subjectID: string) => {
    await dispatch(unfavoriteSubject(subjectID) as any);
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
      width={["250px", "270px"]}
      alignItems={"flex-start"}
      padding={"3"}
      backgroundColor={cardBgColor}
      border={`1px solid ${cardBorderColor}`}
      borderRadius={"10px"}
    >
      <Image
        src={"/images/favorite.png"}
        padding={"6px"}
        background={"linear-gradient(90deg, rgba(11,2,150,1) 0%, rgba(38,38,205,1) 48%, rgba(0,155,255,1) 100%)"}
        alt={"Subject reference image"}
        width={50} height={50}
        borderRadius={"10px"}
        marginBottom={"1"}
      />

      <Heading
        marginTop={"1"}
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

      <Text noOfLines={4} children={description} fontSize={"13px"} textAlign={"justify"} />

      <Text
        textAlign={"center"}
        size={"xs"}
        fontSize={"13px"}
        fontStyle={"italic"}
        opacity={"0.8"}
        children={`${notesCount} notes available`}
      />

      <Stack direction={"row"} justifyContent="flex-end" width={"100%"}>
        <Link href={`/subject/${id}`} target={"_blank"} rel="noreferrer">
          <Button colorScheme={"teal"} size={"sm"} leftIcon={<FiArrowUpRight />}>
            Open
          </Button>
        </Link>

        <Button colorScheme={"red"} size={"sm"} isLoading={loading} onClick={() => unfavoriteSubjectHandler(_id)}>
          <RiDeleteBin4Fill />
        </Button>
      </Stack>
    </Stack>
  );
}

export default ProfileSubjectCard