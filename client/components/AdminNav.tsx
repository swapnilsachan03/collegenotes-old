import { Button, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';

const AdminNav = () => {
  const router = useRouter();
  const currRoute = router.pathname;

  return (
    <>
          <HStack
            alignItems={"center"}
            justifyContent={"center"}
            height={"3em"}
            bgColor={"gray.700"}
            gap={["2px", "3"]}
          >
            <LinkButton text="Dashboard" url="dashboard" active={currRoute === "/admin/dashboard"} />
            <Text fontSize={"sm"} color={"gray.500"} children={"|"} />

            <LinkButton text="Add Subject" url="add-subject" active={currRoute === "/admin/add-subject"} />
            <Text fontSize={"sm"} color={"gray.500"} children={"|"} />

            <LinkButton text="Subjects" url="subjects" active={currRoute === "/admin/subjects"} />
            <Text fontSize={"sm"} color={"gray.500"} children={"|"} />

            <LinkButton text="Users" url="users" active={currRoute === "/admin/users"} />
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