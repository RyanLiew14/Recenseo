import smallRecenseo from "./Small recenseo.svg";
import { Link } from "react-router-dom";

function RecenseoLogo() {
  return (
    <Link to="/">
      <img className="h-12 w-12 mr-4" src={smallRecenseo}></img>
    </Link>
  );
}
export default RecenseoLogo;
