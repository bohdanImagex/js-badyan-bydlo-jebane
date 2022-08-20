# The next tasks
1. Add ESlint, Prettier and husky to the project (husky should run eslint and prettier before commiting);
2. User management task:
 - Let's create 3 new pages with new folder for assets (js, styles): "login", "user-management" and "admin";
 - You should implement the user management using local storage API;
 - The user object should have the next fields: `firstName, lastName, password, age, position, role (ADMIN | USER) and marker`;
 - You need to add the default admin user using script;
 - On the login page a user should be able to login into system, so there is gonna be a form with fields: First Name, Last Name and Password. After entering the form values and clicking on the "Login" button you should check if in the local storage we have a user with entered data and, if yes - redirect user to the User Management page, if not - put login error;
 - User Management page - on this page a user should be able to edit information about his profile or delete it, so you need to put one more form there and allow to edit all the possible fiedls in the user data (except `role`). Besides form, on that page you also need to put a map (Google map or anything else), and user should be able to put the marker on the map, and you need to save the marker data in the local storage and always show it in the user management page;
 - Admin page - if an admin has signed in in the login form - you should redirect the user to the admin page. On that page a user should be able to see the list with all users in the system, delete them and change their roles (ADMIN or USER).
