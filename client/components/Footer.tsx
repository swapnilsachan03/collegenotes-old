import { Heading, HStack, Stack, Text, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import styles from "styles/Footer.module.css"
import { RiLinkedinFill, RiInstagramLine, RiGithubFill } from "react-icons/ri";

const Footer = () => {
  const { colorMode } = useColorMode();
  const socialTheme = colorMode === 'light' ? styles.footerSocial : styles.footerSocialDark;

  const currYear = (new Date()).getFullYear();

  return (
    <footer className={styles.footer}>
      <VStack
        margin={"30px 0 20px 0"}
        width={["95%", "90%", "90%", "75%", "70%"]}
      >
        <HStack
          width={"100%"}
          alignItems={"flex-start"}
        >
          <Link href={"/"}>
            <Heading size={"lg"} fontFamily={"Roboto Condensed"} children={"CollegeNotes"} />
          </Link>
        </HStack>

        <Stack
          paddingTop={["5", "7"]}
          paddingBottom={"5"}
          direction={["column", "row"]}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Stack>
            <Heading 
              fontFamily={"Inter"}
              size={"sm"}
              color={`${useColorModeValue("darkslategray", "lightgray")}`}
              children={"Quick Links"}
            />

            <HStack gap={["0", "10"]}>
              <VStack paddingTop={"3"} alignItems={"flex-start"} width={["50%", "unset"]}>
                <Link href={"/contribute"} className={styles.footerLinks}>Contribute</Link>
                <Link href={"/subjects"} className={styles.footerLinks}>All Subjects</Link>
                <Link href={"/about"} className={styles.footerLinks}>About Us</Link>
              </VStack>

              <VStack paddingTop={"3"} alignItems={"flex-start"} width={["50%", "unset"]}>
                <Link href={"/donate"} className={styles.footerLinks}>Donate</Link>
                <Link href={"/"} className={styles.footerLinks}>Tweet This!</Link>
                <Link href={"https://old.collegenotes.co.in/"} className={styles.footerLinks}>Old Site</Link>
              </VStack>
            </HStack>
          </Stack>

          <Stack
            alignItems={["center", "flex-end"]}
            paddingTop={["20px", "0"]}
          >
            <Heading 
              fontFamily={"Inter"}
              size={"sm"}
              color={`${useColorModeValue("darkslategray", "lightgray")}`}
              children={"Let's Connect"}
            />

            <HStack paddingTop={["1.5", "3"]}>
              <Link href={"https://www.instagram.com/swapnilsachan03/"} target={"_blank"} className={socialTheme}><RiInstagramLine/></Link>
              <Link href={"https://www.linkedin.com/in/swapnilsachan03/"} target={"_blank"} className={socialTheme}><RiLinkedinFill/></Link>
              <Link href={"https://www.github.com/swapnil-sachan/"} target={"_blank"} className={socialTheme}><RiGithubFill/></Link>
            </HStack>
          </Stack>
        </Stack>

        <HStack
          borderTop={`1px solid ${useColorModeValue("lightgray", "gray")}`}
          width={"100%"}
          justifyContent={"center"}
        >
          <Text
            color={`${useColorModeValue("gray", "lightgray")}`}
            fontSize={"sm"}
            fontFamily={"Inter"}
            fontWeight={"normal"}
            marginTop={"16px"}
            children={`© ${currYear} Swapnil Sachan`} />
        </HStack>
      </VStack>
    </footer>
  )
}

export default Footer