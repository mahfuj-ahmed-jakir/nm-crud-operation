import { Routes, Route } from "react-router-dom";
import ActivityDetails from "./pages/ActivityDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostActivity from "./pages/PostActivity";
import Registration from "./pages/Registration";
import TestList from "./pages/TestList";
import TodayClass from "./pages/TodayClass";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todayclass" element={<TodayClass />} />
        <Route path="/postactivity" element={<PostActivity />} />
        <Route path="/activitylist" element={<ActivityDetails />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/testlist" element={<TestList />} />
      </Routes>
    </>
  );
}

export default App;
