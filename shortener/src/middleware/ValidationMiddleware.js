const validation = (schema) => async (request, response, next) => {
  try {
    await schema.validate(request.body);
    next();
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export default validation;
