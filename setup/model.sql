-- initialization (just copy and paste)

-- connect to another db
\c postgres;

-- drop database if exists
drop database if exists megawat;

-- create database look
create database megawat;

-- connect to database look
\c megawat;

create extension if not exists "uuid-ossp";




-- create table branches
drop table if exists branches;
create table branches (
    branch_id uuid default uuid_generate_v4() primary key,
    branch_name character varying(32) not null   unique,
    address character varying(128) not null ,
    branch_created_at timestamptz default current_timestamp
);


CREATE UNIQUE INDEX branch_name
ON branches(branch_name);


-- create table staffs
drop table if exists staffs;
create table staffs(
    staff_id uuid default uuid_generate_v4() primary key,
    staff_name character varying(64) not null unique,
    password character varying(64) not null,
    birth_date date not null,
    gender character varying(10) not null,
    staff_created_at timestamptz default current_timestamp
);

CREATE UNIQUE INDEX staff_name
ON staffs(staff_name);


-- create table branches_staffs
drop table if exists branches_staffs;
create table branches_staffs (
    branche_staff_id uuid default uuid_generate_v4() primary key,
    branch_id uuid references branches(branch_id) not null,
    staff_id uuid references staffs(staff_id) not null
);


-- create table brands
drop table if exists brandes;
create table brandes(
    brand_id uuid default uuid_generate_v4() primary key,
    brand_name character varying(64) not null unique
)
;


CREATE UNIQUE INDEX brand_name
ON brandes(brand_name);


-- create table cars
drop table if exists cars;
create table cars(
    car_id uuid default uuid_generate_v4() primary key,
    car_model character varying(32) not null,
    car_color character varying(32) not null,
    car_img character varying(64) not null,
    car_added_at timestamptz default current_timestamp,
    brand_id uuid references brandes(brand_id) not null, 
    branch_id uuid references branches(branch_id) not null
);


-- create permission_modules table
drop table if exists permission_modules;
create table permission_modules (
    permission_modules_id uuid default uuid_generate_v4() primary key,
    permission_modules_name character varying(24) not null
);


-- create permissions
drop table if exists permissions;
create table permissions (
    permission_id uuid default uuid_generate_v4() primary key,
    permission_name character varying(24) not null
);


-- create staff permissions
drop table if exists staff_permissions;
create table staff_permissions (
    staff_permissions_id uuid default uuid_generate_v4() primary key,
    staff_id uuid not null references staffs(staff_id),
    branch_id uuid not null references branches(branch_id),
    permission_modules_id uuid not null references permission_modules(permission_modules_id),
    permission_id uuid not null references permissions(permission_id)
);










