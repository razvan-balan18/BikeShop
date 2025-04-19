import admin from 'firebase-admin';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('No token provided');

  const token = authHeader.split(' ')[1]; // Bearer <token>
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Add user details to the request
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).send('Unauthorized');
  }
};

export default verifyToken; 