import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiLogoutBoxLine, RiMenu5Fill, RiUser3Fill } from 'react-icons/ri'
import { useRouter } from 'next/router'
import Link from 'next/link'

const AdminNav = () => {
  const currRoute = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();

  const SidebarButton = (props: any) => {
    return (
      <Link onClick={onClose} href={props.url}>
        <Button variant={"ghost"}>{props.title}</Button>
      </Link>
    );
  }

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

            <LinkButton text="Add Subject" url="add_subject" active={currRoute.pathname === "/admin/add_subject"} />
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
    <Link href={`/admin/${url}`}>
      <Button
        size={"sm"}
        variant={"link"}
        color={active ? "cyan" : "white"}
      >
        {text}
      </Button>
    </Link>
  )
}