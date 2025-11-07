const clientList = [
  "Arjun Reddy",
  "Pooja Sharma",
  "Sai Krishna",
  "Anjali Devi",
  "Vijay Kumar",
  "Divya Rao",
];

const orderList = [
  "ORD-YB-001",
  "ORD-YB-002",
  "ORD-YI-001",
  "ORD-YI-002",
  "ORD-YA-001",
  "ORD-YA-002",
];

const courseList = [
  { name: "Yoga Beginner", instructor: "Priya Sharma" },
  { name: "Yoga Intermediate", instructor: "Rahul Singh" },
  { name: "Yoga Advanced", instructor: "Deepa Menon" },
];

const Info = () => {
  return (
    <div className="flex flex-col flex-1 bg-[#141414] p-6 shadow-md overflow-y-auto text-[#E1E1E1] custom-scrollbar">
      {/* ==== Courses Section ==== */}
      <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg mb-8 border border-[#343540]">
        <h3 className="text-2xl font-semibold text-[#FFFFFF] mb-4 border-b border-[#343540] pb-2">
          Courses
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseList.map((course, index) => (
            <div
              key={index}
              className="bg-[#3C3C50] p-4 rounded-md border border-[#343540]"
            >
              <p className="text-lg font-bold text-[#10A37F]">{course.name}</p>
              <p className="text-sm text-[#E1E1E1]">
                Instructor: {course.instructor}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[#E1E1E1] text-sm italic mt-4 text-center opacity-80">
          You can query for more <strong>course details</strong> (description,
          duration, dates, status, etc.) and <strong>class details</strong>{" "}
          (date, start time, end time, location, status of the class) using the
          chatbox or a dedicated search feature.
        </p>
      </div>

      {/* ==== Clients Section ==== */}
      <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg mb-8 border border-[#343540]">
        <h3 className="text-2xl font-semibold text-[#FFFFFF] mb-4 border-b border-[#343540] pb-2">
          Clients
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientList.map((client, index) => (
            <div
              key={index}
              className="bg-[#3C3C50] p-4 rounded-md border border-[#343540]"
            >
              <p className="text-lg font-bold text-[#10A37F]">{client}</p>
            </div>
          ))}
        </div>

        <p className="text-[#E1E1E1] text-sm italic mt-4 text-center opacity-80">
          You can query for <strong>client details</strong> such as their
          activeness status, date of birth, and course details.
        </p>
      </div>

      {/* ==== Orders Section ==== */}
      <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg mb-8 border border-[#343540]">
        <h3 className="text-2xl font-semibold text-[#FFFFFF] mb-4 border-b border-[#343540] pb-2">
          Client Orders
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderList.map((order, index) => (
            <div
              key={index}
              className="bg-[#3C3C50] p-4 rounded-md border border-[#343540]"
            >
              <p className="text-lg font-bold text-[#10A37F]">{order}</p>
            </div>
          ))}
        </div>

        <p className="text-[#E1E1E1] text-sm italic mt-4 text-center opacity-80">
          You can query for <strong>order details</strong> including the amount,
          associated client details, course name,{" "}
          <strong>payment status</strong>, and <strong>payment method</strong>.
        </p>
      </div>

      {/* ==== Admin Dashboard Section ==== */}
      <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg border border-[#343540]">
        <h3 className="text-2xl font-semibold text-[#FFFFFF] mb-4 border-b border-[#343540] pb-2">
          Admin Dashboard Capabilities
        </h3>
        <p className="text-[#E1E1E1] leading-relaxed text-center opacity-90">
          As an admin, you can query for comprehensive insights including{" "}
          <strong>revenue metrics</strong> (total revenue, outstanding
          payments), <strong>client insights</strong> (active vs inactive
          counts, birthday reminders, new clients this month),{" "}
          <strong>service analytics</strong> (enrollment trends, top services,
          course completion rates), and <strong>attendance reports</strong>{" "}
          (attendance percentage by class, drop-off rates). Utilize the chatbox
          or search features to access these detailed reports and analytics.
        </p>
      </div>
    </div>
  );
};

export default Info;
