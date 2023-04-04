import { Box, Flex, Heading, HStack, useColorMode, Stack, Text } from '@chakra-ui/react'
import ReactGA from 'react-ga4';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import AdminNav from '../../components/AdminNav'
import { LineChart } from '../../components/AdminChart'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getDashboardStats } from '../../redux/actions/admin'
import Loader from '../../components/Layout/Loader'
import ProtectedRoute from '@/others/ProtectedRoute';
import Head from 'next/head';

const Dashboard = ({ isAdmin }: any) => {
  document.title = "CollegeNotes Admin Dashboard";
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: document.title + window.location.pathname });
  }, []);

  const { colorMode } = useColorMode();
  const cardBorderColor = colorMode === 'light' ? "#9DECF9" : "#086F83";
  const cardBgColor = colorMode === 'light' ? "#F7FAFC" : "#171923";

  const dispatch = useDispatch();
  const { loading, stats, usersCount, viewsCount, usersChange, viewsChange, usersProfit, viewsProfit } = useSelector((state: any) => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats() as any);
  }, [dispatch]);

  const DataCard = ({title, quantity, quantityPercent, profit}: any) => {
    return (
      <Box
        width={["15em", "10em", "15em"]}
        border={`2px solid ${cardBorderColor}`}
        padding={"5"}
        fontFamily={"Roboto"}
        backgroundColor={cardBgColor}
        borderRadius={"xl"}
      >
        <Text children={title} />

        <HStack>
          <Text fontSize={"xl"} fontWeight={"bold"} children={quantity} />

          <HStack>
            <Text children={`${quantityPercent}%`} />
            { profit ?
              <RiArrowUpLine color='green' /> :
              <RiArrowDownLine color='red' />
            }
          </HStack>
        </HStack>

        <Text children={"Since last month"} fontSize={"sm"} opacity={0.7} />
      </Box>
    );
  }

  return (
    <>
    <Head>
      <title>CollegeNotes Admin Dashboard</title>
      <meta name='description' content='Admin only dashboard route for CollegeNotes.'/>

      <meta property='og:title' content='CollegeNotes Admin Dashboard'/>
      <meta property='og:description' content='Admin only dashboard route for CollegeNotes.'/>

      <meta content='CollegeNotes Admin Dashboard' name='twitter:title'/>
      <meta content='Admin only dashboard route for CollegeNotes.' name='twitter:description'/>
    </Head>
    
    <AdminNav />

    { loading || !stats ? ( <Loader color={"cyan.400"} /> ) : (
      <Flex
        minH={"100vh"}
        width={"100%"}
        direction={"column"}
        alignItems={"center"}
      >
        <Stack
          direction={"column"}
          height={"100%"}
          marginX={"3"}
          marginY={["8","10","12","12"]}
          width={["100%", "100%", "container.lg"]}
          alignItems={"center"}
        >
          <Text
            textAlign={"center"}
            marginBottom={"6"}
            opacity={0.5}
            fontSize={["14px", "unset"]}
            children={`Last change was on ${new Date(stats[11].createdAt).toDateString()}, ${new Date(stats[11].createdAt).toLocaleTimeString()}`}
          />

          <Heading
            fontFamily={"Poppins"}
            children="Dashboard"
            size={"xl"}
            paddingBottom={"8"}
            textAlign={["center", "left"]}
          />

          <Stack
            direction={["column", "row"]}
            minH="24"
            justifyContent={"space-evenly"}
            gap={["2", "1", "5"]}
            paddingBottom={"4"}
          >
            <DataCard title={"Views"} quantity={viewsCount} quantityPercent={viewsChange} profit={viewsProfit} />
            <DataCard title={"Members"} quantity={usersCount} quantityPercent={usersChange} profit={usersProfit} />
          </Stack>

          <Text
            textAlign={"center"}
            fontStyle={"italic"}
            marginBottom={"6"}
            opacity={0.7}
            fontSize={["14px", "unset"]}
            paddingBottom={["5", "16"]}
            children={`${stats[11].totalSubejcts} subjects and ${stats[11].totalNotes} notes are available.`}
          />

          <Box
            width={"100%"}
            padding={["0", "2"]}
          >
            <Heading
              textAlign={["center", "left"]}
              fontFamily={"Poppins"}
              size={"md"}
              paddingTop={["8", "0"]}
              children="Site Views"
            />

            <LineChart views={stats.map((item: any) => item.views)} />
          </Box>
        </Stack>
      </Flex>
    )}
    </>
  )
}

export default ProtectedRoute(Dashboard, true, true);