'use strict'

const Config = use('Config')
const Stripe = use('stripe')(Config.get('stripe.secret_key'))

class CheckoutController {
  async checkout({response, session, view, request, params}) {
    let lineItems = []
    // 1. retrieve cart from react
    // let data = request.get()
    // let cart = JSON.parse(data.cart)
    let rawCart = decodeURIComponent(params.cartitems)
    let cart = JSON.parse(rawCart)
    console.log("CART:", cart)
    // 2. create line items
    for(let cartItem of cart) {
      lineItems.push({
        name: cartItem.foodName,
        amount: cartItem.price,
        quantity: cartItem.quantity,
        currency:'SGD'
      })
    }
    console.log("LINE ITEMS:", lineItems)
    //let metaData = JSON.stringify(Object.values(cart))
    let metaData = JSON.stringify(cart)
    console.log("METADATA:", metaData)
    //console.log(metaData)
    // 3. create payment
    const payment = {
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: Config.get('stripe.success_url') + '?sessionId={CHECKOUT_SESSION_ID}',
      cancel_url: Config.get('stripe.error_url'),
      metadata: {
        'orders': metaData
      }
    }
    // 4. register payment
    let stripeSession = await Stripe.checkout.sessions.create(payment)
    console.log("STRIPE SESSION:", stripeSession)
    //response.route('processCheckout')
    return view.render('checkout/checkout', {
      'sessionId':stripeSession.id, // Id of the session
      'publishableKey':Config.get('stripe.publishable_key')
    })
  }

  processPayment({request, response}) {
    // reason for using request.raw() instead of request.post():
    // request.post() will return an object which isn't what we need
    let payload = request.raw()
    let endpointSecret = Config.get('stripe.endpoint_secret')
    let sigHeader = request.header("stripe-signature")
    // console.log("SIGHEADER: ", sigHeader)
    let event = null
    // below is to verify with stripe that they are the one who process this request
    try {
      event = Stripe.webhooks.constructEvent(payload, sigHeader, endpointSecret)
    } catch(error) {
      response.send({
        'error':e.message
      })
    }
    // verified that event.type = 'checkout.session.completed
    // not sure why unable to reach site
    // sometimes, payment status is succeed sometimes fail, not sure why
    console.log("EVENT: ", event)
    console.log("EVENT TYPE: ", event.type)
    if (event.type == 'checkout.session.completed') {
      // what is this stripe session for?
      // what to do after that???
      //console.log("EVENT DATA OBJECT:", event.data.object)
      //let stripeSession = event.data.object
      //console.log("STRIPE SESSION:", stripeSession)
      // i need event.data.object.metadata to save in my cart controller
      //console.log("MY ORDERS: ", JSON.parse(stripeSession.metadata))
      // i also need to save event.data.object.id which is stripe payment id
      //console.log("SESSION ID: ", stripeSession.id)
      // lastly, redirect back to react??? if i can do it?
      //console.log(stripeSession)
    }
    //process stripe session
    response.json({received:true})
  }
}

module.exports = CheckoutController


