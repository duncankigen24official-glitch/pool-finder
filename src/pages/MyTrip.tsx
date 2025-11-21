import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PoolCard from "@/components/my-trip/PoolCard";
import RequestCard from "@/components/my-trip/RequestCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyTrip = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("my-pool");

  // Mock data for My Pool
  const myPools = [
    {
      driver: {
        name: "Hawkins",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hawkins",
        verified: true,
      },
      date: "Today",
      time: "10:30 pm",
      source: "6391 Elgin St. Celina,",
      destination: "2464 Royal Ln. Mesa,",
    },
    {
      driver: {
        name: "Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wilson",
        verified: true,
      },
      date: "22 June",
      time: "10:30 pm",
      source: "6391 Elgin St. Celina,",
      destination: "2464 Royal Ln. Mesa,",
    },
    {
      driver: {
        name: "Elenora",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elenora",
        verified: true,
      },
      date: "23 june",
      time: "10:30 pm",
      source: "6391 Elgin St. Celina,",
      destination: "2464 Royal Ln. Mesa,",
    },
    {
      driver: {
        name: "Jacob",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob",
        verified: true,
      },
      date: "24 june",
      time: "10:30 pm",
      source: "6391 Elgin St. Celina,",
      destination: "2464 Royal Ln. Mesa,",
    },
    {
      driver: {
        name: "Jenny",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny",
        verified: true,
      },
      date: "25 June",
      time: "10:30 pm",
      source: "6391 Elgin St. Celina,",
      destination: "2464 Royal Ln. Mesa,",
    },
    {
      driver: {
        name: "Sojit",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sojit",
        verified: true,
      },
      date: "26 june",
      time: "10:30 pm",
      source: "6391 Elgin St. Celina,",
      destination: "2464 Royal Ln. Mesa,",
    },
  ];

  // Mock data for Request for Pool
  const requests = [
    {
      riders: [
        { name: "Jenny", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny1" },
        { name: "Mike", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike1" },
        { name: "Sarah", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah1" },
        { name: "Tom", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom1" },
      ],
      date: "Today",
      time: "10:30 pm",
      source: "6391 Elgin St. Celina,",
      destination: "2464 Royal Ln. Mesa,",
      requestCount: 2,
    },
    {
      riders: [
        { name: "Alex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex2" },
        { name: "Chris", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris2" },
        { name: "User3", avatar: "" },
        { name: "User4", avatar: "" },
      ],
      date: "22 june",
      time: "10:30 pm",
      source: "6391 Elgin St. Celina,",
      destination: "2464 Royal Ln. Mesa,",
      requestCount: 4,
    },
    {
      riders: [
        { name: "Emma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma3" },
        { name: "Oliver", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver3" },
        { name: "Sophia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia3" },
        { name: "User4", avatar: "" },
      ],
      date: "23 june",
      time: "10:30 pm",
      source: "6391 Elgin St. Celina,",
      destination: "2464 Royal Ln. Mesa,",
      requestCount: 4,
    },
    {
      riders: [
        { name: "Liam", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam4" },
        { name: "User2", avatar: "" },
        { name: "User3", avatar: "" },
        { name: "User4", avatar: "" },
      ],
      date: "24 june",
      time: "10:30 pm",
      source: "6391 Elgin St. Celina,",
      destination: "2464 Royal Ln. Mesa,",
      requestCount: 4,
    },
  ];

  return (
    <PageLayout>
      <div className="px-4 py-6">
        {/* Header */}
        <h1 className="text-center text-primary font-bold text-xl mb-6 uppercase tracking-wide">
          MY TRIP
        </h1>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-transparent gap-4">
            <TabsTrigger
              value="my-pool"
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 text-muted-foreground"
            >
              My pool
            </TabsTrigger>
            <TabsTrigger
              value="request-for-pool"
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 text-muted-foreground"
            >
              Request for pool
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-pool" className="mt-0">
            {myPools.map((pool, index) => (
              <PoolCard
                key={index}
                driver={pool.driver}
                date={pool.date}
                time={pool.time}
                source={pool.source}
                destination={pool.destination}
                buttonText="Pool info"
                onButtonClick={() => navigate(`/find-pool/rider/${index + 1}`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="request-for-pool" className="mt-0">
            {requests.map((request, index) => (
              <RequestCard
                key={index}
                riders={request.riders}
                date={request.date}
                time={request.time}
                source={request.source}
                destination={request.destination}
                requestCount={request.requestCount}
                onRequestsClick={() => navigate("/my-trip/requests")}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default MyTrip;
