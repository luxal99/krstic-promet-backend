create table article_category
(
	id int auto_increment
		primary key,
	title varchar(64) not null
);

create table article_sub_category
(
	id int auto_increment
		primary key,
	title varchar(64) not null,
	id_article_category int null,
	constraint article_sub_category_ibfk_1
		foreign key (id_article_category) references article_category (id)
);

create index id_article_category
	on article_sub_category (id_article_category);

create table conversion
(
	id int auto_increment
		primary key,
	conversion_from_value int null,
	conversion_from_unit varchar(64) null,
	conversion_to_value double null,
	conversion_to_unit varchar(64) null
);

create table user
(
	id int auto_increment
		primary key,
	username varchar(64) not null,
	password varchar(64) not null
);

create table warehouse
(
	id int auto_increment
		primary key,
	name varchar(128) null,
	created_date timestamp default CURRENT_TIMESTAMP null
);

create table article
(
	id int auto_increment
		primary key,
	name varchar(64) not null,
	created_date timestamp default CURRENT_TIMESTAMP null,
	code varchar(64) not null,
	purchase_price double not null,
	selling_price double not null,
	amount int not null,
	debit double default ((`purchase_price` * `amount`)) not null,
	id_article_sub_category int null,
	id_warehouse int null,
	id_conversion int null,
	constraint code
		unique (code),
	constraint article_ibfk_1
		foreign key (id_article_sub_category) references article_sub_category (id),
	constraint article_ibfk_2
		foreign key (id_warehouse) references warehouse (id),
	constraint article_ibfk_3
		foreign key (id_conversion) references conversion (id)
);

create index id_article_sub_category
	on article (id_article_sub_category);

create index id_conversion
	on article (id_conversion);

create index id_warehouse
	on article (id_warehouse);

