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

    // boolean for ng-show: true displays inputs
    vm.showInputs = true;

    // boolean for ng-if ?
    vm.isAdmin = false;

    // message string for user login
    vm.message = '';

    // handles user login and authentication
    vm.login = () => {
        console.log('in login');
        
        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = swal('Missing Credentials!', 'please enter your username and password to login', 'error');
        } else {
            $http.post('/', vm.user).then((response) => {
                if (response.data.username) {
                    console.log('login success: ', response.data);
                    // hide login inputs and buttons
                    vm.showInputs = false;
                    // clear input
                    vm.user.password = null;
                    // if the user is an admin redirect to admin view
                    if (response.data.admin) {
                        vm.isAdmin = true;
                        UserService.isAdmin = true;
                        $location.path('/admin');
                    } else {
                        $location.path('/');
                    } // end else
                } else {
                    console.log('login post failure: ', response);
                    vm.message = swal('Incorrect Credentials!', 'please try again', 'error');
                } // end else
            }).catch((response) => {
                console.log('login catch - failure: ', response);
                vm.message = swal('Incorrect Credentials!', 'please try again', 'error');
            }); // end catch
        } // end else
    }; // end login

    // this handles user registration
    // gathers data from input fields and sends it the server to be added to the DB
    vm.register = () => {
        console.log('in register');
        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = swal('Missing Fields', 'Enter a username and a password.', 'error');
        } else {
            console.log('Register sending to server ->', vm.user);
            $http.post('/register', vm.user).then((response) => {
                console.log('user registration successful');
                vm.message = swal({
                    title: 'Registered Successfully!',
                    text: 'Welcome, ' + vm.user.username + '!',
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Login'
                }).then(() => {
                    vm.login();
                }); // end vm.message
            }).catch((response) => {
                console.log('Registration error: ', response);
                vm.message = swal('Registration Error', 'Please try again.', 'error');
            }); // end catch
        } // end else
    }; // end register

    // create logout func and tie to ng-click
    vm.logout = () => {
        UserService.logout();
        vm.showInputs = true;
        // clear input
        vm.user.username = null;
    }; // end logout

}); // end NavController