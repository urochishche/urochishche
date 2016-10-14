export default class LoginController {
    constructor($scope, $state, AuthService) {
        'ngInject';

        this.$scope = $scope;
        this.$state = $state;
        this.AuthService = AuthService;

        this.auth = {
            email: 'urochishche@gmail.com',
            password: '123456'
        };
    }

    submit() {
        const { email, password } = this.auth;
        this._startProgress();
        this.AuthService.signInWithEmailAndPassword(email, password)
            .then(() => {
                this._gotoUserState();
            })
            .catch(error => {
                this._stopProgress();
                throw Error(error);
            });
    }

    isHasError(attrName) {
        const item = this.$scope.auth[attrName];
        return item.$invalid && item.$dirty && item.$touched;
    }

    _startProgress() {
        this.progress = true;
    }

    _stopProgress() {
        this.progress = false;
    }

    _gotoUserState() {
        this.$state.go('user');
    }
};
