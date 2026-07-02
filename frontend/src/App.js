import AppRoutes from "./AppRoutes";
import Header from "./components/Header/Header";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
