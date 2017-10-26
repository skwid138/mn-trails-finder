-- DB Name: mn-trails-finder


-- Table Creation --

-- houses users credentials
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
	username VARCHAR(100)  NOT NULL UNIQUE,
    password VARCHAR(200)  NOT NULL,
    admin BOOLEAN DEFAULT false
);

-- houses trails of interest flagged by users will be removed if user is deleted
CREATE TABLE my_trails (
    my_trails_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users (user_id) ON DELETE CASCADE,
    trails_id INT REFERENCES trails (trails_id) ON DELETE CASCADE,
    UNIQUE (user_id, trails_id)
);

-- houses users ratings for trails even if user is deleted (1 rating per user per trail)
CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (user_id),
    trails_id INT REFERENCES trails (trails_id) ON DELETE CASCADE,
    rating_value INT,
    UNIQUE (user_id, trails_id)
);

-- houses trails data
CREATE TABLE trails (
    trails_id SERIAL PRIMARY KEY,
    park_name VARCHAR(100),
    trail_name VARCHAR(100),
    address1 VARCHAR(100),
    address2 VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(2) DEFAULT 'MN',
    zip NUMERIC(5, 0),
    length VARCHAR(50),
    dog BOOLEAN NOT NULL DEFAULT false,
    child BOOLEAN NOT NULL DEFAULT false,
    paved BOOLEAN NOT NULL DEFAULT false,
    water BOOLEAN NOT NULL DEFAULT false,
    parking BOOLEAN NOT NULL DEFAULT false,
    parking_free BOOLEAN NOT NULL DEFAULT false,
    park_pass BOOLEAN NOT NULL DEFAULT false,
    hiking BOOLEAN NOT NULL DEFAULT false,
    biking BOOLEAN NOT NULL DEFAULT false,
    skiing BOOLEAN NOT NULL DEFAULT false,
    horse BOOLEAN NOT NULL DEFAULT false,
    atv BOOLEAN NOT NULL DEFAULT false,
    snowmobile BOOLEAN NOT NULL DEFAULT false,
    trail_description TEXT,
    photo VARCHAR(200),
    ll INT, --for trail head not used
    gain INT, -- not being used 
    approved BOOLEAN NOT NULL DEFAULT false
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