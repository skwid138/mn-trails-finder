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

    // boolean for ng-if
    vm.isAdmin = false;

    // message string for user login
    vm.message = '';

    // handles user login and authentication
    vm.login = () => {
        console.log('in login');
        
        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = swal("Enter your username and password to Login.");
        } else {
            console.log('login - sending to server ', vm.user);
            $http.post('/', vm.user).then((response) => {
                if (response.data.username) {
                    console.log('login success: ', response.data);
                    // clear inputs
                    vm.user.username = null;
                    vm.user.password = null;
                    // if the user is an admin redirect to admin view
                    if (response.data.admin) {
                        $location.path('/admin');
                        vm.isAdmin = true;
                    } else {
                        $location.path('/home');
                    } // end else
                } else {
                    console.log('login post failure: ', response);
                    vm.message = swal("Incorrect Credentials, please try again.");
                } // end else
            }).catch((response) => {
                console.log('login catch - failure: ', response);
                vm.message = swal("Incorrect Credentials, please try again.");
            }); // end catch
        } // end else
    }; // end login

    // this handles user registration
    // gathers data from input fields and sends it the server to be added to the DB
    vm.register = () => {
        console.log('in register');
        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = 'Choose a username and password!';
        } else {
            console.log('Register sending to server ->', vm.user);
            $http.post('/register', vm.user).then((response) => {
                console.log('LoginController -- registerUser -- success');
                vm.message = vm.user.username + 'Registered Succesfully!';
                // clear inputs
                vm.user.username = null;
                vm.user.password = null;
            }).catch((response) => {
                console.log('Registration error: ', response);
                vm.message = 'Please try again.';
            }); // end catch
        } // end else
    }; // end register


}); // end NavController