import "tailwindcss/tailwind.css";
import Header from "./components/Header/Header";
import MyNote from "./components/MyNote/MyNote";
import EmptyNote from "./components/EmptyNote/EmptyNote";
function App() {
  return (
    <div>
      <Header />
      <MyNote />
    </div>
  );
}

export default App;
