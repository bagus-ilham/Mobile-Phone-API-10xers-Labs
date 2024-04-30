async function errorHandler(err, req, res, next) {
  console.log(err);
  switch (err) {
    case "Invalid token":
    case "Unauthorized":
    case "Username, email, password or phone number required":
    case "Email already registered":
    case "Email or password required":
    case "Invalid email or password":
    case "Data not found":
    case "All field canot be empty":
      res.status(err.status).json({ message: err.name });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      break;

    default:
      res.status(500).json({ message: "Internal server Error" });
      break;
  }
}

module.exports = errorHandler;
