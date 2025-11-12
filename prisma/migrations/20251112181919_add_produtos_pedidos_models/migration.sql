/*
  Warnings:

  - You are about to drop the `Categorias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Categorias";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" REAL NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "pedido_produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pedidoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "pedido_produtos_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "pedido_produtos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "pedido_produtos_pedidoId_produtoId_key" ON "pedido_produtos"("pedidoId", "produtoId");
