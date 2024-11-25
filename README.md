<div align="center">
  <h1 align="center">Devbook</h1>

  <h3 align="center">Social Media for Developers</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🔗 [Links](#links)

## <a name="introduction">🤖 Introduction</a>

A social media frontend built with Next.js 14+. Create and manage your account, update your profile, make friends, and share posts with other users.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React
- Next.js
- TypeScript
- TailwindCSS
- Zustand State Management
- JSON Webtoken Authentication
- Next.js Server Actions and Mutations
- React Hook Form Handling
- Zod Input Validation

## <a name="features">🔋 Features</a>

👉 **Authentication**: Email and password authentication using JSON Webtoken stored in cookies and validated on the server. Users can create accounts, log in, reset their passwords with email recovery, and update their passwords when logged in. Users are redirected from private and public routes depending on authentication status.

👉 **User Profile**: Create and modify current user profile. Manage information such as bio, education, experience, and add Github repository urls to display your repositories.

👉 **Posts**: Create, update, delete, and like user posts.

👉 **Nested Comments**: Leave comments on both posts and other comments.

👉 **Feeds**: View personal feed on authenticated home page and other user feeds on their user pages. Posts loaded on scroll.

👉 **Contacts**: Add or remove contacts. Contact posts will appear along current user posts in current user feed.

👉 **Site Search**: Search users in global site search input to view their user pages and find contacts.

👉 **Feed Page**: Home page for authenticated users. Create, update, and delete posts, catch up on follower activity, and create comments for any post.

👉 **Comments Page**: Dynamic route for each post displaying the post's comments. Navigate nested comments with ease and effortlessly modify your own comments and replies.

👉 **User Page**: Dynamic user page for each individual user. Feed functionality extends here.

👉 **Profile Page**: User profile pages for showcasing information and enabling modification of profile settings.

👉 **State Management**: Manage client state for expanded client functionality such as focusing inputs and submitting forms through refs, and loading content on scroll.

👉 **Fully Typed**: Exhaustively typed with separate npm package for consistency between frontend and backend.

👉 **Data Validation with Zod**: Data integrity with data validation using Zod with separate npm package for consistency between frontend and backend.

👉 **Github Integration***: Github API utilized to fetch repositories for view on profile page.

👉 **Form Management with React Hook Form**: Efficient management of forms with React Hook Form for a streamlined user input experience.

👉 **Blazing-Fast Performance**: Optimal performance and instantaneous page switching for a seamless user experience.

👉 **Server Side Rendering**: Utilize Next.js with Server Side Rendering for enhanced performance and SEO benefits.

👉 **Middleware, API Actions, and Authorization**: Utilize middleware, API actions, and authorization for robust application security.

👉 **Next.js Layout Route Groups**: New Next.js layout route groups for efficient routing

👉 **Theming**: Switch between light and dark themes saved per user session. CSS architecture designed with variables for easy theme creation.

## <a name="links">🔗 Links</a>

[linkedin](https://www.linkedin.com/in/vkastanenka/): View Victoria's professional profile.
[devbook-node](https://github.com/vkastanenka/devbook-node): Backend repository built with Node.js 22+.
[devbook-prisma](https://github.com/vkastanenka/devbook-prisma): Prisma ORM utilized by both frontend and backend.
[devbook-types](https://github.com/vkastanenka/devbook-types): Typescript types used throughout both frontend, backend, and validation.
[devbook-validation](https://github.com/vkastanenka/devbook-validation): Zod validation schemas used throughout both frontend and backend.