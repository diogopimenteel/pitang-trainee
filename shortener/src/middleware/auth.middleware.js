import jsonwebtoken from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const AuthMiddleware = (request, response, next) => {
  const { authorization } = request.headers;

  if (request.url === "/api/login" || (request.url === "/api/user" && request.method === "POST")) {
    return next();
  }

  if (!authorization) {
    return response.status(401).json({ message: "Authorization not found" });
  }

  const [, token] = authorization.split(" ");

  try {
    request.loggedUser = jsonwebtoken.verify(token, JWT_SECRET);
  } catch (error) {
    return response.status(401).json({ message: "Invalid token!" });
  }

  next();
};
