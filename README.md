# Social Media App
Social media app with user authenication where users can add and delete posts, likes, and comments. Users can view or edit their own profile as well as monitor notifications from likes, comments and follows.

## Live Demo
**Deployed on Vercel**: [Social Hub](https://social-hub-ashen.vercel.app/)

### Purpose
The purpose of this project was deepen my understanding of NEXT.js and full-stack development. This project was an oppourtunity to learn and practice building a social app with posts, comments, and likes. 

## Features
- **Text and Image Posts**: Users can create posts with text and/or images. Used [uploadthing](https://uploadthing.com/) to store image uploads. 
- **User Authenication**: Users can login/sign up using their Google accounts. For this project I used [Clerk](https://clerk.com/) to simplify user authenication.
- **Database**: User information such as posts, likes, and comments stored on PostgreSQL database.  PostgreSQL database hosted on [Neon](https://neon.tech/).

### Home Page
- If you are not logged in, you will see a login button.
- Login is authenticated using clerk and Google account.

![socialhub-screenshot](https://github.com/user-attachments/assets/d553b747-e604-40a0-a533-cada9b586ece)

*Unauthenticated home page*

![Screenshot_2025-02-06_09-42-42](https://github.com/user-attachments/assets/c07e63e8-ecb6-4b20-81d0-d814f8053d82)

*Login modal*

### Logged In
- Once you are logged in you will see your user details.

![Screenshot_2025-02-06_09-43-20](https://github.com/user-attachments/assets/b586048c-73e5-460c-a003-76e4efec065a)

*Logged in home page*

![Screenshot_2025-02-06_09-46-48](https://github.com/user-attachments/assets/4199d620-7eaa-4b36-ab4e-d1b1c31c3378)

*Dark mode*

### Recommended Users
- The recommended users section will suggest users that you are not following.

![Screenshot_2025-02-06_09-54-55](https://github.com/user-attachments/assets/4b77317d-9da5-45c1-884e-55e6b63bc3c1)

*Suggested user*

### Like, Comment, Post
- To see comments, toggle comments view by clicking the comment icon.
- To like a user's post click the heart icon.
- Users can delete their own posts by clicking the trash icon

![Screenshot_2025-02-06_09-52-48](https://github.com/user-attachments/assets/b9556bbb-5e59-4af1-9774-4c9d9fe6e9e5)

*Expanded view*

### Notification Page
- Notifications such as likes, comments and follows can be seen.

![Screenshot_2025-02-06_09-44-12](https://github.com/user-attachments/assets/c26b83e5-2bbd-4d66-90f6-100a2fdee3c8)

### Profile Page
- You can view your own profile or view another user's profile by clicking on their name.

![Screenshot_2025-02-06_09-44-32](https://github.com/user-attachments/assets/77debfd4-9139-49af-966d-20f23232461f)

*Viewing own profile*

![Screenshot_2025-02-06_09-56-09](https://github.com/user-attachments/assets/c644a616-6800-46c0-82e8-0a4d092e26ff)

*Viewing another user's profile*

- In the profile section you can see posts and liked posts of that user.

![Screenshot_2025-02-06_09-44-55](https://github.com/user-attachments/assets/1d40fa00-2dd2-43c0-b504-d428b055bd93)

*User posts*

![Screenshot_2025-02-06_09-45-21](https://github.com/user-attachments/assets/77aa1be3-5598-4a6b-aa91-78b15dc6a789)

*Users liked posts*

### Edit user profile
- Users can edit their own profile by clicking the edit profile button on their profile page.

![Screenshot_2025-02-06_09-45-44](https://github.com/user-attachments/assets/eadd4124-7ce2-4e77-b09c-72a800db1f28)

![Screenshot_2025-02-06_09-46-09](https://github.com/user-attachments/assets/6e0d064c-203b-46c2-9a3d-c3080cbba230)

*Edit profile modal*

![Screenshot_2025-02-06_09-46-23](https://github.com/user-attachments/assets/e46ce5ee-2951-4759-8976-2027961c6aee)

*Updated profile details*



## Technology Stack
- **NEXT.js**
- **React**
- **TypeScript**
- **Tailwind CSS** and **shadcn/ui**
- **Prisma** ORM
