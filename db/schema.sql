DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;


CREATE TABLE department{
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
};



CREATE TABLE role{
  id INT NOT NULL AUTO_INCREMENT, title VARCHAR(30) NOT NULL, 
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id),
  REFERENCES departments(id) ON DELETE SET NULL,
};

CREATE TABLE employee {
 id INT NOT NULL AUTO_INCREMENT,
 first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
 role_id INT, 
 manager_id INT,
 manager_id VARCHAR(30) DEFAULT NULL, 
 REFERENCES employee(id)
 FOREIGN KEY (role_id)
 ON DELETE SET NULL,
FOREIGN KEY (manager_id)
REFERENCES employee(id)
ON DELETE SET NULL,
 
};