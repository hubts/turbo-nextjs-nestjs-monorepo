import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

// Seed
async function main() {}

// Process
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
