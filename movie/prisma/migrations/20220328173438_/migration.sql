-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMINISTRATOR', 'USER', 'REVIEWER');

-- CreateEnum
CREATE TYPE "ParentalGuidance" AS ENUM ('GENERAL_AUDIENCE', 'PARENTAL_GUIDANCE_SUGGESTED', 'PARENTAL_STRONGLY_CAUTIONED', 'RESTRICTED');

-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('STANDARD', 'HALF_PRICE', 'FREE', 'PROMOTION');

-- CreateEnum
CREATE TYPE "Room" AS ENUM ('IMAX', 'STANDARD', 'VIP');

-- CreateEnum
CREATE TYPE "SeatStatus" AS ENUM ('BLOCKED', 'AVAILABLE', 'SELECTED', 'BUSY');

-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('STANDARD', 'WHEELCHAIR', 'REDUCED_MOBILITY', 'OVERWEIGHT');

-- CreateTable
CREATE TABLE "Cinema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "rooms" TEXT[],

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionSeats" (
    "id" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "column" INTEGER NOT NULL,
    "type" "SeatType" NOT NULL DEFAULT E'STANDARD',
    "status" "SeatStatus" NOT NULL DEFAULT E'AVAILABLE',
    "sessionId" TEXT,

    CONSTRAINT "SessionSeats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionDate" TIMESTAMP(3) NOT NULL,
    "room" "Room" NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "director" TEXT NOT NULL,
    "parental_guidance" "ParentalGuidance" NOT NULL DEFAULT E'GENERAL_AUDIENCE',
    "thumbnail" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "languages" TEXT[],

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "purchaseDate" TIMESTAMP(3),
    "type" "TicketType" NOT NULL DEFAULT E'STANDARD',
    "paymentStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT E'USER',
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bithDate" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionSeats" ADD CONSTRAINT "SessionSeats_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
