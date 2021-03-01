# Stonkhub

The paper-trading (fake money) social network. Place trades, track your performance, share ideas with others.

**MVP Goals** 

* authentication/authorization
* Place Trade + comment on trade
* Track user’s own performance

**Stretch Goals**  
* lookup other users, view performance, view trades 
* follow other users
* add friend, create and join discussion groups

<!-- **User Stories**

As a user, I want to:
* Place buy and sell orders
* View my fund's performance
* Do  -->
  
* **Daily Sprints** 
  * Plan out your daily goals in advance so you can keep on track with MVP!

    *Exapmle of Daily Sprints*
    - Monday:
      * test API
      * wireframe app
      * plan database ERD
      * plan routes
    - Tuesday:
      * create db models -- test db
      * stub routes -- test routes
      * build routes
    - Wednesday:
      * finish routes
      * create views
    - Thursday:
      * finish views
      * mvp
    - Friday:
      * debug refactor
      * style views
    - Saturday:
      * style views
      * stretch goals
    - Sunday:
      * stretch goals

* **Wireframes**
  - Use a tool like https://awwapp.com/, https://www.mockflow.com/, or good ol zoom whiteboard to create wireframes for your project. Whatever you use, get a screen cap.
  - Your wireframes should walk the reader through the screen states, and should include short descriptions of each screen. It's a good idea to give your wireframes labels (like 1, 2, 3 etc), and to indicate which screens transitions to which other screens.
  - Move your image files into the project folder and link them in your README. (You might want to put all your wireframe images into a single folder called images or assets. In that case you'll have to specify the filepath to those images including the containing folder.) Pro tip: use VScode's markdown previewer!

* **ERDs**
  - you can use [dbdesigner.net](https://app.dbdesigner.net/) or a similar tool plan your database schema. Screengrabs are the quickest way to get your ERDs into your readme!

* **RESTful routing chart** 
  * Can be a table in your readme.md or another spreadsheet. Plan out your routes that go along with the views you wireframed. 
  * _include all the routes your app will need!_

*Example for a simple books app:*

![img](./images/)

| Method | URL | Functionality | view |
|--------|-----|---------------|------|
| GET  | /books | list all books | show books/index.ejs
| POST | /books | add a book | redirect to /books/:id
| GET  | /books/:id | show one book |  show books/detail.ejs
| PUT  | /books/:id | update one book | redirect to /books/:id
| DELETE | /books/:id | delete one book | redirect to /books




## Turning in your pitch
Commit your `README.md` with these components completed, and push to your project repo. Link your project repo in the google classroom assignment for the P2 Pitch.