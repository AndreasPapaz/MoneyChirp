CREATE DATABASE MoneyChirp_db;

USE MoneyChirp_db;

CREATE TABLE company_lists (
	ID INT NOT NULL AUTO_INCREMENT,
    company_name VARCHAR(200) NOT NULL,
    twitter_handle VARCHAR(200) NOT NULL,
    stock_sym VARCHAR(200) NOT NULL,
    PRIMARY KEY (ID)
);

SELECT * from company_lists;