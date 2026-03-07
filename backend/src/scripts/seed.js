const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'admin@minierp.com';
    const initialPassword = 'adminpassword123'; // The admin MUST change this on first login
    const hashedPassword = await bcrypt.hash(initialPassword, 10);

    console.log(`Checking for existing admin account: ${adminEmail}...`);

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail }
    });

    if (existingAdmin) {
        console.log(`Admin account '${adminEmail}' already exists. Skipping creation.`);
        process.exit(0);
    }

    console.log(`Creating admin account...`);

    const admin = await prisma.user.create({
        data: {
            email: adminEmail,
            password_hash: hashedPassword,
            role: 'ADMIN',
            must_change_password: false // Set to false so they can log in immediately
        }
    });

    console.log(`\n✅ Admin account created successfully!`);
    console.log(`----------------------------------------`);
    console.log(`Email:    ${admin.email}`);
    console.log(`Password: ${initialPassword}`);
    console.log(`----------------------------------------`);
    console.log(`\nPlease login and change your password immediately.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
