const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const metaFetcher = require('meta-fetcher');
const fileUpload = require('express-fileupload');
const { ref, uploadBytes, getDownloadURL, getStorage } = require("firebase/storage");
require("firebase-functions/logger/compat");

const { query, collection, where, getDocs, updateDoc, doc, arrayUnion, getFirestore, getDoc } = require("firebase/firestore");
const { initializeApp } = require("firebase/app");
const firerbaseApp = initializeApp({
    apiKey: "AIzaSyDigrmCQJbzxe6ABTLoiwnEYh6_GYex9y8",
    authDomain: "vacaat-bd757.firebaseapp.com",
    projectId: "vacaat-bd757",
    storageBucket: "vacaat-bd757.appspot.com",
    messagingSenderId: "871529471149",
    appId: "1:871529471149:web:135c5093c38a944fc9fa24",
    measurementId: "G-STTW7PM5KS"
});

const db = getFirestore(firerbaseApp)
const storage = getStorage(firerbaseApp)

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests

const stripe = require('stripe')('sk_test_51Ju4mHHeaB2VBegSMgieVMVyeTAgKbqvqb3MTEqDp931Z2oeS7l6Der5Vs0894dfMNylUtqAQbDnPJIpy2jVCQRf00enpfcc4t');
const YOUR_DOMAIN = 'http://localhost:3000';

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

let endpointSecret = 'whsec_1YuH0TN8JYgpMoKipLQkDiCZw7NXKLHy'
app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        console.log(err)
        return;
    }
    // Handle the event
    switch (event.type) {
        case 'customer.created':
            try {

                const customer = event.data.object;
                console.log(customer, event)
                // Then define and call a function to handle the event payment_intent.succeeded
                const q = query(collection(db, 'users'), where('email', '==', customer.email));
                const snapshot = await getDocs(q);
                let data = [];
                snapshot.forEach((el) => {
                    data.push(el.data())
                });
                const userRef = doc(db, 'users', data[0].uid)
                await updateDoc(userRef, {
                    customerId: customer.id
                })
            } catch (error) {
                console.log(error)
            }
            break;
        // ... handle other event types
        case 'customer.subscription.created':
            try {

                const sub = event.data.object;
                const customer = await await stripe.customers.retrieve(
                    sub.customer
                );


                const q = query(collection(db, 'users'), where('email', '==', customer.email));
                const snapshot = await getDocs(q);
                let data = [];
                snapshot.forEach((el) => {
                    data.push(el.data())
                });
                const userRef = doc(db, 'users', data[0].uid)
                await updateDoc(userRef, {
                    subscriptionId: sub.id
                });

            } catch (error) {
                console.log(error)
            }
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

app.use(express.json());

app.get('/fetchUrl', async (req, res) => {
    try {
        const { metadata } = await metaFetcher(req.query.url);

        res.json({
            "success": 1,
            "meta": {
                "title": metadata.title,
                "description": metadata.description,
                "image": {
                    'url': metadata.banner
                }
            }
        })
    } catch (err) {
        res.status(404).json({
            message: 'Erorr'
        })
    }
}); 6

app.post('/uploadFile', async (req, res) => {
    console.log(req.files)
    const storageRef = ref(storage, req.files.image.name);
    uploadBytes(storageRef, req.files.image.data).then(async (snapshot) => {
        const url = await getDownloadURL(snapshot.ref)

        res.json({
            "success": 1,
            "file": {
                "url": url
                // ... and any additional fields you want to store, such as width, height, color, extension, etc
            }
        })
    });
});




app.post('/create-checkout-session', async (req, res) => {
    try {

        const session = await stripe.checkout.sessions.create({
            customer_email: req.body.user.email,
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: 'price_1M3HFtHeaB2VBegSWLdHPvzI',
                    // For metered billing, do not pass quantity
                    quantity: 1,

                },
            ],
            mode: 'subscription',
            success_url: `${YOUR_DOMAIN}/success?session_id=${`session.id`}`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });
        res.json({
            url: session.url
        })
    } catch (err) {
        console.log(err)
    }

});

app.post('/create-customer-portal-session', async (req, res) => {
    // Authenticate your user.

    try {
        const { customerId } = req.body
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: 'http://localhost:3000/billing',
        });
        res.status(200).json({ url: session.url });
    } catch (err) {
        console.log(err)
    }

});


app.post('/update-subscription', async (req, res) => {


    try {
        const { subscriptionId, uid } = req.body;
        const q = query(collection(db, 'properties'), where('createdBy', '==', uid));
        const snapshot = await getDocs(q);
        let data = [];
        snapshot.forEach((el) => {
            data.push(el.data())
        });

        const subs = await stripe.subscriptions.retrieve(
            subscriptionId
        );

        await stripe.subscriptions.update(
            subscriptionId,
            {
                items: subs.items.data.map((si) => ({
                    id: si.id,
                    quantity: data.length

                }))

                ,
            }
        );

        res.status(200).json({
            message: "Successfully updated",

        })
    } catch (err) {
        console.log({ err })
        res.status(400).json({
            message: "something went wrong",
            error: JSON.stringify(err)
        })
    }

});

app.get('/get-subscription', async (req, res) => {


    try {
        const { subscriptionId } = req.query;

        const subs = await stripe.subscriptions.retrieve(
            subscriptionId
        );

        res.status(200).json({
            data: subs,

        })
    } catch (err) {
        console.log({ err })
        res.status(400).json({
            message: "something went wrong",
            error: JSON.stringify(err)
        })
    }

});

const getUpdateFunc = async (catagory, guideId) => {
    const ref = doc(db, 'catagories', catagory.id);
    return updateDoc(ref, {
        guideSelected: catagory.guideSelected
    })
}
app.post('/update-catagory', async (req, res) => {

    const { selectedCatagories, guideId } = req.body
    try {
        const ref = selectedCatagories.map((el) => getUpdateFunc(el, guideId));

        await Promise.all(ref)
        res.status(200).json({
            message: "successful",
        })
    } catch (err) {
        console.log({ err })
        res.status(400).json({
            message: "something went wrong",
            error: JSON.stringify(err)
        })
    }

});

const getUpdateGuideFunc = (guide, propertyId) => {
    const ref = doc(db, 'guides', guide);
    return updateDoc(ref, {
        selectedProperties: arrayUnion(propertyId)
    })
}
app.post('/update-guides', async (req, res) => {

    const { selectedGuides, catagories, propertyId } = req.body;
    try {
        const ref = selectedGuides.map((el) => getUpdateGuideFunc(el, propertyId));
        console.log(catagories, propertyId)
        const catRef = catagories.map((el) => {

            const ref = doc(db, 'catagories', el.id);
            return updateDoc(ref, {
                propertiesSelected: arrayUnion(propertyId)
            })
        });

        await Promise.all(ref);
        await Promise.all(catRef);
        res.status(200).json({
            message: "successful",
        })
    } catch (err) {
        console.log({ err })
        res.status(400).json({
            message: "something went wrong",
            error: JSON.stringify(err)
        })
    }

});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);