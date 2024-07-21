-- CreateTable
CREATE TABLE "Token" (
    "id" INTEGER NOT NULL,
    "accesToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);
