export default class RemoveUserController {
    constructor($scope, $state, AuthService, RatingService) {
        'ngInject';

        this.auth = {};

        this.$scope = $scope;
        this.$state = $state;

        this.AuthService = AuthService;
        this.RatingService = RatingService;
    }

    submit() {
        const { password } = this.auth;
        const { email, uid } = this.AuthService.getAuth();
        this.RatingService.removeUser(uid)
            .then(() => {
                return this.AuthService.removeUser({
                    email,
                    password
                });
            })
            .then(() => {
                this._gotoHomeState();
            })
            .catch(error => {
                this._stopProgress();
                this._onError(error);
            });
    }

    _onError(error) {
        let result;
        switch (error.code) {
            case 'auth/wrong-password': {
                result = 'Неверный пароль';
                break;
            }
            default: {
                throw Error(error);
            }
        }
        this.errorMessage = result;
    }

    hideErrorMessage() {
        this.errorMessage = null;
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

    _gotoHomeState() {
        this.$state.go('home');
    }
};
