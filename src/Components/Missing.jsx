import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className="missing">
      <h2>Error 404 </h2>
      <p>Page Not Found!</p>
      <br />
      <p>
        <Link to="/">Go to homepage</Link>
      </p>
    </main>
  )
}

export default Missing;