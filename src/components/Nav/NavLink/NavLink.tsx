import React from "react";
import { Link } from "react-router";

interface IProps {
    to: string;
    content: string;
};

const NavLink: React.FC<IProps> = (props) => {
    const { to, content } = props;
        
    return (
        <li className="relative after:content-[''] after:w-0 after:h-[1px] 
        after:bg-white after:absolute after:bottom-[-5px] after:left-0 
        after:transition-all after:duration-1000 after:hover:w-[100%]">
            <Link to={to}>{content}</Link>
        </li>
    )
}
export default NavLink