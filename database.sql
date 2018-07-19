book_database

CREATE TABLE "books" (
		"id" SERIAL PRIMARY KEY,
		"name" VARCHAR(80) NOT NULL,
		"date" DATE NOT NULL,
		"img_url" VARCHAR(250),
		"genre" VARCHAR(30) NOT NULL
);

CREATE TABLE "genres" (
		"id" SERIAL PRIMARY KEY,
		"name" VARCHAR(20) NOT NULL
);

