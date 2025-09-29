function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(value) {
  if (typeof value !== 'string') return false;
  return /.+@.+\..+/.test(value);
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function toIntegerIfNumeric(value) {
  if (typeof value === 'string' && /^\d+$/.test(value.trim())) {
    return parseInt(value, 10);
  }
  return value;
}

export function validateStudentCreate(req, res, next) {
  const { name, email } = req.body ?? {};
  const age = toIntegerIfNumeric((req.body ?? {}).age);
  const errors = [];
  if (!isNonEmptyString(name)) errors.push('name must be a non-empty string');
  if (!isValidEmail(email)) errors.push('email must be valid');
  if (!isPositiveInteger(age)) errors.push('age must be a positive integer');
  req.body.age = age;
  if (errors.length) return res.status(400).json({ errors });
  next();
}

export function validateStudentUpdate(req, res, next) {
  const { name, email } = req.body ?? {};
  const age = toIntegerIfNumeric((req.body ?? {}).age);
  const errors = [];
  if (name !== undefined && !isNonEmptyString(name)) errors.push('name must be a non-empty string');
  if (email !== undefined && !isValidEmail(email)) errors.push('email must be valid');
  if (age !== undefined && !isPositiveInteger(age)) errors.push('age must be a positive integer');
  if (age !== undefined) req.body.age = age;
  if (errors.length) return res.status(400).json({ errors });
  next();
}


