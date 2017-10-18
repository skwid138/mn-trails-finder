/*jshint esversion: 6 */

/*
This controller is for the nav bar and user login
- collects username and password
- allows user registration
- displays username after successful login
- displays My Trails button
*/
myApp.controller('NavController', function(UserService, $http, $location) {
    console.log('in NavController');
    const vm = this;

    // user object for login
    vm.user = {
        username: '',
        password: ''
    };

    // message string for user login
    vm.message = '';

    // handles user login and authentication
    vm.login = () => {
        console.log('in login');
        
        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = "Enter your username and password!";
        } else {
            console.log('login - sending to server ', vm.user);
            $http.post('/', vm.user).then((response) => {
                if (response.data.username) {
                    console.log('login success: ', response.data);
                    // if the user is an admin redirect to admin view
                    if (response.data.admin) {
                        $location.path('/admin');
                    } else {
                        $location.path('/home');
                    } // end else
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

    // this handles user registration
    // gathers data from input fields and sends it the server to be added to the DB
    vm.register = () => {
        console.log('in register');
        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = "Choose a username and password!";
        } else {
            console.log('Register sending to server ->', vm.user);
            $http.post('/register', vm.user).then((response) => {
                console.log('LoginController -- registerUser -- success');
            }).catch((response) => {
                console.log('Registration error: ', response);
                vm.message = "Please try again."
            }); // end catch
        } // end else
    }; // end register


}); // end NavController