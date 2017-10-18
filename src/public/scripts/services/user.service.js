/*jshint esversion: 6 */

myApp.service('UserService', function($http, $location) {
    console.log('in UserService');
    const self = this;

    self.userObject = {
        userName: '',
        admin: false
    }; // end userObject

    self.getUser = () => {
        console.log('in UserService.getUser');
        
        $http.get('/user').then((response) => {
            console.log('/user response.data ', response.data);
            
            if (response.data.username) {
                // user has a current session on the server
                self.userObject.userName = response.data.username;
                self.userObject.admin = response.data.admin;
                // console.log('response.data.username', response.data.username);
            } else {
                console.log('getUser failed', response);
            } // end else
        }); // end GET
    }; // end getUser

    self.logout = () => {
        console.log('in UserService.logout');
        $http.get('/user/logout').then((response) => {
            console.log('logged out');
        }); // end GET
    }; // end logout

}); // end UserService