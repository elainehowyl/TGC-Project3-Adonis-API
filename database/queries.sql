INSERT INTO users (email, password, first_name, last_name, contact_number)
VALUES
('bradleycooper@gmail.com', '1234567890', 'Bradley', 'Cooper', '90091111'),
('bradpitt@gmail.com', '0123456789', 'Brad', 'Pitt', '90092222'),
('ryangosling@gmail.com', '1234567890', 'Ryan', 'Gosling', '90093333');

INSERT INTO addresses (street_name, unit_number, postal_code, building_name, block_number)
VALUES
('Bukit Batok Street 22', '#05-23', '650225', 'EdgeField', '225');

INSERT INTO address_user (address_id, user_id)
VALUES
('3','1');

INSERT INTO admins (username, password)
VALUES
('admin','theburgershopadmin');

INSERT INTO orders (user_id, total_price, address_id)
VALUES
(6, 50000, 25)

ALTER TABLE addresses RENAME COLUMN building_number TO building_name;

SELECT * FROM users JOIN address_user ON users.id = address_user.user_id;

DELETE from admins WHERE id=1;
