import { Outlet } from "react-router";
import PublicLayout from "./components/layout/PublicLayout";

function App() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}
export default App;
