// MongoClient is the object to access MongoDB
//const MongoClient = require('mongodb').MongoClient;

const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({secret: 'secret',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 1000}
}));
app.use(function (req, res, next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
})

const url = 'mongodb+srv://dbUser:dbUserPassword@cluster0.jrier.mongodb.net/dbshop?retryWrites=true&w=majority';
const UserModel = require('./User');
const CartModel = require('./Cart');
const StoreModel = require('./Store')


//constructor like in java/c++, constructing a new instance of the javascript class however, not frequently used
//const client = new MongoClient(url, { useNewUrlParser: true });

//db name
const dbName = `dbshop`;

let database;

const config = {
    headers: {
        'X-API-Key': '21b31e4169d94900ac948630615a86a2'
    }
}


// await must be wrapped into an async function
const initDataBase = async () => {
    database = await mongoose.connect(url);
    if (database) {
        console.log('Connected to database successfully');
    } else {
        console.log('Error connecting to the database');
    }
}

const initUsers = async () => {
    const users = [];
    const firstNames = await axios.get('https://randommer.io/api/Name?nameType=firstName&quantity=30', config);
    const lastNames = await axios.get('https://randommer.io/api/Name?nameType=surName&quantity=30', config);
    i = 0;
    index = 500;
    firstNames.data.forEach((firstName, index) => {
        const newUser = {
            firstName: firstName,
            lastName: lastNames.data[index],
            email: firstNames.data[index] + '@gmail.com',
            password: lastNames.data[index] + i++,
            cartID: index++

        }
        users.push(newUser);
    })

    await UserModel.create(users);
}

const initStoreItems = async () => {
    const storeItems = [];
    const itemNames = await storeItems.create([
        {itemName: 'Apple', itemQuantity: '20'},
        {itemName: 'Orange', itemQuantity: '45'},
        {itemName: 'Avocado', itemQuantity: '41'},
        {itemName: 'Carrots', itemQuantity: '22'},
        {itemName: 'Dragon Fruit', itemQuantity: '43'},
        {itemName: 'Strawberries', itemQuantity: '24'},
        {itemName: 'Raspberries', itemQuantity: '40'},
        {itemName: 'Watermelon', itemQuantity: '19'},
        {itemName: 'Cantaloupe', itemQuantity: '17'},
        {itemName: 'Guava', itemQuantity: '28'},
        {itemName: 'Celery', itemQuantity: '37'},
        {itemName: 'Kale', itemQuantity: '33'},
    ]);
    itemNames.forEach((itemName, itemQuantity) => {
        const newStoreItem = {
            itemName: itemName,
            itemQuantity: itemQuantity
        }
        storeItems.push(newStoreItem);
    })

    await StoreModel.create(storeItems);
}

/*const initCarts = async () => {
    const carts = [];
    const users = await UserModel.find({});

    cartIDs.data.forEach((cartID) => {
        const assignedUser = users[Math.floor(Math.random()*users.length)];
        const selectedItems = users.cartID.data
        const newCart = {
            user: assignedUser,
            cartItems: selectedItems
        }
        users.push(newUser);
    })

    await UserModel.create(users);
}*/

const populateDB = async () => {
    //deleteMany commented out to keep db populated
    //await UserModel.deleteMany({});
    //await StoreModel.deleteMany({});
    await initUsers();
    await initStoreItems();
}

//lets you pull results from a mongoDB
const readDB = async () => {
    const collection = database.collection('collectionExample');
    const docs = await collection.find({}).toArray();
    console.log(`Found the following records: ${JSON.stringify(docs)}`);
}

const init = async () => {

    //creates connection
    await initDataBase();
    //populates databse
    //await populateDB();
    //reads database
    await readDB();
}

init();


//GET USER INFORMATION GIVEN THE ID
app.get('/user', async (req, res) => {
    const foundUsers = await users.find({_id:req.params.id});

    res.send(foundUsers ? foundUsers : 404);
});


//CREATE A NEW USER
app.post('/user', (req, res) => {
    const result = User.create(req.body);

    res.send(result);
});


//GET USER'S CART
app.get('/users/:userID/cart', (req, res) => {
    const foundCart = users.find().populate('cart');

    res.send(foundUsers ? foundUsers : 404);
});


//EMPTIES THE USER'S CART
app.delete('/user/:userID/cart', (req, res) => {
    const user = userInfo.findById((parseFloat(req.params.id)));
    const foundItemsIndex = storeItems.indexOf(foundItems);

    cartUser = cartItems.findById(user.cartID);
    cart.cartItems = [];

    res.send(foundItems || 404);

});


//ADDS ITEM TO CART
app.post('/cart/:cartID/cartItem', async (req, res) => {
    const foundCarts = await users.find({_id:req.params.cartID});
    if(cart){
        let item = cart.cartItems.findById((parseFloat(req.params.itemID)));

        if (item > 0){
            let incrementQuantity = cart.cartItems[item];
            incrementQuantity.itemQuantity = cartQuantity;
            cart.cartItems[item] = incrementQuantity;
        }
        else{
            cart.cartItems.push(newCartItem);
        }
    }
});


//DELETES AN ITEM FROM CART
app.delete('/cart/:cartID/cartItem/cartItemID', (req, res) => {
    const foundItems = cartItems.findById((parseFloat(req.params.id)));
    const foundItemsIndex = cartItems.indexOf(foundItems);
    cartItems.splice(foundItemsIndex, 1);

    res.send(foundItems || 404);

})


//GET STORE ITEM'S DETAILS
app.get('/storeItem/:itemID', async (req, res) => {
    res.send(storeItems);
});


//GET ALL ITEMS THAT SATISFY THE QUERY
app.get('/storeItems', async (req, res) => {
    let foundItems = await sampleStoreItems;
    if(req.query.itemName){
        foundItems = foundItems.filter((storeItems) => {
            return storeItems.itemName.includes(req.query.itemName);
        });
    }

    if(req.query.itemID){
        foundItems = foundItems.filter((storeItems) => {
            return storeItems.itemID.includes(req.query.itemID);
        })
    }

    res.send(foundItems || 404);
});

app.listen(8080);
