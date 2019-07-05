const keys = require('../config/key')
const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = (app)=>{
    app.post('/api/stripe', async (req,res)=>{

        try {
            const charge = await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                description: '$5 for 5 credits',
                source: req.body.id
            });
            console.log(charge);
        } catch (e) {
            console.log('ERROR ---->',e);
        }


    });



};
