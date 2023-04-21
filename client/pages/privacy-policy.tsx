import { Container, Heading, ListIcon, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { useEffect } from 'react'
import ReactGA from 'react-ga4';
import Head from 'next/head';
import { RxArrowRight } from 'react-icons/rx';

const PrivacyPolicy = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: document.title })
  }, []);

  return (
    <>
    <Head>
      <title>Privacy Policy - CollegeNotes</title>
      <meta name='description' content='Privacy policy of the CollegeNotes platform, all about your data and how it is processed by us.'/>

      <meta property='og:title' content='Privacy Policy - CollegeNotes' key={"og-title"} />
      <meta property='og:description' content='Privacy policy of the CollegeNotes platform, all about your data and how it is processed by us.' key={"og-description"} />

      <meta content='Privacy Policy - CollegeNotes' name='twitter:title' key={"twitter-title"} />
      <meta content='Privacy policy of the CollegeNotes platform, all about your data and how it is processed by us.' name='twitter:description' key={"twitter-description"} />
    </Head>

    <Container minH={"95vh"} maxW={"container.md"} paddingBottom={"8"} paddingTop={["3", "5"]} fontFamily={"Inter"} textAlign={"justify"}>
      <Heading
        as={"h1"}
        marginY={"8"}
        size={"2xl"}
        fontWeight={"extrabold"}
        fontFamily={"Inter"}
        children={"Privacy Policy"}
        textAlign={"center"}
      />

      <Text marginBottom={"4"}>
        At CollegeNotes, accessible from <Link color={"teal.500"} href="/">https://www.collegenotes.co.in</Link>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CollegeNotes and how we use it.
      </Text>

      <Text marginBottom={"4"}>
        If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
      </Text>

      <Text marginBottom={"4"}>
        This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in CollegeNotes. This policy is not applicable to any information collected offline or via channels other than this website.
      </Text>
      
      <Heading
        as={"h2"}
        fontFamily={"Inter"}
        fontSize={"2xl"}
        marginTop={["7", "9"]}
        marginBottom={"3"}
      >
        The Information We Collect
      </Heading>

      <Text marginBottom={"4"}>
        The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
      </Text>

      <Text marginBottom={"4"}>
        If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
      </Text>

      <Text marginBottom={"4"}>
        When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
      </Text>
      
      <Heading
        as={"h2"}
        fontFamily={"Inter"}
        fontSize={"2xl"}
        marginTop={["7", "9"]}
        marginBottom={"3"}
      >
        How We Use Your Information
      </Heading>

      <Text marginBottom={"4"}>
        We use the information we collect in various ways, including to:
      </Text>

      <UnorderedList listStylePos={"inside"} margin={"0"} listStyleType={"none"} spacing={"1"}>
        <ListItem>
          <ListIcon as={RxArrowRight} />
          Provide, operate, and maintain our website
        </ListItem>
        
        <ListItem>
          <ListIcon as={RxArrowRight} />
          Improve, personalize, and expand our website
        </ListItem>
        
        <ListItem>
          <ListIcon as={RxArrowRight} />
          Understand and analyze how you use our website
        </ListItem>

        <ListItem>
          <ListIcon as={RxArrowRight} />
          Develop new products, services, features, and functionality
        </ListItem>

        <ListItem>
          <ListIcon as={RxArrowRight} />
          Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes
        </ListItem>
        
        <ListItem>
          <ListIcon as={RxArrowRight} />
          Find and prevent fraud
        </ListItem>
      </UnorderedList>

      <Heading
        as={"h2"}
        fontFamily={"Inter"}
        fontSize={"2xl"}
        marginTop={["7", "9"]}
        marginBottom={"3"}
      >
        Log Files
      </Heading>

      <Text marginBottom={"4"}>
        CollegeNotes follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
      </Text>

      <Heading
        as={"h2"}
        fontFamily={"Inter"}
        fontSize={"2xl"}
        marginTop={["7", "9"]}
        marginBottom={"3"}
      >
        Cookies and Web Beacons
      </Heading>

      <Text marginBottom={"4"}>
        Like any other website, CollegeNotes uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
      </Text>

      <Heading
        as={"h2"}
        fontFamily={"Inter"}
        fontSize={"2xl"}
        marginTop={["7", "9"]}
        marginBottom={"3"}
      >
        Google DoubleClick DART Cookie
      </Heading>

      <Text marginBottom={"4"}>
        Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <Link color={"teal.500"} href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</Link>
      </Text>

      <Heading
        as={"h2"}
        fontFamily={"Inter"}
        fontSize={"2xl"}
        marginTop={["7", "9"]}
        marginBottom={"3"}
      >
        Advertising Partners' Privacy Policies
      </Heading>

      <Text marginBottom={"4"}>
        You may consult this list to find the Privacy Policy for each of the advertising partners of CollegeNotes.
      </Text>

      <Text marginBottom={"4"}>
        Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on CollegeNotes, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
      </Text>

      <Text marginBottom={"4"}>
        Note that CollegeNotes has no access to or control over these cookies that are used by third-party advertisers.
      </Text>

      <Heading
        as={"h2"}
        fontFamily={"Inter"}
        fontSize={"2xl"}
        marginTop={["7", "9"]}
        marginBottom={"3"}
      >
        Children's Information
      </Heading>

      <Text marginBottom={"4"}>
        Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
      </Text>

      <Text marginBottom={"4"}>
        CollegeNotes does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
      </Text>

      <Heading
        as={"h2"}
        fontFamily={"Inter"}
        fontSize={"2xl"}
        marginTop={["7", "9"]}
        marginBottom={"3"}
      >
        Consent
      </Heading>

      <Text marginBottom={"4"}>
        By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
      </Text>
    </Container>
    </>
  )
}

export default PrivacyPolicy