const db = require('../config/connection');
const { Diary } = require('../models');
const { User } = require('../models');
const { VisionBoard } = require('../models');

db.once('open', async () => {
    try {
        // Create a new diary entry
        const newDiaryEntry = await Diary.create({
            title: 'My New Entry',
            content: 'This is my new diary entry',
            userId: 1
        });

        // Find a user by ID
        const user = await User.findByPk(1);

        // Create a new vision board
        const newVisionBoard = await VisionBoard.create({
            title: 'My Dream Car',
            description: 'A Lamborghini Aventador',
            imageUrl: '',
            userId: 1
        });

        // Update a diary entry
        const diaryEntryToUpdate = await Diary.findByPk(1);
        diaryEntryToUpdate.title = 'Updated Entry Title';
        diaryEntryToUpdate.content = 'Updated entry content';
        await diaryEntryToUpdate.save();

        // Delete a vision board
        const visionBoardToDelete = await VisionBoard.findByPk(1);
        await visionBoardToDelete.destroy();

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});
