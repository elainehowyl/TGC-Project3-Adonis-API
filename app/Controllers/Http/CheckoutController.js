'use strict'

// import config
const Config = use('Config')
// import stripe.js from config folder and get secret key
const Stripe = use('stripe')(Config.get('stripe.secret_key'))

// idk what does this refer to?
const CART_KEY = "cart"

class CheckoutController {
  async checkout({ response, session, view }){
    let lineItems = []
    let cart = Object.values(session.get(CART_KEY, {}))
    // Object.values() method takes an object as argument, returns an array that contains the values of the object
    // 1. Create line items
    for(let cartItem of cart){
      lineItems.push({
        name: cartItem.title,
        images: [cartItem.image_url],
        amount: cartItem.price,
        quantity: cartItem.qty,
        currency:'SGD'
      })
    }
    let metaData = JSON.stringify(Object.values(cart))
    // 2. Create payment
    const payment = {
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: Config.get('stripe.success_url') + '?sessionId={CHECKOUT_SESSION_ID}',
      cancel_url: Config.get('stripe.error_url'),
      metadata:{
        'orders': metaData
      }
    }
  }
}

module.exports = CheckoutController
