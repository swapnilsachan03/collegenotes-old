import { Avatar, Flex, Heading, ListIcon, ListItem, Stack, Text, UnorderedList, VStack } from '@chakra-ui/react'
import { RxArrowRight } from 'react-icons/rx'
import { Link } from '@chakra-ui/react'
import { useEffect } from 'react'
import ReactGA from 'react-ga4';
import Head from 'next/head';

const About = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: document.title })
  }, []);

  return (
    <>
    <Head>
      <title>About Us - CollegeNotes</title>
      <meta name='description' content='All about the CollegeNotes platform - the beginning, the journey and the present!'/>

      <meta property='og:title' content='About Us - CollegeNotes' key={"og-title"} />
      <meta property='og:description' content='All about the CollegeNotes platform - the beginning, the journey and the present!' key={"og-description"} />

      <meta content='About Us - CollegeNotes' name='twitter:title' key={"twitter-title"} />
      <meta content='All about the CollegeNotes platform - the beginning, the journey and the present!' name='twitter:description' key={"twitter-description"} />
    </Head>
    
    <Flex
      width={"100%"}
      height={["10em", "12em", "15em"]}
      justifyContent={"center"}
      alignItems={"center"}
      bgImage={"https://images.unsplash.com/photo-1544411047-c491e34a24e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
    >
      <Heading
        size={["2xl", "3xl", "4xl"]}
        fontFamily={"Poppins"}
        color={"white"}
        children={"Made in a college."}
      />
    </Flex>

    <Flex
      width={"100%"}
      direction={"row"}
      justifyContent={"space-around"}
    >
      <Stack
        height={"100%"}
        marginX={"3"}
        marginY={["8","10","12","12","14"]}
        width={["container.md",  "container.md", "container.md", "900px"]}
      >
        <VStack
          gap={"50px"}
          width={"100%"}
          paddingBottom={"8"}
          borderBottom={"1px solid lightgray"}
          marginBottom={["12", "12", "14"]}
        >
          <Flex
            direction={["column", "column", "row"]}
            width={"100%"}
          >
            <Flex
              width={["", "", "25%"]}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              marginBottom={"5"}
            >
              <Heading
                size={"sm"}
                fontFamily={"Roboto"}
                children={"About CollegeNotes"}
                paddingBottom={"2px"}
                borderBottom={"2px solid"}
              />
            </Flex>

            <VStack width={["", "", "75%"]}>
              <Text fontFamily={"Inter"} textAlign={"justify"}>
                CollegeNotes began with a simple idea of sharing the discrete mathematics notes that I was making during the third semester of my college. At that time, I didn't know much about development, so I made a simple HTML and CSS powered
                {" "}<Link href={"https://old.collegenotes.co.in/"} target={"_blank"} color={"teal.500"}>static website</Link> {" "}
                by linking a few webpages, made it live and called it a day. But it was the time when that simple website got immense traffic and positive response that I understood the potential of that idea. I was overwhelmed by the requests for more content that I was getting from my friends and other people. So I decided to make it a full-fledged website and take it on as a full-time side project.<br/><br/>
                
                Three months later, I started working on it and developed it end-to-end. I added a lot of features on the admin as well as the client side (such as dark and light themes, a search bar, an authentication system, features for favoriting subjects and bookmarking notes for users, and interactive subject, notes & user management systems on the admin side). I also tried to make the UI more minimal and user-friendly.<br/><br/>

                Till now, only I have been working on this website, but I am planning to make it a community-driven project and make it a platform for students to share their notes and other study materials. I am also planning to add a lot of features to this website in the future, and maybe roll out mobile apps for better accessibility. <br/><br/>
                
                With all of this being said, any inputs or suggestions are always welcomed through my social media channels.
              </Text>
            </VStack>
          </Flex>
          
          <Flex
            direction={["column", "column", "row"]}
            width={"100%"}
          >
            <Flex
              width={["", "", "25%"]}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              marginBottom={"5"}
            >
              <Heading
                size={"sm"}
                fontFamily={"Roboto"}
                children={"Tech Stack"}
                paddingBottom={"2px"}
                borderBottom={"2px solid"}
              />
            </Flex>

            <VStack width={["", "", "75%"]}>
              <Text fontFamily={"Inter"} textAlign={"justify"}>
                When I started out with the development of this website, I planned on using NextJS and Tailwind CSS for the frontend and NodeJS for the backend. But I didn't know much about these technologies at that time, so as I started moving forward, I realized that I was making a lot of mistakes and the code was getting very messy. Owing to that, I made changes to the frameworks and libraries that I was going to use and settled with this tech stack: <br/><br/>

                <UnorderedList listStyleType={"none"} spacing={"1"} marginInlineStart={"0"}>
                  <ListItem>
                    <ListIcon as={RxArrowRight} />
                    ReactJS, React Router for frontend development
                  </ListItem>
                  
                  <ListItem>
                    <ListIcon as={RxArrowRight} />
                    Chakra UI for styling
                  </ListItem>
                  
                  <ListItem>
                    <ListIcon as={RxArrowRight} />
                    ExpressJS with NodeJS for backend development
                  </ListItem>
                  
                  <ListItem>
                    <ListIcon as={RxArrowRight} />
                    MongoDB with Mongoose for database management
                  </ListItem>
                  
                  <ListItem>
                    <ListIcon as={RxArrowRight} />
                    Various JS libraries such as React Quill, JWT, Bcrypt, Sharp etc.
                  </ListItem>
                </UnorderedList>
              </Text>
            </VStack>
          </Flex>
        </VStack>
        
        <Flex
          width={"100%"}
          direction={["column-reverse", "column-reverse", "row"]}
        >
          <VStack alignItems={"flex-start"} width={["", "", "70%"]}>
            <Heading
              size={"sm"}
              fontFamily={"Roboto"}
              children={"Message from the founder"}
              paddingBottom={"2px"}
              borderBottom={"2px solid"}
            />

            <VStack
              width={["", "", "30%"]}
              display={["flex", "flex", "none"]}
              alignSelf={"center"}
              paddingTop={"4"}
              fontSize={"sm"}
              textColor={"gray.500"}
              fontFamily={"Inter"}
            >
              <Avatar
                src="/images/founder.jpg"
                size={"2xl"}
                name={"Swapnil Sachan"}
              />

            <p style={{marginTop: "15px"}}>Swapnil Sachan</p>
            <p style={{marginTop: "1px"}}>Creator of CollegeNotes</p>
          </VStack>

            <Text fontFamily={"Inter"} textAlign={"justify"} paddingTop={"3"}>
              The development of this website has required a lot of efforts and has costed me a whole two months. The constant maintenance efforts are even more tough to carry on with. If you are getting benefitted by this platform in some way and want to support me and this website, you can do so by donating to me through the
              {" "}<Link href={"/donate"} color={"teal.500"}>donations page</Link> {" "}
              of this website only. Any amount of donation is appreciated and will be used to maintain this website and to add more features to it. Thank you for your support!
            </Text>
          </VStack>
          
          <VStack
            width={["", "", "30%"]}
            display={["none", "none", "flex"]}
            alignItems={"center"}
            justifyContent={"center"}
            fontSize={"sm"}
            textColor={"gray.500"}
            fontFamily={"Inter"}
          >
            <Avatar
              src="/images/founder.jpg"
              size={"2xl"}
              name={"Swapnil Sachan"}
            />

            <p style={{marginTop: "15px"}}>Swapnil Sachan</p>
            <p style={{marginTop: "1px"}}>Creator of CollegeNotes</p>
          </VStack>
        </Flex>

        <VStack fontFamily={"Inter"} paddingTop={["9", "14"]} fontSize={"13px"}>
          <p>Made with ❤️ in TypeScript</p>
          <p style={{marginTop: "2px"}}>Hosted on Vercel, stored on Amazon S3</p>
        </VStack>
      </Stack>
    </Flex>
    </>
  )
}

export default About