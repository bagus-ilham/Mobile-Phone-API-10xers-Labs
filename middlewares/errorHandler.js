async function errorHandler(err, req, res, next) {
  console.log(err);
  switch (err) {
    case "Invalid token":
    case "Unauthorized":
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
