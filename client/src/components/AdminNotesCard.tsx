import { Button, Heading, HStack, Stack, Text, useColorMode } from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { RiDeleteBin4Fill } from 'react-icons/ri';

const AdminNotesCard = ({title, id, _id, dbSubjectID, index, views, contributor, description, deleteNotesHandler, loading}: any) => {
  const { colorMode } = useColorMode();
  const cardBorderColor = colorMode === 'light' ? "lightgray" : "#2D3748";
  const cardBgColor = colorMode === 'light' ? "#F7FAFC" : "#171923";

  return (
    <Stack
      direction={"row"}
      width={"full"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      padding={"3"}
      backgroundColor={cardBgColor}
      border={`1px solid ${cardBorderColor}`}
      borderRadius={"10px"}
      fontFamily={"Segoe UI"}
    >
      <HStack alignItems={"flex-start"} spacing={"4"}>
        <Heading as={"h4"} children={`${index+1}.`} fontFamily={"Inter"} size={"md"} />

        <Stack direction={"column"} justifyContent={"space-between"}>
          <HStack>
            <Heading
              as={"h4"}
              textAlign={"left"}
              fontFamily={"Inter"}
              size={"md"}
              children={title}
            />

            <Text
              fontFamily={"Inter"}
              size={"md"}
              children={`by ${contributor}`}
            />
          </HStack>

          <Text
            fontSize={"14px"}
            opacity={"0.7"}
            children={`${id} | ${views} views`}
          />

          <Text
            fontSize={"14px"}
            children={description}
          />
        </Stack>
      </HStack>

      <HStack justifyContent="flex-end" paddingTop={"1"}>
        <a href={`/notes/${id}`}>
          <Button colorScheme={"cyan"} variant={"outline"} size={"sm"} leftIcon={<FiArrowUpRight />}>
            Open
          </Button>
        </a>

        <a href={`/notes/${id}`}>
          <Button colorScheme={"cyan"} size={"sm"}>
            <FaDownload />
          </Button>
        </a>
      
        <Button colorScheme={"red"} size={"sm"} isLoading={loading} onClick={() => deleteNotesHandler(_id, dbSubjectID)}>
          <RiDeleteBin4Fill />
        </Button>
      </HStack>
    </Stack>
  );
}

export default AdminNotesCard