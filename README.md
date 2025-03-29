# EmployWise
The React User Management App is a web-based application that facilitates user authentication and management. It integrates with the Reqres API to enable features such as login authentication, user listing with pagination, profile updates, and deletion. The application follows a structured, token-based authentication system using localStorage for session management.

Features

1. User Authentication

Users can log in using their email and password.

Authentication is handled via the /api/login endpoint.

Upon successful login, a token is stored in localStorage, and the user is redirected to the user dashboard.

2. User List

Fetches and displays a paginated list of users from the /api/users?page={page} endpoint.

Each user is presented in a card format, displaying their name, email, and profile picture.

Pagination controls allow easy navigation through user records.

3. User Management

Users can update their details, including first name, last name, and email.

User details are edited through a dialog form and updated via the /api/users/{id} endpoint.

Users can also be deleted from the list via the /api/users/{id} endpoint.

Confirmation dialogs ensure actions are intentional, and toast notifications provide feedback.
