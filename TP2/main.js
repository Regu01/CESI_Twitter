// Définition des constantes
const { faker } = require('@faker-js/faker');
const dataBase = require('../database');
const NUMBER_OF_STUDENTS = 100; // Nombre d'étudiants à générer
const student = [];
faker.locale = "fr";



// Génération des données fictives et insertion dans la collection
for (let i = 0; i < NUMBER_OF_STUDENTS; i++) {
    student.push({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        gender: faker.helpers.arrayElement(['male', 'female']),
        country: faker.address.country(),
        birthdate: faker.date.between('1990-01-01', '2002-12-31'),
        grades: generateGrades(),
        university: {
            name: faker.company.companyName(),
            private: faker.datatype.boolean(),
            address: {
                street: faker.address.streetAddress(),
                city: faker.address.city(),
                zip: faker.address.zipCode(),
                country: faker.address.country(),
            },
        },
    });
}

// Fonction qui génère 10 notes aléatoires entre 0 et 20
function generateGrades() {
    const grades = [];

    for (let i = 0; i < 10; i++) {
        grades.push(faker.datatype.number({ min: 0, max: 20 }));
    }

    return grades;
}


//add data to students collection
dataBase.InputUser('students', student);