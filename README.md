# Chess-Masterclass

Chess Masterclass is an application created to study chess. The content of the website is divided into paid courses and completely free studies which can be shared between users.


The application has been created to learn new technologies and web development tools - the plan was to learn React, authentication system (JWT), payment systems, code testing and hosting application on web. 

Here is a link to the application (it can take some time to load it) [Chess Masterclass](https://chess-masterclass.onrender.com).


## Table of content

[Technologies](#technologies)

[Description](#description)

[To do](#to-do)

[Contributing](#contributing)

[License](#license)

## Technologies

![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)

![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

## Description

The application is designed to be used only by registered users. The main content of the website are chess courses which have been divided into four groups, depending on the Premium Plans. The Premium Plans are: 
>Free | 0.00$

>Master | 9.99$

>International Master | 19.99$

>Grandmaster | 34.99$

After purchasing the selected Premium Plan, the user receives monthly access to the respective level courses and the courses from the levels below. The Courses are created by the users who have the "creator" permissons.

The remaining content of the website is free studies that can be created and shared by the users.
Every user can create his own chess study and eventually share it by setting it as a public one.

#### User Managment

The application allows for creating user accounts, edit the user's data and help the user with forgotten password. The registartion is made via an e-mail with an activation link and code. The same system is adapted to forgotten password service. 

The passwords are validated by Django validators. 

All user managment is made in React components and send via token handlers. Generally, the flow of the user's data between the frontend and the backend is made by JWT.

#### JWT

The main purpose of using JWT is validating the user's data (such as login and password) in the frontend environment. The second task of JW Tokens is sending the user's data (such as current Premium Plan) from the backend to the frontend. Refreshing of tokens are setted up to 5 minutes. The user's data is saved in a local storage and shared in the React environment as Context.

A permission to the content of the application is provided from the backend (by sending the respective data through API) and the frontend (by redirecting the user from the forbidden pages).

#### Chess Courses and Chess Studies 

The Chess Courses and The Chess Studies are displayed with options of sorting, filtering and searching a specific content. There are also a paginator which displays the current page of the content. All of this is made through API requests so it works without reloding of the application.  

The Chess Studies are divided into the public and the private ones. The user have a permisson to visit and display only his own private studies and other users' public studies.
Each new study created by the user is private by deafult. After creating the study, the user needs to wait 5 miuntes till creating another one (it is an insurance from overloading database with a dump content). 

The created study can be fully edited. A name and a content can be edited in a textarea which is loaded when the user is the creator of study. The user can add an interactive chessboard, modify it and set is as represantative to the whole study. Finally, the user can delete the study.

There is an option to like selected courses and studies. The liked content is available from special sections in the application.

#### Payment

The payment for Premium Plans is made by dotpay.pl service (sandbox mode is used). Payment service goes as follows:

- After the Premium Plan is selected, the application creates an order model with the data of the operation

- The user is redirected to the payment webstie - he needs to choose the form of the payment and actually make it (feel free to do that - it is a sandbox). With the user's redirection, there is also a flow of the operation data between the backend and the dotpay server. In addition to the payment data, an operation signature created by the application is sent.

- In response, the dotpay service sends back the data with the operation data and the payment signature. Then the signature and data are compared with the signature generated by the application and the data stored in the order model. If everything is correct, the backend creates models for a payment and changes user's Premium Plan.

#### Frontend

The frontend was created almost entirely in React. React Router was used to manage the application urls. User's data was shared between React components via Context Provider. Every main component of the application was made mainly in RESTful API technology provided by DRF. 

For HTML and CSS, Bootstrap was mainly used with a few changes made to fit the interface better.

#### Tests

For each Django application, proper tests were made. The units test was made to check the correctness of executing single methods and classes. The integration tests was made to check action of REST - a lot of tests simulated a request from the frontend, saving the data in a test database and sending a response with new data back to the frontend. 

## To do

In the future, I would like to add live chess game service. There is also an idea of creating library to handle dotpay services.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
