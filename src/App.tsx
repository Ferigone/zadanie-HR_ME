import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Calculator from "./Pages/Calculator";
import Nav from "./Components/Nav";
import "./firebase/firebaseConfig";
import EveryonesCalculations from "./Pages/EveryonesCalculations";
import { useFirebaseAuth } from "./firebase/FirebaseAuth";

const App = () => {
  const { user} = useFirebaseAuth();
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        {
          user && <Route path="/calculator" element={<Calculator />} />
        }
        <Route path="/calculations" element={<EveryonesCalculations />} />
        <Route path="*">"404 Not Found</Route>
      </Routes>
    </Router>
  );
}

export default App;
