book_database

CREATE TABLE books (
    "id" SERIAL PRIMARY KEY,
    "name" character varying(80) NOT NULL,
    "date" date,
    "img_url" character varying(250),
    "collection" character varying(30) DEFAULT '0'::character varying
);

CREATE TABLE collections (
    "id" SERIAL PRIMARY KEY,
    "name" character varying(20) NOT NULL,
    "count" integer NOT NULL DEFAULT 0
);

