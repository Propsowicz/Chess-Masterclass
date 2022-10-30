# Chess-Masterclass

Chess Masterclass is an application created to study chess. Content of the website is divided to paid courses and completely free studies which can be shared between users.


Application has been created to learn new technologies and web development tools - the plan was to learn React, authentication system (JWT), payment systems, code testing (unit and integration) and hosting application on web. 

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

The application is designed to be used only by registered users. The main content of website are chess courses which have been divided into four groups, dependent on Premium Plans. Premium Plans are: 
>Free | 0.00$

>Master | 9.99$

>International Master | 19.99$

>Grandmaster | 34.99$

After buying selected Premium Plan, user get a monthly access to a respondent courses. The Courses are created by users who have "creator" permissons.

The other content of the website are free studies which can be created and shared by users. 
Every user can create his own chess study and eventually share it by setting it as a public one.

#### User Managment

The application allows to create user account, edit user's data and help user with forgotten password. Registartion is made via e-mail with activation link and code. The same system is adapted to forgot password service. To edit  password or e-mail address, user need to verify his password. 

Passwords are validated by Django validators. 

All user managment is made in a React components and send via token handlers. Generally flow of user's data between the frontend and the backend is made by JWT.

#### JWT

The main purpose of using JWT is validating user's data (such as login and password) in frontend environment. The second task of JW Tokens is sending user's data (such as current Premium Plan) from the backend to the frontend. Refreshing of tokens are setted up to 5 minutes. User's data is saved in local storage and shared in React environment as Context.

Permission to the content of the application is provided from the backend (by sending respondent data through API) and the frontend (by redirecting user from forbidden pages).

#### Chess Courses and Chess Studies 

The Chess Courses and The Chess Studies are displayed with options of sorting, filtering and searching a specific content. There are also a paginator which dispalys current page of the content. All of this is made thorugh API requests so it works without reloding of the application.  

Chess Studies are divided into the public and the private ones. The user have permisson to visit and display only his own private studies and other's users public studies.
Each new study created by user is private by deafult. After creating the study user needs to wait 5 miuntes till creating another one (it's insurance from overloading database with dump content). 

Created study can be fully edited: a name and a content can be edited in a text are with is loaded when user is creator of study; user can add interactive chessboard, modify it and set is as represantative to whole study; finally user can delete study.

There is an option to like selected courses and studies. Liked content is avaible from special sections in the application.

#### Payment

Payment for Premium Plans is made to dotpay.pl service (sandbox mode is used). Payment service goes as follows:

- After Premium Plan is selected the application creates an order model with data of a operation

- User is redirected to payment webstie - he needs to choose form of payment and actually make it (feel free to do that - it's sandbox). With user's redirection there is also flow of the operation data between the backend and the dotpay server. Besides payment data, operation's signature created by the application is sended.

- In response dotpay service sends back the data with the operation data and the payment signature. Then the signature and data is compared with the signature generated by the application and the data stored in order models. If everything is correct, the backend creates models for an order and changes user's Premium Plan. 

## To do

In future i would like add to live chess game component. There is also an idea of creating library to handle dotpay services.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
