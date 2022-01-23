import { connectToDb, getFromDb, insertIntoDB } from '../../../helpers/db';

async function handler(req, res){
    
    const { eventId } = req.query;
    let client;
    try {
        client = await connectToDb();
    } catch (err) {
        res.status(500).json({ message: 'Could not connect to the database', error: err.message });
        return;
    }
    if(req.method === 'POST'){
        const { email, name, text } = req.body;
        if(!email || !name ||name.trim() === '' || !text || text.trim() === ''){
            res.status(400).json({ message: 'Some Fields are Missing' });
            return
        }

        if(!email.includes('@')){
            res.status(422).json({ message: 'Invalid Data Found' });
            return
        }

        const commentObject = {
            name,
            email,
            text,
            eventId
        }

        try {
            const res = await insertIntoDB('comments', commentObject, client);
            commentObject._id = res.insertedId;
        } catch (err) {
            res.status(500).json({ message: 'Could not insert the data into the database', error: err.message });
            return;
        }


        res.status(201).json({ message: 'Comment Successfully Created!!', insertedData: commentObject });
    }

    if(req.method === 'GET'){
        try {
            const data = await getFromDb('comments', { eventId: eventId }, client);
            res.status(201).json({ comments: data });
        } catch (err) {
            res.status(500).json({ message: 'Could not get the data required', error: err.message });
        }
    }
}

export default handler