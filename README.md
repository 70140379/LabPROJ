# GlowGears - E-Commerce Website

## Documentation Related to Your Project

GlowGears is an e-commerce platform developed using React, Firebase, and Vite for optimal performance and modern user experience. It features a rich UI/UX, and functionalities such as product browsing, category browsing, shopping cart, user authentication, and role-based access for admins and users.

### Technologies Used:
- **React**: Frontend framework for building the user interface.
- **Firebase**: Used for authentication, Firestore database.
- **Vite**: Next-gen bundler and development server for fast builds.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For client-side routing.
- **Firestore**: NoSQL database to store products, users, and categories.
- **Firebase Authentication**: Secure user login and signup.

## How CRUD Works

### Product Management
- **Create**: Admin users can add new products using the Admin Dashboard.
- **Read**: Products are fetched from Firestore in real-time and displayed on the homepage and shop category pages.
- **Update**: Admin users can update product details such as name, price, image, and description.
- **Delete**: Admins can delete unwanted products from the platform.

### Category Management
- **Create**: Admin users can add new categories to the platform.
- **Read**: Categories are fetched from Firestore and displayed on the shop page for browsing.
- **Update**: Admin users can modify existing categories.
- **Delete**: Admins can delete categories, and products within a deleted category will be handled accordingly.

### Cart Management
- **Create**: Users can add products to the cart.
- **Read**: The cart is stored in local storage and displayed in the "Cart" section.
- **Update**: Users can update the quantity of items in the cart.
- **Delete**: Users can remove items from the cart.

## How Roles Are Managed

Roles are managed via Firebase Authentication and Firestore. When a user registers, their role is determined as **user** by default and saved in the Firestore `users` collection. Admins are assigned the role `admin` in the Firestore `users` collection.

### Role-based Access:
- **Admin Role**: Admins have access to the Admin Dashboard where they can manage products and categories.
- **User Role**: Regular users can browse products, add them to the cart, and manage their account settings.

### Role Management Process:
- **Sign up**: Users are registered via Firebase Authentication, and their roles are saved in Firestore.
- **Role Checking**: When a user logs in, their role is checked, and the UI is dynamically adjusted based on whether they are an admin or a normal user.

## Admin Credentials (If Needed)

**Admin Login Credentials**:
- Admin users are granted **Admin** access based on their role saved in Firestore.
- The default role is **user**; to set the user as an admin, an admin user must update the user's role in Firestore directly.

Alternatively, you can also modify user roles manually from the Firestore console if needed.

**Default Admin Login Details**:
- Username: `admin@gg.pk`
- Password: `admin123`

## Deployed Link

The project is deployed using **Firebase Hosting** and can be accessed at:

[**Deployed Website Link**](https://labproject-6d69b.web.app/)
