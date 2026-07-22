import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import config from "../../firebase-applet-config.json";

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

let app: any = null;
let auth: any = null;
let db: any = null;

try {
  // Check if we are in a browser environment first and have valid configuration
  if (typeof window !== "undefined" && firebaseConfig.apiKey && firebaseConfig.apiKey !== "remixed-api-key") {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app, config.firestoreDatabaseId || undefined);
  } else {
    console.warn("Firebase is using placeholder configuration or is not loaded in window environment.");
  }
} catch (error) {
  console.error("Firebase failed to initialize during startup:", error);
}

export { auth, db };
