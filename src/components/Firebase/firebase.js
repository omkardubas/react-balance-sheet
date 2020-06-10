import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAmoYfKWp6GRhmnzV86P8j9BEzn6h5Zp1M",
    authDomain: "balance-sheet-1274f.firebaseapp.com",
    databaseURL: "https://balance-sheet-1274f.firebaseio.com",
    projectId: "balance-sheet-1274f",
    storageBucket: "balance-sheet-1274f.appspot.com",
    messagingSenderId: "167311436636",
    appId: "1:167311436636:web:19210273b18871e2482f99",
    measurementId: "G-Q9SHFW28TL"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);


    doSignOut = () => this.auth.signOut();
    // doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    // doPasswordUpdate = password =>
    //     this.auth.currentUser.updatePassword(password);
}

export default Firebase;