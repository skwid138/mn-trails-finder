/*jshint esversion: 6 */

/*
This controller is for the nav bar and user login
- collects username and password
- displays username
- displays My Trails button
*/
myApp.controller('NavController', function (UserService, $http) {
    console.log('in NavController');
    const vm = this;

    // user object for login
    vm.user = {
        username: '',
        password: ''
    };

    // message string for user login
    vm.message = '';

    // handles user login
    vm.login = () => {
        console.log('in login');
        
        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = "Enter your username and password!";
        } else {
            console.log('login - sending to server ', vm.user);
            $http.post('/', vm.user).then((response) => {
                if (response.data.username) {
                    console.log('login success: ', response.data);
                } else {
                    console.log('login post failure: ', response);
                    vm.message = "Incorrect Credentials, please try again";
                } // end else
            }).catch((response) => {
                console.log('login catch - failure: ', response);
                vm.message = "Incorrect Credentials, please try again";
            }); // end catch
        } // end else
    }; // end login


}); // end NavController