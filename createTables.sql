CREATE TYPE sextype AS ENUM ('male', 'female');
CREATE TYPE showclass AS ENUM ('baby','puppy','junior','intermediate','open','working','winner','champion','club champion','veteran');
CREATE TYPE showmarks AS ENUM ('absent','very good','good','sufficient','disqualified','cannot be judged','very promising','promising','very perspective','perspective','excellent');

CREATE TABLE dogs
(
  id serial NOT NULL,
  name varchar,
  old_id integer,
  owner_id integer,
  coowner_id integer,
  sex sextype, 
  pedigree varchar(8),
  pedigree_no varchar(40),
  father_id integer,
  mother_id integer,
  link varchar(255),
  tattoo varchar(40),
  chip varchar(40),
  dob date,
  breeder_id integer,
  cobreeder_id integer,
  color varchar(40),
  CONSTRAINT dogs_pkey PRIMARY KEY (id)
);

CREATE TABLE people
(
  id serial NOT NULL,
  name varchar,
  old_id integer,
  city varchar,
  contact varchar,
  link varchar(255),
  CONSTRAINT people_pkey PRIMARY KEY (id)
);

CREATE TABLE show_results
(
  id serial NOT NULL,
  dog_id integer,
  show_id integer,
  class showclass,
  mark showmarks,
  place smallint,
  certificate varchar(20),
  critique text,
  age_result varchar(255),
  breed_result varchar(255),
  group_result varchar(255),
  bis_result varchar(255),
  CONSTRAINT show_results_pkey PRIMARY KEY (id)
);


CREATE TABLE show
(
  id serial NOT NULL,
  name varchar,
  old_id integer,
  organizer varchar(255),
  show_date date,
  place varchar(255),
  contact varchar,
  link varchar(255),
  rank varchar(255),
  city varchar(255),
  country varchar(255),
  judge_id integer,
  entry integer,
  CONSTRAINT show_pkey PRIMARY KEY (id)
);

