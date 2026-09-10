-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('WEB', 'MOBILE', 'AI_ML', 'ROBOTICS');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "ProjectCategory" NOT NULL,
    "technologies" TEXT[],
    "features" TEXT[],
    "lessonsLearned" TEXT[],
    "challenge" TEXT,
    "solution" TEXT,
    "thumbnail" TEXT,
    "images" TEXT[],
    "videoUrl" TEXT,
    "githubUrl" TEXT,
    "liveUrl" TEXT,
    "uptime" TEXT,
    "loadTime" TEXT,
    "performanceScore" TEXT,
    "deploymentStatus" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
