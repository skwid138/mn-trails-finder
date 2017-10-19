-- DB Name: mn-trails-finder


-- Table Creation --

-- houses users credentials
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
	username VARCHAR(100) not null UNIQUE,
    password VARCHAR(200) not null,
    admin BOOLEAN DEFAULT false
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
CREATE TABLE trails (
    trails_id SERIAL PRIMARY KEY,
    trail_name VARCHAR(100),
    park_name VARCHAR(100),
    trail_description TEXT,
    photo VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(2) DEFAULT 'MN',
    ll INT, --for trail head
    parking_lot BOOLEAN,
    length INT,
    gain INT,
    dog BOOLEAN,
    child BOOLEAN,
    type_hiking BOOLEAN,
    type_skiing BOOLEAN,
    type_biking BOOLEAN,
    type_atv BOOLEAN,
    type_snowmobile BOOLEAN,
    type_horse BOOLEAN,
    approved BOOLEAN
);

-- reviews of trails or comments on trails? hmm
CREATE TABLE reviews (
    reviews_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (user_id),
    trails_id INT REFERENCES trails (trails_id) ON DELETE CASCADE,
    photo VARCHAR(100),
    comment TEXT,
    trail_date DATE,
    road_condition VARCHAR(50),
    snow VARCHAR(50),
    bugs VARCHAR(50),
    trail_condition VARCHAR(50)
);