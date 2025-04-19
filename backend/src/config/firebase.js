import admin from 'firebase-admin';
import path from 'path';

// Initialize Firebase Admin SDK only if it hasn't been initialized yet
let firebaseAdmin;

if (!admin.apps.length) {
    const serviceAccount = path.resolve('firebase-service-account.json');
    firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    firebaseAdmin = admin.app();
}

export default firebaseAdmin; 