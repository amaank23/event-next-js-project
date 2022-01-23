import { connectToDb, insertIntoDB } from '../../helpers/db';


async function handler(req, res){
    let client;
    try {
        client = await connectToDb();
    } catch (err) {
        res.status(500).json({ message: 'Could not connect to the database', error: err.message });
        return;
    }
    if(req.method === 'POST'){
        const { email } = req.body;

        if(!email || !email.includes('@')){
            // error 422 means invalid data
            res.status(422).json({ message: 'Invalid Email Address' });
            return;
        }

        try {
            await insertIntoDB('newsletter', { email: email }, client);
        } catch (err) {
            res.status(500).json({ message: 'Could not insert the data into the database', error: err.message });
            return;
        }
        // The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource.
        res.status(201).json({ message: 'Signed Up' })
    }
}


export default handler;