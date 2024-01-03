import { BrowserRouter as Routers,Routes,Route,Link} from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Home from "./Home";
import Cart from "./Cart";
import ShopData from "./Home";

function App(){
  return(
    <div>
      <Routers>
        <Routes>
          <Route path="/" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<ShopData/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </Routers>
    </div>
  )
}
export default App;
