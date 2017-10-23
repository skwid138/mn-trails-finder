/*jshint esversion: 6 */

myApp.service('TrailService', function($http) {
    console.log('in TrailService');
    const self = this;

    // object for holding trails array
    self.trails = {
        list: [], // holds all trails
        approved: [], // holds only approved trails
        flagged: [] // holds only trails that need to be approved
    }; // end self.trails

    // get all trails from DB
    self.getAllTrails = () => {
        console.log('in getAllTrails');
        $http.get('/trail').then((response) => {
            console.log('self.trails.list', self.trails.list);
            self.trailsToApprove(response.data.rows);
        }); // end GET
    }; // end getAllTrails

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
                // trail_id of newly created trail
                console.log(response.data.rows[0].user_id);
                // can use id to route to the users my-trail's page
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