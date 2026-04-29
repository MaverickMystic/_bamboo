import { Outlet } from "react-router"
import Nav from "../components/Nav"
import Footer from "../components/footer"

const Main = () => {
  return (
    <div className="bg-bg">
    <Nav/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Main