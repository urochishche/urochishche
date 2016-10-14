export default class NavbarController {
    constructor($scope, $state, AuthService) {
        'ngInject';

        this.$scope = $scope;
        this.$state = $state;
        this.AuthService = AuthService;

        this.stateNames = [
            'home',
            'object',
            'rating',
            'about',
            'login',
            'user'
        ];
        
        this._initState();
        this._initAuth();
        this._bindEvents();
    }

    logout() {
        this.AuthService.signOut();
    }

    _initAuth() {
        this.auth = this.AuthService.getAuth();
    }

    _initState() {
        const state = {};
        this.stateNames.forEach(name => {
            state[name] = this.$state.includes(name);
        });
        this.state = state;
    }

    _bindEvents() {
        this.$scope.$on('$stateChangeSuccess', () => {
            this._initState();
        });

        this.AuthService.onAuthStateChanged(() => {
            this._initAuth();
        });
    }
}
