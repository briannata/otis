# OTIS (Occupancy Tracking Integration System)

MERN stack web application for tracking building occupancy using Computer Vision and Machine Learning; deployed on Heroku using AWS

## `Goal`

Our goal was to automate the occupancy tracking process to free up the services of employees and make a more efficient way of reserving your spot in line, without actually waiting for it.

## `Basic Design`

### `Occupancy Tracking`

Our python application takes input from a raspberry pi’s webcam and processes the pixel velocities using OpenCV to determine whether the customers are leaving or entering the store. Based on this determination, our application updates the occupancy on our MongoDB database.

### `Reservations`

Our web application contains a front end form that takes input from the user (phone number, how many people, and how long they plan to stay). Once the user submits their data, the data is sent to the database which is integrated with a Twilio notification system. For an optimal user friendly experience, our webpage is accessible via QR code.

## `Project Pipeline`

1. Takes webcam input and determines whether people are entering or exiting
2. Updates database with current occupancy
3. Takes form input to make reservations if the occupancy is maxed out
4. SMS notification system takes phone number information from the database and messages the user
5. Computer vision algorithm checks in with the raspberry pi and updates the database

## `Occupancy Tracking Algorithm`

### `Machine Learning`

Using an OpenCV convolutional neural network, the application identifies customers from the live camera feed and wraps their location in a 'trackable object'. 

### `Computer Vision`

Using a correlation tracker, the generated trackable objects, are followed from frame to frame. With the average of all previous frames we can compute the direction of the subject and update the occupancy database accordingly. 

## `Web Application`

A full stack web application with React.js on the front end and Node.js and Express on the back end. The web app is also integrated with a MongoDB database.

###  `Front End`

The React.js application renders the current occupancy of the store which is pulled from the MongoDB database. We also render a form that will reserve your spot in line for you (if the maximum occupancy is reached). We perform form validation by checking whether the values match our RegEx expressions.

### `Back End`

Using Node.js and Express.js, we established a MongoDB Atlas Database using mongoose. Express processes the database schema while Node.js runs the server and establishes the connection with the database, allowing us to upload, change, and update data through our router js files.

## `Databases`

### `Customer Database`

Our first MongoDB database collection contains the user’s form information (phone number, number of people, stay length, and whether they need wheelchair or child support). The database also records timestamps for when it was submitted which we used to determine the order of the line.

### `Occupancy Database`

Our second MongoDB database contains information on each store (location name, current occupancy, and maximum occupancy). The current occupancy is updated each time someone enters or exits.

## `SMS Notifications`

Our Python application uses Twilio’s API to send notifications to the users about their place in line and when they can enter.

A first notification will be sent right after they submit their reservation. Users will also receive updates when they are 2nd in line, 1st in line, and when they can enter the store. Lastly, they will receive a confirmation notification after they’ve entered, thanking them for their patience.

## `Accessibility`

Our web application implements a responsive design and mobile first development for an optimal, user-friendly experience. It is easily accessible by QR code scanning.

## `Future Features To Be Developed`

1. Expand our project’s capabilities to be able to handle multiple retail sites
2. Create tool for designing and printing custom PDFs with store name, QR code, and any pictures or ads 
3. More computer vision, make sure people are wearing masks
4. Revise our computer vision and machine learning algorithm to handle multiple ingress/egress for one site
5. Create interactive chatbot that allows users to update their reservation (change number of people or stay length) and other advanced chatbot features
6. Implementing a speaker system so to inform users to make a reservation if the store is at maximum capacity
