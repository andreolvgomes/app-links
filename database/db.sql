create database database_links;

use database_links;

-- user table
create table users(
    id int(11) not null,
    username varchar(16) default '' not null,
    password varchar(60) default '' not null,
    fullname varchar(100) default '' not null
);

alter table users
    add primary key (id);

alter table users
    modify id int(11) not null auto_increment, auto_increment = 2;

--describe users;

-- links tables
create table links (
    id int(11) not null,
    title varchar(150) default '' not null,
    url varchar(255) default '' not null,
    description text,
    user_id int(11),
    created_at timestamp default current_timestamp not null,

    constraint fk_user foreign key (user_id) references users(id)
);

alter table links
    add primary key (id);

alter table links
    modify id int(11) not null auto_increment, auto_increment = 2;