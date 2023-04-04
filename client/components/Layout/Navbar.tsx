import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ColorModeSwitcher from "./ColorModeSwitcher";
import { Button, Flex, Heading, IconButton, Stack, useColorModeValue } from "@chakra-ui/react";
import { FaUserCircle, FaUserPlus } from "react-icons/fa"
import { MdLogin, MdLogout } from "react-icons/md"
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"
import styles from "../../styles/Navbar.module.css";
import { logout } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';

const Navbar = ({ isAuthenticated = false }: any) => {
  const [display, changeDisplay] = useState("none");
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutHandler = () => {
    dispatch(logout() as unknown as any);
    router.push("/");
  }

  return (
    <>
      <Stack
        direction={"row"}
        height={"3.6em"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={["1em 0px 1em 1em", "0px 1em"]}
        borderBottom={`1px solid ${useColorModeValue("lightgray", "#2D3748")}`}
      >
        <Link href={"/"}>
            <Heading size={"lg"} fontWeight={"semibold"} fontFamily={"Roboto Condensed"} children={"CollegeNotes"} />
        </Link>
        
        <Flex alignItems={"center"}>
          <Flex
            direction={"row"}
            alignItems={"center"}
            display={["none", "none", "none", "flex", "flex"]}
          >
            <Link href={"/"} className={styles.navbarLinks}>Home</Link>
            <Link href={"/subjects"} className={styles.navbarLinks}>Subjects</Link>
            <Link href={"/contribute"} className={styles.navbarLinks}>Contribute</Link>
            <Link href={"/about"} className={styles.navbarLinks}>About</Link>
          </Flex>

          <Flex
            marginLeft={"5"}
            display={["none", "none", "none", "flex", "flex"]}
          >
            {isAuthenticated ?
              (<>
                <Link href="/user/profile">
                  <Button
                    size={"sm"}
                    colorScheme={"teal"}
                    leftIcon={<FaUserCircle/>}
                  >
                    Profile
                  </Button>
                </Link>

                <Button
                  size={"sm"}
                  colorScheme={"teal"}
                  marginLeft={"2"}
                  leftIcon={<MdLogout/>}
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </>) : 
              
              (<>
                <Link href="/auth/login">
                  <Button
                    size={"sm"}
                    colorScheme={"teal"}
                    leftIcon={<MdLogin/>}
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/auth/register">
                  <Button
                    size={"sm"}
                    colorScheme={"teal"}
                    marginLeft={"2"}
                    leftIcon={<FaUserPlus/>}
                  >
                    Register
                  </Button>
                </Link>
              </>)
            }
          </Flex>

          <ColorModeSwitcher />
          <IconButton
            aria-label="Open menu"
            size={"md"}
            marginLeft={"2"}
            variant={"ghost"}
            icon={<RxHamburgerMenu/>}
            display={["flex", "flex", "flex", "none", "none"]}
            onClick={() => changeDisplay("flex")}
          />
        </Flex>
      </Stack>

      {/* Mobile Navbar Code */}

      <Flex
        className={styles.mobileNav}
        bg={useColorModeValue("white", "gray.800")}
        position={"fixed"}
        top={"0"} left={"0"}
        width={"100vw"} height={"100vh"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        display={display}
        margin={"0"}
        zIndex={"20"}
      >
        <IconButton
          position={"absolute"}
          top={"0"} right={"0"}
          aria-label='Close menu'
          size={"md"}
          marginRight={["0", "4"]}
          marginTop={"2"}
          variant={"ghost"}
          icon={<RxCross1 />}
          onClick={() => changeDisplay("none")}
        />

        <Flex
          direction={"column"}
          alignItems={"center"}
        >
          <Link href={"/"} className={styles.navbarLinksMobile} onClick={() => changeDisplay("none")}>Home</Link>
          <Link href={"/subjects"} className={styles.navbarLinksMobile} onClick={() => changeDisplay("none")}>Subjects</Link>
          <Link href={"/contribute"} className={styles.navbarLinksMobile} onClick={() => changeDisplay("none")}>Contribute</Link>
          <Link href={"/about"} className={styles.navbarLinksMobile} onClick={() => changeDisplay("none")}>About</Link>
        </Flex>

        <Flex marginTop={"10"}>
          {isAuthenticated ?
            (<>
              <Link href="/user/profile">
                <Button
                  size={"sm"}
                  colorScheme={"teal"}
                  leftIcon={<FaUserCircle/>}
                  onClick={() => changeDisplay("none")}
                >
                  Profile
                </Button>
              </Link>

              <Button
                size={"sm"}
                colorScheme={"teal"}
                marginLeft={"2"}
                leftIcon={<MdLogout/>}
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </>) :
            
            (<>
              <Link href="/auth/login">
                <Button
                  size={"sm"}
                  colorScheme={"teal"}
                  leftIcon={<MdLogin/>}
                  onClick={() => changeDisplay("none")}
                >
                  Login
                </Button>
              </Link>

              <Link href="/auth/register">
                <Button
                  size={"sm"}
                  colorScheme={"teal"}
                  marginLeft={"2"}
                  leftIcon={<FaUserPlus/>}
                  onClick={() => changeDisplay("none")}
                >
                  Register
                </Button>
              </Link>
            </>)
          }
        </Flex>
      </Flex>
    </>
  )
}

export default Navbar