import { Heading, HStack, Stack, Text, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react';
import styles from "../../styles/Footer.module.css";
import { RiLinkedinFill, RiInstagramLine, RiGithubFill } from "react-icons/ri";
import Link from 'next/link';

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
                <Link href={"/about"} className={styles.footerLinks}>About Us</Link>
                <Link href={"/privacy-policy"} className={styles.footerLinks}>Privacy Policy</Link>
              </VStack>

              <VStack paddingTop={"3"} alignItems={"flex-start"} width={["50%", "unset"]}>
                <Link href={"/terms-and-conditions"} className={styles.footerLinks}>T&Cs</Link>
                <Link href={"/contact"} className={styles.footerLinks}>Contact Us</Link>
                <Link href={"/donate"} className={styles.footerLinks}>Donate</Link>
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
              <a href={"https://www.linkedin.com/in/swapnilsachan03/"} target={"_blank"} rel="noreferrer" className={socialTheme}><RiLinkedinFill/></a>
              <a href={"https://www.github.com/swapnil-sachan/"} target={"_blank"} rel="noreferrer" className={socialTheme}><RiGithubFill/></a>
              <a href={"https://www.instagram.com/swapnilsachan03/"} target={"_blank"} rel="noreferrer" className={socialTheme}><RiInstagramLine/></a>
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