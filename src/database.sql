-- DB Name: mn-trails-finder


-- Table Creation --

-- houses users credentials
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
	username VARCHAR(50),
    password VARCHAR(50)
);

-- houses trails of interest flagged by users will be removed if user is deleted
CREATE TABLE my_trails (
    my_trails_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users (user_id) ON DELETE CASCADE,
    trails_id INT REFERENCES trails (trails_id) ON DELETE CASCADE
);

-- houses users ratings for trails even if user is deleted
CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (user_id),
    trails_id INT REFERENCES trails (trails_id) ON DELETE CASCADE,
    rating_value NUMERIC(1, 0)
);

-- houses trails data
CREATE TABLE ratings (
    trails_id SERIAL PRIMARY KEY,
    trail_name VARCHAR(50),
    trail_description TEXT,
);