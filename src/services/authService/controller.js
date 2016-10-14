import firebase from 'firebase';

export default class AuthServiceController {
    constructor($firebaseAuth) {
        'ngInject';

        this.auth = $firebaseAuth(firebase.auth());
    }

    waitForSignIn() {
        return this.auth.$waitForSignIn();
    }

    requireSignIn() {
        return this.auth.$requireSignIn();
    }

    getAuth() {
        return this.auth.$getAuth();
    }

    onAuthStateChanged(callback) {
        this.auth.$onAuthStateChanged(callback);
    }

    signInWithEmailAndPassword(email, password) {
        return this.auth.$signInWithEmailAndPassword(email, password)
            .then(firebaseUser => {
                console.log({firebaseUser});
            });
    }

    signOut() {
        this.auth.$signOut();
    }
};
