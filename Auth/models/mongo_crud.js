const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

async function connectToDb(){
    const client = new MongoClient(process.env.STRING_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }); 
    try{
        await client.connect();
        
        return client;
    }
    catch(err){
        return err;
    }
}

async function getAllBlogsRecord(){
    const client = await connectToDb();
    try{
        // Iterating data via cursors --
        // const searchCursor = await user.find();
        // // console.log(await searchCursor.hasNext());

        // while(await searchCursor.hasNext()){
        //     console.log(await searchCursor.next());
        // }

        const collections = client.db('Blogs').collection('user');
        const results = await collections.find().toArray();
        return results;
    }
    catch(ex){
        console.error(`Got error : "${ex}"`);
    }
    finally{
        client.close();
        console.log(`Db client closed`);
    }
}

module.exports = { getAllBlogsRecord };