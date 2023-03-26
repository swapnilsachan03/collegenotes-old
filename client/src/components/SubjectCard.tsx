import { Button, Heading, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { favoriteSubject } from '../redux/actions/subject';

const SubjectCard = ({_id, views, title, imageSrc, id, description, notesCount, loading}: any) => {
  const { colorMode } = useColorMode();
  const cardBorderColor = colorMode === 'light' ? "lightgray" : "#2D3748";
  const cardBgColor = colorMode === 'light' ? "#F7FAFC" : "#171923";

  const dispatch = useDispatch();
  const favoriteSubjectHandler = async (subjectID: string) => {
    await dispatch(favoriteSubject(subjectID) as any);
  }

  return (
    <Stack
      direction={"column"}
      width={["16.5em", "16.5em", "16.5em", "20em", "20em"]}
      justifyContent={"space-between"}
      padding={"3"}
      backgroundColor={cardBgColor}
      border={`1px solid ${cardBorderColor}`}
      borderRadius={"10px"}
    >
      <Stack alignItems={"flex-start"}>
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
          children={`${notesCount} notes available`}
        />
      </Stack>

      <Stack direction={"row"} justifyContent="flex-end" width={"100%"}>
        <Link to={`/subject/${id}`}>
          <Button colorScheme={"teal"} size={"sm"} leftIcon={<FiArrowUpRight />}>
            Open
          </Button>
        </Link>

        <Button color={"red.400"} size={"sm"} isLoading={loading} onClick={() => favoriteSubjectHandler(_id)}>
          <FaHeart />
        </Button>
      </Stack>
    </Stack>
  );
}

export default SubjectCard