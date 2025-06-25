import ChatBox from "../components/ChatBox";
import Info from "../components/Info";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex pt-12 h-screen">
        <Info />
        <ChatBox />
      </div>
    </>
  );
};

export default Dashboard;