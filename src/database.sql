-- DB Name: mn-trails-finder

-- Table Creation
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
	username VARCHAR(50),
    password VARCHAR(50)
);