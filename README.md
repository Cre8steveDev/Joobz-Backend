# Joobz - Connecting You with Local Professionals

Joobz is an innovative platform designed to seamlessly connect users with vetted, high-quality professionals and artisans for a wide range of services and errands. Our mission is to revolutionize how people find help, ensuring a smooth, reliable, and secure experience for both service seekers and providers.

## Key Features

- Dual Registration: Users can join as service seekers or freelancers, fostering a dynamic community of both clients and professionals.
- Verified Professionals: All service providers undergo a thorough vetting process, ensuring quality and trustworthiness.
- Secure Transactions: Our platform facilitates safe, transparent financial exchanges between users and freelancers by using an escrow system.
- Wide Service Range: From home repairs, car repairs, skilled services to personal errands, Joobz covers a diverse array of service categories.
- User-Friendly Interface: Intuitive design makes it easy to post jobs, find professionals, and manage bookings.
- Real-Time Communication: In-app messaging allows for clear, direct communication between clients and service providers.

## My Vision

Joobz aims to empower local communities by creating opportunities for skilled professionals while providing convenient, reliable solutions for everyday tasks and specialized services. I am committed to building a platform that values quality, fairness, and user satisfaction above all.

## Project Background

This project represents the culmination of a year-long Software Engineering Bootcamp with ALX Africa. It serves as a practical application of the full-stack development skills acquired during the program, showcasing proficiency in both frontend and backend technologies.

## Repository Contents

This repository contains the codebase for the backend implementation of Joobz, demonstrating expertise in modern development practices and backend development.

I invite you to explore Joobz and experience the future of service networking – where quality meets convenience, and every task finds its perfect match.

![Figma Design of Joobz (Errands and Services) - Designed by Me](image.jpg)

## AUTHOR

- Stephen Omoregie
- <cre8stevedev@gmail.com>
- <https://cre8stevedev.me>
- <https://linkedin.com/stephen-omoregie>
- Twitter: @Cre8steveDev

## Technology

- Node/ExpressJS
- Typescript
- MongoDB

## Productivity Tools

Thank you for providing the detailed information about your Express.js app routes and controllers. I'll create documentation for the main endpoints you've shared. Here's a draft of the documentation you can include in your README:

## API Documentation

## Authentication

All endpoints relating to Authentication Listed under this heading are prefixed with `/api/auth`.

Most endpoints require authentication. Include the JWT token in the Authorization header:

```javscript

Authorization: Bearer <your_token_here>

```

## Endpoints

### User Registration

- **URL**: `/signup/user`
- **Method**: `POST`
- **Description**: Register a new user account
- **Request Body**:

  ```json
  {
    "fullName": "string",
    "email": "string",
    "phoneNumber": "string",
    "password": "string",
    "state": "string",
    "country": "string"
  }
  ```

- **Success Response**:
  - **Code**: 201
  - **Content**: `{ "success": true, "message": "User Account created successfully." }`
- **Error Response**:
  - **Code**: 400, 409, or 403
  - **Content**: `{ "success": false, "message": "Error message" }`

### Freelancer Registration

- **URL**: `/signup/freelancer`
- **Method**: `POST`
- **Description**: Register a new freelancer account
- **Request Body**:

  ```json
  {
    "fullName": "string",
    "email": "string",
    "phoneNumber": "string",
    "password": "string",
    "state": "string",
    "country": "string"
  }
  ```

### User/Freelancer Sign In

- **URL**: `/signin`
- **Method**: `POST`
- **Description**: Authenticate a user or freelancer
- **Request Body**:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- **Success Response**:

  - **Code**: 200
  - **Content**:

    ```json
    {
      "success": true,
      "message": "Logged in Successfully.",
      "auth": {
        "token": "string",
        "tokenExpiry": "number"
      },
      "user": {
        // User or Freelancer data
      }
    }
    ```

- **Error Response**:
  - **Code**: 400 or 500
  - **Content**: `{ "success": false, "message": "Error message", "auth": null, "user": null }`

### Verify OTP

- **URL**: `/verify-otp`
- **Method**: `POST`
- **Description**: Verify the One-Time Password for account activation

### Renew OTP

- **URL**: `/renew-otp`
- **Method**: `POST`
- **Description**: Request a new One-Time Password

### Refresh Token

- **URL**: `/refresh-token`
- **Method**: `GET`
- **Description**: Get a new access token
- **Authentication**: Required

### Get User Profile Data

- **URL**: `/get-user-profile-data`
- **Method**: `POST`
- **Description**: Retrieve user profile data for dashboard
- **Authentication**: Required

### Get Freelancer Profile Data

- **URL**: `/get-freelancer-profile-data`
- **Method**: `POST`
- **Description**: Retrieve freelancer profile data for dashboard
- **Authentication**: Required (Freelancer only)

### Update User Location

- **URL**: `/update-location`
- **Method**: `POST`
- **Description**: Update user's location information

### Update Freelancer Location

- **URL**: `/update-freelancer-location`
- **Method**: `POST`
- **Description**: Update freelancer's location information

### Update User Profile

- **URL**: `/update-user-profile`
- **Method**: `POST`
- **Description**: Update user's profile information

### Get Wallet

- **URL**: `/get-wallet`
- **Method**: `GET`
- **Description**: Retrieve user's wallet information
- **Authentication**: Required

### Update Wallet

- **URL**: `/update-wallet`
- **Method**: `POST`
- **Description**: Update user's wallet information
- **Authentication**: Required

### Get API Key

- **URL**: `/get-api-key`
- **Method**: `GET`
- **Description**: Retrieve Paystack API key for payments
- **Authentication**: Required
- **Success Response**:
  - **Code**: 200
  - **Content**: `{ "apiKey": "string" }`

### Create New Job

- **URL**: `/create-new-job`
- **Method**: `POST`
- **Description**: Create a new job tied to the user's account
- **Authentication**: Required
- **Request Body**:

  ```json
  {
    "job": {
      "title": "string",
      "description": "string",
      "category": "string",
      "budget": "number",
      "skills": "string (comma-separated)",
      "state": "string",
      "pictures": "array",
      "deadline": "date"
    }
  }
  ```

- **Success Response**:
  - **Code**: 201
  - **Content**: `{ "success": true }`
- **Error Response**:
  - **Code**: 403
  - **Content**: `{ "success": false }`

### Get All Jobs by User

- **URL**: `/all-by-user`
- **Method**: `GET`
- **Description**: Retrieve all jobs created by the authenticated user
- **Authentication**: Required
- **Success Response**:

  - **Code**: 200
  - **Content**:

    ```json
    {
      "success": true,
      "jobs": [
        {
          // Job object
        }
      ]
    }
    ```

- **Error Response**:
  - **Code**: 500
  - **Content**: `{ "success": false, "jobs": null }`

### Get Single Job Data

- **URL**: `/job-data`
- **Method**: `POST`
- **Description**: Retrieve detailed data for a single job
- **Authentication**: Required
- **Request Body**:

  ```json
  {
    "jobId": "string"
  }
  ```

- **Success Response**:

  - **Code**: 200
  - **Content**:

    ```json
    {
      "success": true,
      "job": {
        // Detailed job object including (filtered client)
        //and proposals data
      }
    }
    ```

- **Error Response**:
  - **Code**: 500
  - **Content**: `{ "success": false, "job": null }`
