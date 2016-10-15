import firebase from 'firebase';

export default class AuthServiceController {
    constructor($firebaseAuth, $firebaseObject) {
        'ngInject';

        this.auth = $firebaseAuth(firebase.auth());
        this.$firebaseObject = $firebaseObject;
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
                return firebaseUser.uid;
            });
    }

    signOut() {
        this.auth.$signOut();
    }
};
