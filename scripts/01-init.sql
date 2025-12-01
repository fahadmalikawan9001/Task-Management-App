-- This script creates the initial database schema for TaskFlow
-- Run this script after setting up your Neon or PlanetScale database

-- Create users table
CREATE TABLE "User" (
  id VARCHAR(255) PRIMARY KEY,
  "clerkId" VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  avatar VARCHAR(255),
  theme VARCHAR(50) DEFAULT 'light',
  "notificationsEnabled" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE "Category" (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(7) DEFAULT '#3b82f6',
  "userId" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
  UNIQUE KEY "userId_name" ("userId", name)
);

-- Create tasks table
CREATE TABLE "Task" (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  "dueDate" TIMESTAMP,
  priority VARCHAR(50) DEFAULT 'medium',
  status VARCHAR(50) DEFAULT 'todo',
  "categoryId" VARCHAR(255),
  "userId" VARCHAR(255) NOT NULL,
  tags JSON DEFAULT '[]',
  "order" INT DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY ("categoryId") REFERENCES "Category"(id) ON DELETE SET NULL,
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
  INDEX "userId" ("userId"),
  INDEX "categoryId" ("categoryId"),
  INDEX "status" (status)
);

-- Create comments table
CREATE TABLE "Comment" (
  id VARCHAR(255) PRIMARY KEY,
  content TEXT NOT NULL,
  "taskId" VARCHAR(255) NOT NULL,
  "userId" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY ("taskId") REFERENCES "Task"(id) ON DELETE CASCADE,
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
  INDEX "taskId" ("taskId")
);
