import { Link } from "react-router-dom";

function NavButtons() {
    return(
        <div className="flex flex-row">
          <div className="flex-col m-auto text-xl ml-5 hover:bg-red-500 h-10 leading-10 rounded-lg">
            <Link to="/" className="p-5">Home</Link>
          </div>
          <div className="flex-col m-auto text-xl ml-5 hover:bg-red-500 h-10 leading-10 rounded-lg">
            <Link to="/browse" className="p-5">Browse</Link>
          </div>
        </div>
    );
}

export default NavButtons;