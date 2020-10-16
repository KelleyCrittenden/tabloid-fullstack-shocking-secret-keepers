# Tabloid - Fullstack

## We have two sprints to implement a production ready Tabloid application.

Good news, everyone, our [Tabloid CLI Proof of Concept](https://github.com/nashville-software-school/TabloidCLI) did it's job!

This application is a multi-user web application built utilizing JS, React library, and C# with ASP.NET Core Web API; it allows users to write posts and share them with other users, comment on these posts in order to discuss them with fellow users.

Tabloid Fullstack has two types of users:

Authors can create Posts, manage their own Posts, and read and comment on other authors' posts.

Admins can do all the things authors can do, but are also in charge of managing all the data in the system (they will be the only ones to have access to tag, category, and user profile management).

## Installation

1. In the terminal, git clone git@github.com:nss-day-cohort-41/tabloid-fullstack-shocking-secret-keepers.git
2. open Visual Studio and select to open the pertinent file
3. Open SQL Server Object Explorer
4. Go to Solution Explorer
5. Click Folder icon and change it to 'Folder View'
6. From the SQL Folder click `01_Tabloid_Create_DB.sql`
7. Click Run
8. Click `02_Tabloid_Seed_Data.sql` to populate the database
9. Click Run
10. Click Run Tabloid
11. cd into client directory
12. Install your dependencies by running `npm install` from the same directory as your `package.json` file
13. once installed, `npm start` (this will automatically open a webpage in your browser)
14. Click the `Register` button
15. If registration is successful, the application will take you to the homepage and you will be greeted with 'hello'

### Getting Started with Authentication/Authorization with Firebase for Admin Users

1. The owner/admin of this project should create their own Firebase project. Please follow the following instructions:

   - Go to [Firebase](https://console.firebase.google.com/u/0/) and add a new project. You can name it whatever you want (Tabloid is a good name)
   - Go to the Authentication tab, click "Set up sign in method", and enable the Username and Password option.
   - Your users will register on the Tabloid app and you can keep track of their authentication information with Firebase.
   - Once firebase creates a UID for these users, the UserProfile table in SQL Server database should be automatically updated and each user will have their own unique `FirebaseUserId`.
   - As admin, you can keep track of who is admin and who is author. In the database, the UserTypeId will be 1 for admin and 2 for author.
   - Click the Gear icon in the sidebar to go to Project Settings. You'll need the information on this page for the next few steps

2. Go to the `appSettings.Local.json.example` file. Replace the value for FirebaseProjectId with your own

3. Rename the `appSettings.Local.json.example` file to remove the `.example` extension. This file should now just be called `appSettings.Local.json`

4. Open your `client` directory in VsCode. Open the `.env.local.example` file and replace `__YOUR_API_KEY_HERE__` with your own firebase Web API Key

5. Rename the `.env.local.example` file to remove the `.example` extension. This file should now just be called `.env.local`

## Usage

**Post View**

- This page is a list of ALL user's posts; users will be able to view the title, image, author, category of the post, and publish date of the post

1. User can add a post by clicking `New Post`
2. Note that users can choose not to specify a category and if not specified, it will appear as "other" for that post
3. View post details by clicking the `Details` button
4. If the user is the author of the post, they can edit and delete only their own posts by clicking the `Edit` icon and/or `Delete` button, respectively

**Post Details**

- This page is a detailed view of the respective post the user selects; users will be able to view everything aforementioned as well as an estimated read time and the contents of the post. Users will also be able to view the tags that are attached to the post.

1. Add a comment to the selected post by clicking `Add Comment`
2. View a list of comments attached to this post by clicking `View Comments`
3. Add tags to the post by clicking `Add Tag`
4. Delete tags from the post by clicking `Delete Tag`
5. If the user is the author of the post, they will also be able to edit and delete the post by clicking on the `Edit` icon and/or `Delete` icon, respectively

**Add Tags**
To add more than one tag, hold down CTRL and select the tags you wish to associate with the post and click `Add Tags`

**Delete Tags**
To delete more than one tag, hold down CTRL and select the tags you wish to delete from the post and click `Delete Tags`

**Comments List**

- This page will list all the comments associated with the user's selected post; users will be able to see the author of the post, subject, comment, and date written for the comment

1. The user can edit and delete comments by clicking the the `Edit` icon and/or `Delete` icon, respectively

**My Posts View**

- This page is a list of all the posts written by the user that is logged in; you can add a post by clicking `Add Post`

1. View post details by clicking the `Details` button
2. Edit and delete posts by clicking the the `Edit` icon and/or `Delete` icon, respectively

## Technologies Used

1. JavaScript
2. React Library
3. C# with ASP.NET Core Web API
4. Microsoft SQL Server Express

## Authors and Acknowledgment

Our group consisted of Kelley Crittenden, Tyler Hilliard, Brett Stoudt, and Sisi Freeley. Thank you to everyone in the group for working, communicating, and troubleshooting so well together! You guys are all awesome!

### ERD

[Tabloid ERD]("https://github.com/nss-day-cohort-41/tabloidmvc-the-lobster-rolls/blob/master/Tabloid.png")
