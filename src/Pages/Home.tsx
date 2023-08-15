import { useFirebaseAuth } from "../firebase/FirebaseAuth";
import CalculationHistory from "./CalculationHistory";

const Home = () => {
  const { user, loginWithGoogle } = useFirebaseAuth();
  return (
    <div className="min-h-screen text-center mt-20">
      <h1 className="text-3xl font-semibold mb-5">
        Welcome to the Calculator App
      </h1>
      {user ? (
        <CalculationHistory />
      ) : (
        <button onClick={loginWithGoogle} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Home;
