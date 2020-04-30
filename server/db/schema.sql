DROP DATABASE IF EXISTS budget;

CREATE DATABASE budget;

USE budget;

CREATE TABLE categories (
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE transactions (
  id int NOT NULL AUTO_INCREMENT,
  date VARCHAR(10),
  amount decimal(10, 2) NOT NULL,
  description varchar(50) NOT NULL,
  category_id int,
  PRIMARY KEY (ID)
);

CREATE TABLE balances (
    id int NOT NULL AUTO_INCREMENT,
    category_id int NOT NULL,
    amount int,
    PRIMARY KEY (ID)
);

CREATE TABLE income (
  id INT NOT NULL AUTO_INCREMENT,
  income int NOT NULL,
  PRIMARY KEY (ID)
);







INSERT INTO categories (name) VAlUES ("Housing");
INSERT INTO categories (name) VALUES ("Groceries");
INSERT INTO categories (name) VALUES ("Dining");
INSERT INTO categories (name) VALUES ("Entertainment");
INSERT INTO categories (name) VAlUES ("Transportation");
INSERT INTO categories (name) VALUES ("Miscellaneous");
INSERT INTO categories (name) VAlUES ("Debt");
INSERT INTO categories (name) VALUES ("Savings");


insert into transactions (date, amount, description, category_id) values ("2017-08-14", 29.85, 'movies', 4);
insert into transactions (date, amount, description, category_id) values ("2017-08-13", 5.98, 'groceries', 2);
insert into transactions (date, amount, description, category_id) values ("2017-08-13", 5.98, 'saved $200', 8);
insert into transactions (date, amount, description, category_id) values ("2017-08-13", 5.98, 'went to bar', 4);
insert into transactions (date, amount, description, category_id) values ("2017-08-13", 5.98, 'rent', 1);
insert into transactions (date, amount, description, category_id) values ("2017-08-13", 5.98, 'electricity', 1);
insert into transactions (date, amount, description, category_id) values ("2017-08-13", 5.98, 'payed old bill', 7);

