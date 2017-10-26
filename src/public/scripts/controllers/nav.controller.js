/*jshint esversion: 6 */

/*
This controller is for the nav bar and user login
- collects username and password
- allows user registration
- displays username after successful login
- displays My Trails button
*/
myApp.controller('NavController', function (UserService, $http, $location, TrailService) {
    //console.log('in NavController');
    const vm = this;

    // user object for login
    vm.user = {
        username: '',
        password: ''
    }; // end user object

    // boolean for ng-show: true displays inputs
    vm.showInputs = true;

    // boolean for ng-if ?
    vm.isAdmin = false;

    // handles user login and authentication
    vm.login = () => {
        console.log('in login');
        if (vm.user.username === '' || vm.user.password === '') {
            swal('Missing Credentials!', 'please enter your username and password to login', 'error');
        } else {
            $http.post('/', vm.user).then((response) => {
                if (response.data.username) {
                    console.log('login success: ', response.data);
                    // hide login inputs and buttons
                    vm.showInputs = false;
                    // clear input
                    vm.user.password = null;
                    // generate my trails list
                    TrailService.getMyTrails();
                    // if the user is an admin redirect to admin view
                    if (response.data.admin) {
                        vm.isAdmin = true;
                        UserService.isAdmin = true;
                        $location.path('/admin');
                    } // end if
                } else {
                    console.log('login post failure: ', response);
                    swal('Incorrect Credentials!', 'please try again', 'error');
                } // end else
            }).catch((response) => {
                console.log('login catch - failure: ', response);
                swal('Incorrect Credentials!', 'please try again', 'error');
            }); // end catch
        } // end else
    }; // end login

    // this handles user registration
    // gathers data from input fields and sends it the server to be added to the DB
    vm.register = () => {
        console.log('in register');
        if (vm.user.username === '' || vm.user.password === '') {
            swal('Missing Fields', 'Enter a username and a password.', 'error');
        } else {
            console.log('Register sending to server ->', vm.user);
            $http.post('/register', vm.user).then((response) => {
                console.log('user registration successful');
                swal({
                    title: 'Registered Successfully!',
                    text: 'Welcome, ' + vm.user.username + '!',
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Login'
                }).then(() => {
                    vm.login();
                }); // end swal
            }).catch((response) => {
                console.log('Registration error: ', response);
                swal('Registration Error', 'Please try again.', 'error');
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