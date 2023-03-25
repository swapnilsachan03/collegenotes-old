import { Button, HStack, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';

const AdminNav = () => {
  const currRoute = useLocation();

  return (
    <>
          <HStack
            alignItems={"center"}
            justifyContent={"center"}
            height={"3em"}
            bgColor={"gray.700"}
            gap={["2px", "3"]}
          >
            <LinkButton text="Dashboard" url="dashboard" active={currRoute.pathname === "/admin/dashboard"} />
            <Text fontSize={"sm"} color={"gray.500"} children={"|"} />

            <LinkButton text="Add Subject" url="add-subject" active={currRoute.pathname === "/admin/add-subject"} />
            <Text fontSize={"sm"} color={"gray.500"} children={"|"} />

            <LinkButton text="Subjects" url="subjects" active={currRoute.pathname === "/admin/subjects"} />
            <Text fontSize={"sm"} color={"gray.500"} children={"|"} />

            <LinkButton text="Users" url="users" active={currRoute.pathname === "/admin/users"} />
          </HStack>
    </>
  )
}

export default AdminNav

const LinkButton = ({url, text, active}: any) => {
  return (
    <a href={`/admin/${url}`}>
      <Button
        size={"sm"}
        variant={"link"}
        color={active ? "cyan" : "white"}
      >
        {text}
      </Button>
    </a>
  )
}