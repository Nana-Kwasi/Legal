import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBbzOR6g0a6W38Lv0y-J54Pj2vnVywsqiU",
  authDomain: "legal-aid-293d7.firebaseapp.com",
  projectId: "legal-aid-293d7",
  storageBucket: "legal-aid-293d7.appspot.com",
  messagingSenderId: "253836754013",
  appId: "1:253836754013:web:dc430d0cacae0998a021b4"
};

const app = initializeApp(firebaseConfig);
export default app;