/*jshint esversion: 6 */

myApp.service('TrailService', function($http) {
    console.log('in TrailService');
    const self = this;

    // object for holding trails array
    self.trails = {
        list: [], // holds all trails
        approved: [], // holds only approved trails
        flagged: [], // holds only trails that need to be approved
        allRatings: [],
        calculatedRatings: [] // holds total rating for each trail object
    }; // end self.trails

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
    }; // end trailsToApprove

    // calculate trail rating after GET
    self.calculateRating = (ratingsArray) => {
        console.log('in calculateRating');
        // loop through each rating object in ratings array
        for (let i = 0; i < ratingsArray.length; i++) {
             // check if trail_id in self.trails.ratings matches trail_id of ratingsArray
            for (let j = 0; j < self.trails.ratings.length; j++) {
                // if the trail is already in the self.trails.ratings 
                if (self.trails.calculatedRatings[j].trails_id === ratingsArray[i].trails_id) {
                    // increment how many users have rated the the trail
                    self.trails.calculatedRatings[j].numberOfRatings++;
                    // increase the totalRatingsValue by the rating_value
                    self.trails.calculatedRatings[j].totalRatingsValue += ratingsArray[i].rating_value;
                } else{
                    // if the trail_id is not in self.trails.ratings array
                    // make an object for it and push it into the array
                    let totalRatingObject = {
                        // which trail the rating is for
                        trails_id: ratingsArray[i].trails_id,
                        // how many users rated a trail, starting with 1
                        numberOfRatings: 1,
                        // all rating values for the trail added together, starting with the first occurrence
                        totalRatingsValue: ratingsArray[i].rating_value
                    }; // end totalRatingObject  
                    // push new trail rating object into self.trails.ratings array
                    self.trails.calculatedRatings.push(totalRatingObject);
                } // end else
            } // end for j
        } // end for i
    }; // end calculateRating

    /************** $http **************/

    // get trail ratings from DB
    self.getAllRatings = () => {
        console.log('in getAllRatings');
        $http.get('/trail/rating').then((response) => {
            console.log('self.trails.ratings', self.trails.ratings);
            // group the ratings by trail_id and
            // push them into self.trails.ratings array
            self.calculateRating(response.data.rows);
        }); // end GET
    }; // end getAllRatings

    // get all trails from DB
    self.getAllTrails = () => {
        console.log('in getAllTrails');
        $http.get('/trail').then((response) => {
            console.log('self.trails.list', self.trails.list);
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
        }); // end PUT
    }; // end approveTrail

    // admin users can remove a trail from the DB
    self.deleteTrail = (trails_id) => {
        console.log('in deleteTrail');
        $http.delete('/trail/' + trails_id).then((response) => {
            // get and sort all trails
            self.getAllTrails();
        }); // end PUT
    }; // end deleteTrail

    // users rate a trail 1-5 and store it in a ratings junction table
    self.rateTrailPost = (ratingObject) => {
        console.log('in rateTrailPost');
        $http.post('/trail/rating', ratingObject).then((response) => {
            // if server responds with 'Created'
            if (response.status === 201) {
                return self.message = swal({
                    title: 'Trail Rated!',
                    text: 'your rating has been applied to the trail',
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }); // end vm.message
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
            } // end if
        }); // end POST
    }; // end addMyTrailPost
    
    
}); // end TrailService