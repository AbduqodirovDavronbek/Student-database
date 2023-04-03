# Student-database
I created a student database using Node.js and Express. The database stores student information such as full name, phone number, email, address, and post index. I used Pug as the view engine to render the pages, and wrote the server-side code to handle GET and POST requests.
For the data storage, I used a JSON file to store the student data. To read and write data to the file, I created a module that handles these operations. Whenever a student is created, updated or deleted, the corresponding data is written to the file.
I also created a form to add new students, and added functionality to edit and delete students. To edit a student's information, I implemented a page with a pre-populated form that displays the student's current information. When the form is submitted, the corresponding student data is updated in the database.
Finally, I deployed the app to Glitch so that it can be accessed online. This required configuring the build command and publish directory, and linking the Glitch to the GitHub repository.

Glitch live link : https://shrub-three-fan.glitch.me
