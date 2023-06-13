import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import BalanceView from "./view/Balance";
import DepositView from "./view/Deposit";
import MenuView from "./view/Menu";
import PageNotFoundView from "./view/PageNotFound";
import WithdrawView from "./view/Withdraw";
import LoginView from "./view/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/menu" element={<MenuView />} />
            <Route path="/balance-inquiry" element={<BalanceView />} />
            <Route path="/deposit" element={<DepositView />} />
            <Route path="/withdraw" exact element={<WithdrawView />} />
          </Route>
          <Route path="/" element={<LoginView />} exact />
          <Route path="/page-not-found" exact element={<PageNotFoundView />} />
          <Route path="*" element={<PageNotFoundView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
