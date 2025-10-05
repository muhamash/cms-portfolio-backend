# Portfolio CMS Backend

## 1. Overview

This backend powers a portfolio content management system (CMS) for
managing personal, project, and blog data. It provides secure APIs built
with Express.js, TypeScript, Prisma ORM, and PostgreSQL, ensuring
scalability and data integrity.


-   Personal Information Management with Images
-   Project Showcase with Multiple Images
-   Blog System with Rich Content
-   Work Experience and Education Management
-   Skills and Social Media Links
-   JWT Authentication with Secure Cookies
-   Cloudinary Integration for Image Upload
-   Prisma ORM with PostgreSQL
-   Zod-based Input Validation

##  Features

### Content Management
- **Personal Information Management**: Create and update personal profile information including bio, contact details, and profile images
- **Project Portfolio**: Full CRUD operations for showcasing projects with multiple image uploads
- **Blog System**: Complete blogging platform with rich content management and image support
- **Work Experience**: Track and display professional work history with detailed descriptions
- **Education History**: Manage educational background and qualifications
- **Skills Management**: Organize technical and soft skills for portfolio display

### Homepage Customization
- **Dynamic Header**: Customizable homepage header with personal branding
- **Header Skills**: Highlight key skills prominently on the homepage
- **Statistics Showcase**: Display achievement metrics and statistics
- **Social Media Integration**: Manage social media links and professional profiles

### Security & Authentication
- **JWT-based Authentication**: Secure access control using JSON Web Tokens
- **Cookie-based Sessions**: Refresh token management with HTTP-only cookies
- **Protected Routes**: Authentication middleware for sensitive operations
- **Password Encryption**: Bcrypt hashing for secure password storage

### File Management
- **image Upload**: Support for  image uploads per resource
- **Cloudinary Integration**: Cloud-based image storage and optimization
- **Multer Processing**: Efficient file handling and validation

### Data Validation
- **Zod Schema Validation**: Type-safe request validation
- **Input Sanitization**: Protection against malicious data inputs
- **Type Safety**: Full TypeScript support for enhanced development experience

### API Features
- **RESTful Architecture**: Standard REST conventions for predictable endpoints
- **CORS Support**: Configurable cross-origin resource sharing
- **Error Handling**: Global error handling with descriptive messages
- **Request Parsing**: JSON and URL-encoded body parsing

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Image Storage**: Cloudinary
- **Security**: bcrypt, cookie-parser, cors

## Prerequisites

Before installing the Portfolio CMS Backend, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn package manager
- PostgreSQL database (v12 or higher)
- Cloudinary account for image storage

## 🔧 Installation Guide

### 1. Clone the Repository

```bash
git clone <repository-url>
cd portfolio-cms-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Authentication Secrets
AUTH_SECRET="your-auth-secret-key"
ACCESS_TOKEN_SECRET="your-access-token-secret"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"

# Bcrypt Configuration
BCRYPT_SALT="10"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Server Configuration (Optional)
PORT=5000
NODE_ENV="development"
```

### 4. Database Setup

Initialize and migrate the database schema:

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Start the Server

For development:
```bash
npm run dev
```

For production:
```bash
npm run build
npm start
```

##  API Endpoints

### Personal Information
- `GET /v1/page/get-personal-info` - Retrieve personal information
- `POST /v1/page/create-personal-info` - Create personal profile (Protected)
- `PATCH /v1/page/update-personal-info/:id` - Update personal information (Protected)

### Social Links
- `POST /v1/page/create-social-links` - Add social media link (Protected)
- `PATCH /v1/page/update-social-links/:id` - Update social link (Protected)
- `DELETE /v1/page/delete-social-links/:id` - Remove social link (Protected)

### Skills
- `POST /v1/page/create-skill` - Add new skill (Protected)
- `PATCH /v1/page/update-skill/:id` - Update skill (Protected)
- `DELETE /v1/page/delete-skill/:id` - Delete skill (Protected)

### Homepage
- `GET /v1/page/get-home-page` - Retrieve homepage data
- `POST /v1/page/create-home-page` - Create homepage content (Protected)
- `PATCH /v1/page/update-home-page/:id` - Update homepage (Protected)

### Header Skills
- `POST /v1/page/create-header-skill` - Add header skill (Protected)
- `PATCH /v1/page/update-header-skill/:id` - Update header skill (Protected)
- `DELETE /v1/page/delete-header-skill/:id` - Remove header skill (Protected)

### Statistics
- `POST /v1/page/create-header-stats` - Create statistics (Protected)
- `PATCH /v1/page/update-header-stats/:id` - Update statistics (Protected)
- `DELETE /v1/page/delete-header-stats/:id` - Delete statistics (Protected)

### Work Experience
- `POST /v1/page/create-experience` - Add work experience (Protected)
- `PATCH /v1/page/update-experience/:id` - Update experience (Protected)
- `DELETE /v1/page/delete-experience/:id` - Delete experience (Protected)

### Education
- `POST /v1/page/create-education` - Add education record (Protected)
- `PATCH /v1/page/update-education/:id` - Update education (Protected)
- `DELETE /v1/page/delete-education/:id` - Delete education (Protected)

### Projects
- `POST /v1/projects/create-project` - Create new project (Protected)
- `GET /v1/projects/get-project/:id` - Get project by ID
- `GET /v1/projects/all-projects` - Get all projects
- `PATCH /v1/projects/update-project/:id` - Update project (Protected)
- `DELETE /v1/projects/delete-project/:id` - Delete project (Protected)

### Blogs
- `POST /v1/blogs/create-blog` - Create blog post (Protected)
- `GET /v1/blogs/get-blog/:id` - Get blog by ID
- `GET /v1/blogs/all-blogs` - Get all blogs
- `PATCH /v1/blogs/update-blog/:id` - Update blog post (Protected)
- `DELETE /v1/blogs/delete-blog/:id` - Delete blog post (Protected)

## Authentication

Protected routes require authentication via JWT tokens. Include the access token in the Authorization header:

```
Authorization: Bearer <your-access-token>
```

The system uses a dual-token approach:
- **Access Token**: Short-lived token for API requests
- **Refresh Token**: Long-lived token stored in HTTP-only cookies for token renewal

##  File Upload

The API supports image uploads for projects, blogs, and personal information. Images are processed through Multer and stored in Cloudinary for optimal performance and CDN delivery.

Supported formats: JPG, JPEG, PNG, GIF
Maximum file size: Configurable in Multer settings

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:3001`
- `https://cms-portfolio-with-resume-builder.vercel.app`

Credentials are enabled for cookie-based authentication.

##  Error Handling

The application includes comprehensive error handling:
- **Global Error Handler**: Catches and formats all application errors
- **404 Handler**: Returns appropriate responses for undefined routes
- **Validation Errors**: Detailed Zod validation error messages
- **Authentication Errors**: Clear JWT and authorization error responses

##  Security Features

- Input validation on all endpoints
- SQL injection protection via Prisma ORM
- XSS protection through input sanitization
- Rate limiting ready infrastructure
- Secure password hashing with bcrypt
- HTTP-only cookies for refresh tokens
- CORS policy enforcement

##  Deployment Recommendations

### Environment Considerations
- Set `NODE_ENV` to `production`
- Use strong, unique secrets for JWT tokens
- Enable HTTPS/SSL certificates
- Configure proper CORS origins
- Set up database connection pooling
- Implement rate limiting middleware
- Add request logging for monitoring


### File Storage
- Cloudinary automatic image optimization



## 🤝 Support

For questions or issues regarding setup and configuration, please refer to the documentation or contact the development team.

---

Built with using TypeScript, Express.js, and Prisma