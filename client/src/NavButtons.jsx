import { Link } from "react-router-dom";

function NavButtons() {
    return(
        <div>
          <div className="m-auto text-2xl ml-10 hover:bg-neutral-200 h-10 leading-10 rounded-lg">
            <Link to="/" className="p-5">Home</Link>
          </div>
          <div className="m-auto text-2xl ml-10 hover:bg-neutral-200 h-10 leading-10 rounded-lg">
            <Link to="/browse" className="p-5">Browse</Link>
          </div>
        </div>
    );
}

export default NavButtons;