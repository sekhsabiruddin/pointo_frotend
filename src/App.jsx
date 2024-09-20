import "tailwindcss/tailwind.css";
import Header from "./components/Header/Header";
import MyNote from "./components/MyNote/MyNote";
import { useSelector } from "react-redux";
import SkeletonLoader from "./components/Skeleton/SkeletonLoader";

function App() {
  return (
    <div>
      <>
        <Header />
        <MyNote />
      </>
    </div>
  );
}

export default App;
