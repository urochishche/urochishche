export default class RegisterController {
    constructor($scope, $state, AuthService, RatingService) {
        'ngInject';

        this.$scope = $scope;
        this.$state = $state;

        this.AuthService = AuthService;
        this.RatingService = RatingService;
    }

    submit() {
        const { email, password, name, photoURL } = this.auth;
        this._startProgress();
        this.AuthService.createUser({
                email,
                password,
                name,
                photoURL
            })
            .then((user) => {
                return this.RatingService.addUser(user);
            })
            .then(() => {
                this._gotoUserState();
            })
            .catch(error => {
                this._stopProgress();
                this._onError(error);
            });
    }

    _onError(error) {
        let result;
        switch (error.code) {
            case 'auth/email-already-in-use': {
                result = 'Пользователь с таким адресом электронной почты уже существует';
                break;
            }
            case 'auth/invalid-email': {
                result = 'Неправильный формат адреса электронной почты';
                break;
            }
            case 'auth/operation-not-allowed': {
                result = 'Регистрация заблокирована';
                break;
            }
            case 'auth/weak-password': {
                result = 'Слишком простой пароль';
                break;
            }
            case 'auth/too-many-requests': {
                result = 'Авторизация временно заблокирована';
                this.blocked = true;
                this.$timeout(() => {
                    this.blocked = false;
                    this.errorMessage = null;
                }, 5000);
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

    _gotoUserState() {
        this.$state.go('user');
    }
};
