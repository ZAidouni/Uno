const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const createError = require("http-errors");


exports.getCheckoutSession = async (req,res,next)=>{
    console.log(`${process.env.CLIENT_APP}/paiement-success`)
    try {
        console.log("checkout session function");

        // 2) Create chckout session 
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            success_url : `${process.env.CLIENT_APP}/paiement-success`,
            cancel_url : `${process.env.CLIENT_APP}/profile`,
            customer_email : req.user.email,

            // what was sent in the request so that we can get it back in the last step of workflow regarding paiments (see diagram)
            client_reference_id : req.user._id,

            // se use that tu specify some additionnal details
            line_items : [
                {
                    price_data : {
                        //the amount is in cents
                        currency : 'eur', 
                        unit_amount : 5 * 100,

                        product_data  : {
                            name : "Abonnement Premium",
                            description : "Créez autant de parties que vous voulez !",
                            images : [	'https://www.natours.dev/img/tours/tour-3-cover.jpg'],
                        },                      
                    },
                    quantity : 1 //
                }
            ],
            mode : 'payment'

        });
        console.log("session : ", session);
        // 3) create session as response 
        res.status(200).json({
            status : 'success',
            session
        })
    } catch (error) {
        console.log(error);
        return next(createError(500));
    }
    

};