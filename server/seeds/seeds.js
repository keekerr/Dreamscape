const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.deleteMany();

    await User.insertMany([
        {
            username: "john_doe",
            email: "john_doe@example.com",
            password: "password123",
            images: [
                {
                    imageLink: "https://thecatapi.com/api/images/get?format=src&type=png"
                },
                {
                    imageLink: "https://thecatapi.com/api/images/get?format=src&type=png"
                },
                {
                    imageLink: "https://thecatapi.com/api/images/get?format=src&type=png"
                }
            ],
            diaryEntries: [
                {
                    title: "First entry",
                    entry: "This is my first entry in my diary.",
                    createdAt: "2022-01-01T12:00:00.000Z"
                },
                {
                    title: "Second entry",
                    entry: "Today was a great day!",
                    createdAt: "2022-01-02T12:00:00.000Z"
                }
            ]
          },
          {
            username: "jane_doe",
            email: "jane_doe@example.com",
            password: "password456",
            images: [
                {
                    imageLink: "https://thecatapi.com/api/images/get?format=src&type=png"
                },
                {
                    imageLink: "https://thecatapi.com/api/images/get?format=src&type=png"
                },
                {
                    imageLink: "https://thecatapi.com/api/images/get?format=src&type=png"
                }
            ],
            diaryEntries: [
                {
                    title: "Travel diary",
                    entry: "I'm on a trip to Europe!",
                    createdAt: "2022-02-01T12:00:00.000Z"
                },
                {
                    title: "Emotional release",
                    entry: "I need to vent my frustrations.",
                    createdAt: "2022-03-01T12:00:00.000Z"
                }
            ]
        }
    ])

    console.log("users seeded!")
        process.exit(1);
});
