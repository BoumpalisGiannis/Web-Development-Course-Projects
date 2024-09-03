const express = require('express')
const uuid = require('uuid');
const cors = require('cors')

const app = express();
const PORT = 3000;

// User database 
const users = [
    { id: 1, username: 'user1', password: 'password1', fav: [] },
    { id: 2, username: 'user2', password: 'password2', fav: [] },
    { id: 3, username: 'user3', password: 'password3', fav: [] },
    { id: 4, username: 'user4', password: 'password4', fav: [] },
    { id: 5, username: 'user5', password: 'password5', fav: [] }
];

let authenticated_users = []


app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.post('/login', (req, res) => {

    const { username, password } = req.body
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const sessId = uuid.v4()     // Dimioyrgei ton sessionId kwdiko

        if (authenticated_users.length === 0) {
            authenticated_users.push({ username: username, sessionId: sessId })
        }
        if (authenticated_users.length > 0) {                  // if the user is authenticated already
            authenticated_users.forEach(function (obj, index) {

                if (obj.username === username) {
                    obj.sessionId = sessId
                }
            })
        }

        res.json({ success: true, message: 'Login successful', sessionId: sessId })
    } else {
        // 401 status for unauthorization
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

})



app.post("/faveads", (req, res) => {

    const username = req.body.username;
    const sessionId = req.body.sessionId;

    const user = users.find(u => u.username === username);
    authenticated_users.forEach((obj, index) => {

        if (obj.username === username) {            // Check to see if the user is authenticated
            if (obj.sessionId === sessionId) {
                if (user) {
                    

                    res.json(user.fav);
                } else {
                    res.status(404).json({ error: 'User not found' });
                }
            }
        }
    })
}
);



app.post('/favourites/add', (req, res) => {

    const username = req.body.username
    const sessionId = req.body.sessionId
    const fave_adv = {
        id: req.body.id,
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        cost: req.body.cost
    }
    
    authenticated_users.forEach((obj, index) => {

        if (obj.username === username) {            // Check to see if the user is authenticated
            if (obj.sessionId === sessionId) {
                users.forEach((u) => {                 // Checks the users list to add the advertisement to the user's favourite
                    if (u.username === username) {
                        if (u.fav.length === 0) {
                            u.fav.push(fave_adv)
                            res.json({ success: true, message: 'Added the adv successfully' })
                        } else {                        // Checks if the advertisement already exists on the favourite list

                            const synth = u.fav.some(adv => adv.id === req.body.id)
                            if (synth) {
                                res.json({ success: true, message: 'Already added this adv' })
                            } else {
                                u.fav.push(fave_adv)
                                res.json({ success: true, message: 'Added the adv successfully' })
                            }

                        }

                    }
                })

            } else {
                res.json({ success: false, message: 'Failed to add the adv to favs' })
            }
        } else {
            console.log('Not user')
        }
    })


})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});