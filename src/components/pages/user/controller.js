export default class UserPageController {
    constructor($scope, AuthService) {
        'ngInject';

        const unsubscribe = AuthService.onAuthStateChanged(auth => {
            if (auth) {
                this.userName = auth.displayName;
                this.photoURL = auth.photoURL;
                this.email = auth.email;
            }
        });

        $scope.$on('$destroy', () => {
            unsubscribe();
        });
    }
}
