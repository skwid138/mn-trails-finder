/*jshint esversion: 6 */

myApp.service('UserService', ($http, $location) => {
    console.log('in UserService');
    const self = this;

    self.userObject = {
        userName: ''
    }; // end userObject

    self.getUser = () => {
        console.log('in UserService.getUser');
        
        $http.get('/user').then((response) => {
            if (response.data.username) {
                // user has a current session on the server
                self.userObject.userName = response.data.username;
                console.log('response.data.username', response.data.username);
            } else {
                console.log('getUser failed', response);
                // user has no session, bounce them back to the login page
                $location.path("/home");
            } // end else
        }); // end GET
    }; // end getUser

    self.logout = () => {
        console.log('in UserService.logout');
        $http.get('/user/logout').then((response) => {
            console.log('logged out');
            $location.path("/home");
        }); // end GET
    }; // end logout

}); // end UserService