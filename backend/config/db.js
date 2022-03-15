const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../service-account-key.json');

initializeApp({
    credential: cert(serviceAccount)
  });

module.exports = db = getFirestore();