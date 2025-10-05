# Portfolio CMS Backend Documentation

## 1. Overview

This backend powers a portfolio content management system (CMS) for
managing personal, project, and blog data. It provides secure APIs built
with Express.js, TypeScript, Prisma ORM, and PostgreSQL, ensuring
scalability and data integrity.

## 2. Features

-   Personal Information Management with Images
-   Project Showcase with Multiple Images
-   Blog System with Rich Content
-   Work Experience and Education Management
-   Skills and Social Media Links
-   JWT Authentication with Secure Cookies
-   Cloudinary Integration for Image Upload
-   Prisma ORM with PostgreSQL
-   Zod-based Input Validation

## 3. Technology Stack

  Technology   Purpose
  ------------ ----------------------
  Node.js      Backend Runtime
  Express.js   Web Framework
  TypeScript   Type Safety
  Prisma       ORM for Database
  PostgreSQL   Relational Database
  Zod          Schema Validation
  Multer       File Upload Handling
  Cloudinary   Image Storage
  JWT          Authentication
  Bcrypt       Password Hashing

## 5. Setup Guide

1.  Clone the repository: git clone
    https://github.com/yourusername/portfolio-cms-backend.git cd
    portfolio-cms-backend

2.  Install dependencies: npm install

3.  Configure environment: cp .env.example .env

4.  Set up the database: npx prisma generate npx prisma migrate dev

5.  Start the development server: npm run dev

## 6. API Overview

All endpoints are prefixed with `/v1/`.

  Module     Base Path      Description
  ---------- -------------- ---------------------------------------------
  Pages      /v1/pages      Manage personal info, skills, and education
  Projects   /v1/projects   Manage portfolio projects
  Blogs      /v1/blogs      Manage blog posts

Protected routes require authentication using JWT in HTTP-only cookies.

## 7. Security and Validation

-   JWT Authentication with HTTP-only Cookies
-   Password Hashing (Bcrypt)
-   Zod-based Input Validation
-   CORS restricted to trusted origins
-   SQL Injection Protection (Prisma ORM)
-   Global Error and 404 Handlers

## 8. Deployment

Recommended platforms: Railway, Render, or Vercel.

1.  Set NODE_ENV=production
2.  Update DATABASE_URL and Cloudinary credentials
3.  Run: npx prisma migrate deploy
4.  Start with: npm start
