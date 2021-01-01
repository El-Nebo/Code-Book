create schema NyZaKa;


/* 
Assertions:
in Documentations: Writer must be developer
Article: Writer must be developer 

ALL Day and Hour constraints
Group Owner and admins must be developers

Team Members mush be students

Problem: Writer must be developer

Make contest: writer must be developer 


*/

create table NyZaKa.Users (
Handle      varchar(100)   NOT NULL ,
Acsess      varchar(100)   NOT NULL ,
E_mail      varchar(100)   NOT NULL ,
Password_   varchar(80)   NOT NULL ,
Fname       varchar(80)   NOT NULL ,
Lname       varchar(80)   NOT NULL ,
Rate_max    int           NOT NULL ,
Rate_cur    int           NOT NULL ,
PRIMARY KEY  (Handle)       );


create table NyZaKa.Contest (
Contest_ID    char(3)       NOT NULL ,
Day_          int           NOT NULL ,
Hour_         int           NOT NULL ,
Duration      int           NOT NULL ,
PRIMARY KEY  (Contest_ID)       );


create table NyZaKa.Documentation (
ID       		 	int        NOT NULL AUTO_INCREMENT,
DocName         char(50)  NOT NULL ,
Topic      			varchar(20)     NOT NULL ,
Statment      		varchar(1000)     NOT NULL ,
Doc_date     			date         	NOT NULL ,
Writer       	varchar(100)        NOT NULL ,
foreign key  (Writer) REFERENCES users (Handle) ,
PRIMARY KEY  (ID)       );



create table NyZaKa.Articles (
ID        int       NOT NULL AUTO_INCREMENT,
ArtName       char(50)  NOT NULL,
Topic      varchar(20)     NOT NULL ,
Statment      varchar(1000)          NOT NULL ,
Art_date     date         NOT NULL ,
Writer       varchar(100)        NOT NULL ,
foreign key  (Writer) REFERENCES users (Handle) ,
PRIMARY KEY  (ID)       );

create table NyZaKa.Groups_ (
Name_        varchar(20)       NOT NULL ,
Owner_       varchar(100)     NOT NULL ,
Admins_       varchar(100)          NOT NULL ,
foreign key  (Owner_) REFERENCES users (Handle) ,
foreign key  (Admins_) REFERENCES users (Handle) ,
PRIMARY KEY  (Name_)       );

create table NyZaKa.Teams (
Name_         varchar(20)       NOT NULL ,
Team_Rate_max    int           NOT NULL ,
Team_Rate_cur    int           NOT NULL ,
Member1       varchar(100)     NOT NULL ,
Member2       varchar(100)          NOT NULL ,
Member3       varchar(100)          NOT NULL ,
foreign key  (Member1) REFERENCES users (Handle) ,
foreign key  (Member2) REFERENCES users (Handle) ,
foreign key  (Member3) REFERENCES users (Handle) ,
PRIMARY KEY  (Name_)       );






create table NyZaKa.Friends (
Follower       varchar(100)       NOT NULL ,
Followee       varchar(100)       NOT NULL ,
foreign key  (Follower) REFERENCES users (Handle) ,
foreign key  (Followee) REFERENCES users (Handle) ,
PRIMARY KEY  (Follower ,Followee )       );




create table NyZaKa.Group_Members (
Name_        varchar(40)       NOT NULL ,
User_       varchar(100)       NOT NULL ,
foreign key  (User_) REFERENCES users (Handle) ,
foreign key (Name_) REFERENCES Groups_  (Name_),
PRIMARY KEY  (Name_ ,User_ )       );



create table NyZaKa.Participate (
Contest_ID        char(3)       NOT NULL ,
Participant       varchar(100)       NOT NULL ,
Score        int       NOT NULL ,
foreign key  (Contest_ID) REFERENCES Contest (Contest_ID) ,
foreign key  (Participant) REFERENCES users (Handle) ,
PRIMARY KEY  (Contest_ID ,Participant )       );

create table NyZaKa.Team_Participate (
Contest_ID        char(3)       NOT NULL ,
Team_Participant       varchar(20)       NOT NULL ,
Score        int       NOT NULL ,
foreign key  (Contest_ID) REFERENCES Contest (Contest_ID) ,
foreign key  (Team_Participant) REFERENCES Teams (Name_) ,
PRIMARY KEY  (Contest_ID ,Team_Participant )       );

create table NyZaKa.Make_Contest (
Contest_ID      char(3)       NOT NULL ,
Writer       varchar(100)       NOT NULL ,
foreign key  (Contest_ID) REFERENCES Contest (Contest_ID) ,
foreign key  (Writer) REFERENCES users (Handle) ,
PRIMARY KEY  (Contest_ID ,Writer )       );


create table NyZaKa.Problem (
Problem_ID  int       NOT NULL AUTO_INCREMENT,
Contest_ID  char(3)       ,
Topic       varchar(20)   ,
NameProblem varchar(20)   NOT NULL ,
writer      varchar(100)   NOT NULL ,
input       varchar(1000)   NOT NULL ,
output      varchar(1000)   NOT NULL ,
statment    varchar(1000)   NOT NULL ,
score       int          NOT NULL ,
Difficultiy int            ,
foreign key  (Contest_ID) REFERENCES Contest (Contest_ID) ,
foreign key  (writer) REFERENCES users (Handle) ,
PRIMARY KEY  (Problem_ID)       );

create table NyZaKa.Submissions (
ID				char(10) NOT NULL,
Contest_ID        char(3)       NOT NULL ,
Problem_ID  int      NOT NULL,
User_      varchar(100)          NOT NULL ,
Time_     date         NOT NULL ,
Output       varchar(20)        NOT NULL ,
Status_       varchar(20)        NOT NULL ,
foreign key  (Problem_ID) REFERENCES Problem (Problem_ID) ,
foreign key  (Contest_ID) REFERENCES Contest (Contest_ID) ,
foreign key  (User_) REFERENCES users (Handle) ,
PRIMARY KEY  (ID)       );


create table NyZaKa.Team_Submissions (
ID				char(10) NOT NULL,
Contest_ID        char(3)       NOT NULL ,
Problem_ID     int     NOT NULL ,
Team_Name      varchar(20)          NOT NULL ,
Time_     date         NOT NULL ,
Output       varchar(20)        NOT NULL ,
Status_       varchar(20)        NOT NULL ,
foreign key  (Problem_ID) REFERENCES Problem (Problem_ID) ,
foreign key  (Contest_ID) REFERENCES Contest (Contest_ID) ,
foreign key  (Team_Name) REFERENCES Teams (Name_) ,
PRIMARY KEY  (ID)       );



