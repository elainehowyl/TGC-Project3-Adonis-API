'use strict'

const Config = use('Config')
const Stripe = use('stripe')(Config.get('stripe.secret_key'))

class CheckoutController {
  async checkout({view, params}) {
    let lineItems = []
    // 1. retrieve cart from react
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
    let metaData = JSON.stringify(cart)
    console.log("METADATA:", metaData)
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
    let event = null
    // below is to verify with stripe that they are the one who process this request
    try {
      event = Stripe.webhooks.constructEvent(payload, sigHeader, endpointSecret)
    } catch(error) {
      response.send({
        'error':e.message
      })
    }
    console.log("EVENT: ", event)
    console.log("EVENT TYPE: ", event.type)
    if (event.type == 'checkout.session.completed') {
      let stripeSession = event.data.object
      console.log("METADATA:", stripeSession.metadata.orders)
      console.log("MY ORDERS: ", JSON.parse(stripeSession.metadata.orders))
    }
    //process stripe session
    response.json({received:true})
  }
}

module.exports = CheckoutController


