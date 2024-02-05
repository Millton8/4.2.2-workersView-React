import { NavLink } from "react-router-dom";
import '../Styles/navigation.css'
export default function Nav(){
    return(

    <div className="navigation">
            <NavLink className="navitabs" to="/status">Status</NavLink>  
            <NavLink className="navitabs" to="/general">Общий отчет</NavLink>  
            <NavLink className="navitabs" to="/workerslist">Работники</NavLink>
        </div>
)}