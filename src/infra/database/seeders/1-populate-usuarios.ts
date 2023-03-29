import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';

export default {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert('usuarios',[
            {
                nome:"Clayton Rodrigues",
                email:"clayton@admin.com",
                senha:bcrypt.hashSync("123456", 10),
                fone:"(66)9 9240-3712",
                tipo:"1",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },
    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete('usuarios', {}, {});
    }
}