'use strict'

const Config = use('Config')
const Stripe = use('stripe')(Config.get('stripe.secret_key'))

// what is this for ??
// i probably don't need it
const CART_KEY = "cart"

class CheckoutController {
  async checkout({response, session, view, request}) {
    let lineItems = []
    // 1. retrieve cart from react
    let data = request.get()
    let cart = JSON.parse(data.cart)
    // 2. create line items
    for(let cartItem of cart) {
      lineItems.push({
        name: cartItem.foodName,
        amount: cartItem.price,
        quantity: cartItem.quantity,
        currency:'SGD'
      })
    }
    //console.log(lineItems)
    let metaData = JSON.stringify(Object.values(cart))
    // console.log(metaData)
    // 3. create payment
    const payment = {
      payment_method_types: ['card'],
      // payment_method_types = ['card'],
      // line_items:[
      //   {'name':'fish burger', 'amount':380, 'quantity':2, 'currency':'SGD'},
      //   {'name':'french fries', 'amount':250, 'quantity':1, 'currency':'SGD'}
      // ],
      line_items: lineItems,
      success_url: Config.get('stripe.success_url') + '?sessionId={CHECKOUT_SESSION_ID}',
      //success_url: Config.get('stripe.success_url'),
      cancel_url: Config.get('stripe.error_url'),
      metadata: {
        'orders': metaData
      }
    }
    // 4. register payment
    let stripeSession = await Stripe.checkout.sessions.create(payment)
    console.log(stripeSession)
    return view.render('checkout/checkout', {
      'sessionId':stripeSession.id, // Id of the session
      'publishableKey':Config.get('stripe.publishable_key')
    })
  }

  processPayment({request, response}) {
    let payload = request.raw()
    let endpointSecret = Config.get('stripe.endpoint_secret')
    let sigHeader = request.header("stripe-signature")
    let event = null
    try {
      event = Stripe.webhooks.constructEvent(payload, sigHeader, endpointSecret)
    } catch(error) {
      response.send({
        'error':e.message
      })
    }
    if (event.type == 'checkout.session.completed') {
      let stripeSession = event.data.object
    }
    //process stripe session
    response.json({received:true})
  }
}

module.exports = CheckoutController


