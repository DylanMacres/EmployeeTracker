INSERT INTO department (dept_name)
VALUES ("Heart of House"),
        ('Front of House'),
        ("Management");



INSERT INTO roles (title,salary,department_id)
VALUES("Cook", 40000, 1),
      ("server", 50000, 2),
      ("manager", 60000, 3),
      ('a-gm', 70000, 4), 
      ("gm", 90000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dylan", "Macres", 1, null),
        ("JoJo","Mora", 1, null),
        ("Anthony","Stanlert", 1, null),
        ("Siera", "Petty", 2, null),
        ("Chris","Crusty",3, 1 ),
        ("Joshua", "Tommy", 5, 3),
        ("Pat","Smatt", 4, 2);



