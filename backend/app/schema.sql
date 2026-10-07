CREATE TABLE IF NOT EXISTS zones (
    zone_id SERIAL PRIMARY KEY,
    zone_name VARCHAR(100) NOT NULL,
    area_sq_km DECIMAL(10,2),
    forest_cover_percentage DECIMAL(5,2),
    status VARCHAR(30) DEFAULT 'Active',
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS forest_surveys (
    survey_id SERIAL PRIMARY KEY,
    zone_id INTEGER NOT NULL REFERENCES zones(zone_id) ON DELETE CASCADE,
    survey_date DATE NOT NULL,
    image_path TEXT,
    forest_cover_percentage DECIMAL(5,2),
    vegetation_percentage DECIMAL(5,2),
    estimated_tree_count INTEGER,
    model_name VARCHAR(100),
    model_confidence DECIMAL(5,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tree_detections (
    detection_id SERIAL PRIMARY KEY,
    survey_id INTEGER NOT NULL REFERENCES forest_surveys(survey_id) ON DELETE CASCADE,
    class_name VARCHAR(100) NOT NULL,
    confidence DECIMAL(5,4),
    x DECIMAL(10,2),
    y DECIMAL(10,2),
    width DECIMAL(10,2),
    height DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS forest_changes (
    change_id SERIAL PRIMARY KEY,
    zone_id INTEGER NOT NULL REFERENCES zones(zone_id) ON DELETE CASCADE,
    previous_survey_id INTEGER REFERENCES forest_surveys(survey_id),
    current_survey_id INTEGER REFERENCES forest_surveys(survey_id),
    change_percentage DECIMAL(5,2),
    change_type VARCHAR(50),
    ai_confidence DECIMAL(5,4),
    status VARCHAR(30) DEFAULT 'Requires Verification',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS air_quality (
    air_quality_id SERIAL PRIMARY KEY,
    zone_id INTEGER NOT NULL REFERENCES zones(zone_id) ON DELETE CASCADE,
    aqi INTEGER,
    pm25 DECIMAL(10,2),
    pm10 DECIMAL(10,2),
    no2 DECIMAL(10,2),
    so2 DECIMAL(10,2),
    co DECIMAL(10,2),
    o3 DECIMAL(10,2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS alerts (
    alert_id SERIAL PRIMARY KEY,
    zone_id INTEGER REFERENCES zones(zone_id) ON DELETE SET NULL,
    alert_type VARCHAR(50) NOT NULL,
    severity VARCHAR(30),
    message TEXT,
    status VARCHAR(30) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS monitored_trees (
    tree_id SERIAL PRIMARY KEY,
    zone_id INTEGER REFERENCES zones(zone_id) ON DELETE SET NULL,
    tree_code VARCHAR(50) UNIQUE NOT NULL,
    species VARCHAR(100),
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    status VARCHAR(30) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rfid_tags (
    rfid_id SERIAL PRIMARY KEY,
    tree_id INTEGER UNIQUE REFERENCES monitored_trees(tree_id) ON DELETE CASCADE,
    tag_uid VARCHAR(100) UNIQUE NOT NULL,
    qr_code VARCHAR(255),
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS officers (
    officer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(30),
    status VARCHAR(30) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reports (
    report_id SERIAL PRIMARY KEY,
    zone_id INTEGER REFERENCES zones(zone_id) ON DELETE SET NULL,
    officer_id INTEGER REFERENCES officers(officer_id) ON DELETE SET NULL,
    report_type VARCHAR(50),
    title VARCHAR(200),
    description TEXT,
    report_status VARCHAR(30) DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);