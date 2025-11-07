import ChatBox from "../components/ChatBox";
import Info from "../components/Info";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col pt-20 h-screen md:flex-row bg-[#141414]">
        <Info />
        <ChatBox />
      </div>
    </>
  );
};

export default Dashboard;
