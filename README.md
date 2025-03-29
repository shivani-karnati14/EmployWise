# EmployWise
The React User Management App is a web-based application that facilitates user authentication and management. It integrates with the Reqres API to enable features such as login authentication, user listing with pagination, profile updates, and deletion. The application follows a structured, token-based authentication system using localStorage for session management.

Features

1. User Authentication

Users can log in using their email and password.

Authentication is handled via the /login.js endpoint.

Upon successful login, a token is stored in localStorage, and the user is redirected to the user dashboard.

2. User List

Fetches and displays a paginated list of users from the /users?page={page} at UserList.js endpoint.

Each user is presented in a card format, displaying their name, email, and profile picture.

Pagination controls allow easy navigation through user records.

3. User Management

Users can update their details, including first name, last name, and email.

User details are edited through a dialog form and updated via the /users/{id} endpoint.

Users can also be deleted from the list via the/users/{id} endpoint.

Confirmation dialogs ensure actions are intentional, and toast notifications provide feedback.

I used this A React application for user management with authentication, built with:
React.js
Tailwind CSS
React Router
Axios
React Hot Toast (for important notifications)'
and these are the 

features :
User authentication (login/logout)
Paginated user listing
User search and filtering
Edit/delete user functionality
Responsive design

Authentication is done using the Token which are  stored in localStorage , No refresh token implementation is done and Session persists until logout or token expiration

