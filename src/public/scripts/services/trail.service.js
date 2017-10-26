/*jshint esversion: 6 */

myApp.service('TrailService', function ($http, UserService) {
    console.log('in TrailService');
    const self = this;

    // object for holding trails array
    self.trails = {
        list: [], // holds all trails, ** not being used for anything
        approved: [], // holds only approved trails
        flagged: [], // holds only trails that need to be approved
        trailsView: {}, // object to hold value of clicked trail from home, admin, or my trails
        my_trails: [] // based on the logged in user this contains all trails a user has added to their my-trails list
    }; // end self.trails

    // variable to hold user data for generating my-trails list
    const user = UserService.userObject;


    /******** make functions private to service by not saying self.funcName *******/

    // sort trails.list and push trails flagged true for approved
    // into trails.approved array and all the rest into trails.flagged
    self.trailsToApprove = (trailsArray) => {
        console.log('in trailsToApprove');
        // reset array values
        self.trails.list = trailsArray;
        self.trails.approved = [];
        self.trails.flagged = [];
        for (let i = 0; i < trailsArray.length; i++) {
            // if trail.approved has NOT been has been flagged true
            if (trailsArray[i].approved) {
                // approved trails are added to trails.approved
                self.trails.approved.push(trailsArray[i]);
            } else { // trails needing admin approval are added to trails.flagged
                self.trails.flagged.push(trailsArray[i]); 
            } // end else
        } // end for 
        // get trail ratings every time all trails are refreshed
        self.getAllRatings();
    }; // end trailsToApprove

    // calculate trail rating after GET
    self.calculateRating = (ratingsArray) => {
        console.log('in calculateRating');
        // loop through all approved trails
        for (var i = 0; i < self.trails.approved.length; i++) {
            // sets how many ratings a trail has
            let trailSpecificRatings = self.ratingsCount(self.trails.approved[i].trails_id, ratingsArray);
            self.trails.approved[i].ratingCount = trailSpecificRatings.length;
            // if a trail has ratings set the sum and average of ratings
            if (trailSpecificRatings.length > 0) {
                let sum = self.sumRatings(trailSpecificRatings);
                self.trails.approved[i].ratingSum = sum;
                // sets average rating a trail has
                let average = sum / trailSpecificRatings.length;
                self.trails.approved[i].ratingAverage = average;
            } // end if
        } // end for
    }; // end calculateRating

    // pass in array of ratings for as single trails_id 
    // to get the number of ratings for that trail
    self.ratingsCount = (trails_id, ratingsArray) => {
        // console.log('in ratingsCount');
        // gets all ratings associated with the trails_id that's passed in
        return ratingsArray.filter((trail) => {
            return trail.trails_id === trails_id;
            // makes an array of the ratings for specified trail
        }).map((rating) => {return rating.rating_value;});
    }; // end ratingsCount

    // adds all ratings together for a specified trail
    self.sumRatings = (trailsRatingsArray) => {
        // console.log('in sumRatings');
        // acc is the accumulated value of all the items and val is where it starts adding
        // I believe this adds all the values in the array together
        return trailsRatingsArray.reduce((acc, val) => {
            return acc + val;
        });
    }; // end sumRatings

    //controller passes a trail object and sets the
    // value on the service for the trail controller
    self.setTrailsViewObject = (trailObject) => {
        console.log('in setTrailsViewObject');
        self.trails.trailsView = trailObject;
    }; // end setTrailsViewObject

    // search for approved trail objects that match 
    // a trails_id passed in from the user's my trails array
    self.findMyTrails = (myTrailObject) => {
        console.log('in findMyTrails');
        // return a trail Object if one matches the passed in trail_id
        return self.trails.approved.filter((trail) => {
            return trail.trails_id === myTrailObject.trails_id;
        }); // end filter
    }; // end findMyTrails

    // get array of trail objects with trail IDs from user's my trails
    // create an array of trail objects for use on my trails view
    self.buildMyTrailsTrailObjectArray = (my_trailsArrayOfObjects) => {
        console.log('in buildMyTrailsList');
        // loop through trails_id's the user has added to my trails
        my_trailsArrayOfObjects.forEach((trail)=>{
            // push the corresponding trail object into an array for my_trails
            self.trails.my_trails.push(self.findMyTrails(trail)[0]);
        }); // end forEach
    }; // end createMyTrailsList


    /************** $http **************/

    // get trail IDs from my_trails table on DB
    self.getMyTrails = () => {
        console.log('in getAllRatings');
        $http.get('/trail/my_trails').then((response) => {
            console.log('getMyTails response.data.rows ', response.data.rows);
            self.buildMyTrailsTrailObjectArray(response.data.rows);
        }); // end GET
    }; // end getMyTrails

    // get trail ratings from DB
    self.getAllRatings = () => {
        console.log('in getAllRatings');
        $http.get('/trail/rating').then((response) => {
            //console.log('getAllRatings  response.data.rows ', response.data.rows);
            // group the ratings by trail_id and
            // push them into self.trails.ratings array
            self.calculateRating(response.data.rows);
        }); // end GET
    }; // end getAllRatings

    // get all trails and ratings from DB
    self.getAllTrails = () => {
        console.log('in getAllTrails');
        $http.get('/trail').then((response) => {
            console.log('self.trails.list', response.data.rows);
            // sort trails based on their approval status
            // push trails to self.trails.approved
            // or push trails to self.trails.flagged
            self.trailsToApprove(response.data.rows);
        }); // end GET
    }; // end getAllTrails

    // after admin has approved a trail update it's status in the DB
    self.approveTrail = (trails_id) => {
        console.log('in approveTrail');
        $http.put('/trail/approve/' + trails_id).then((response) => {
            // get and sort all trails
            self.getAllTrails();
            return swal({
                title: 'Trail Approved!',
                text: 'the trail will now be searchable on the home page',
                type: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }); // end swal
        }, (error) => {
            console.log('error ', error);
            if (error.status === 403) {
                return swal({
                    title: 'Admin must be Logged In',
                    text: 'trails can only be approved by logged in admin users',
                    type: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }); // end swal
            } // end if
        }); // end PUT
    }; // end approveTrail

    // admin users can remove a trail from the DB
    self.deleteTrail = (trails_id) => {
        console.log('in deleteTrail');
        $http.delete('/trail/' + trails_id).then((response) => {
            // get and sort all trails
            self.getAllTrails();
        }, (error) => {
            console.log('error ', error);
            if (error.status === 403) {
                return swal({
                    title: 'Admin must be Logged In',
                    text: 'trails can only be deleted by logged in admin users',
                    type: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }); // end swal
            } // end if
        }); // end PUT
    }; // end deleteTrail

    // users rate a trail 1-5 and store it in a ratings junction table
    self.rateTrailPost = (ratingObject) => {
        console.log('in rateTrailPost');
        $http.post('/trail/rating', ratingObject).then((response) => {
            // if server responds with 'Created'
            if (response.status === 201) {
                // update rating values
                self.getAllRatings();
                return swal({
                    title: 'Trail Rated!',
                    text: 'your rating has been applied to the trail',
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }); // end swal
            } // end if
        }, (error) => {
            console.log('error ', error);
            if (error.status === 403) {
                return swal({
                    title: 'Must be Logged In',
                    text: 'trails can only be rated by logged in users',
                    type: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }); // end swal
            } // end if
        }); // end POST
    }; // end rateTrail

    // users add a trail to the my_trails junction table
    self.myTrailPost = (my_trailsObject) => {
        console.log('in myTrailPost');
        $http.post('/trail/my_trails', my_trailsObject).then((response) => {
            // if server responds with 'Created'
            if (response.status === 201) {
                // trail_id of newly created trail
                console.log(response.data.rows[0].my_trails_id);
                // can use id to route to the users my-trail's page
                return swal({
                    title: 'Trail Added!',
                    text: 'trail will now appear on your My Trails page',
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }); // end swal
            } // end if
        }, (error) => {
            console.log('error ', error);
            if (error.status === 403) {
                return swal({
                    title: 'Must be Logged In',
                    text: 'trails can only be added by logged in users',
                    type: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }); // end swal
            } else if (error.status === 302) {
                return swal({
                    title: 'Already added!',
                    text: 'that trail has already been added, if you wish to remove it click remove on trail\'s page',
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }); // end swal
            } // end else if
        }); // end POST
    }; // end addMyTrailPost
    
    
}); // end TrailService