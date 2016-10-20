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
        return this.auth.$onAuthStateChanged(callback);
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

    createUser(options) {
        const { email, password, name, photoURL } = options;
        return this.auth.$createUserWithEmailAndPassword(email, password)
            .then((user) => {
                // user.sendEmailVerification()
                //     .then(() => {
                //         debugger;
                //     })
                //     .cath(() => {
                //         debugger;
                //     })

                return user.updateProfile({
                    displayName: name,
                    photoURL
                });
            });
    }
};
