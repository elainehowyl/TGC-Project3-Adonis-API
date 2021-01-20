# Adonis JS Quick Guide

Often we cannot rely on formatted and written tutorial to do our project. We have to learn to research,
explore and read documentation by yourself.

We will be following the documentation starting at https://adonisjs.com/docs/4.1/installation to 
learn how to use Adonis.

## Task 1: Installing Adonis JS
1. Read https://adonisjs.com/docs/4.1/installation
2. Follow the steps (you may ignore the `PATH` part because most of the time it has been done)
3. Create a new adonis project named `meteors`
4. Start the `meteors` application
5. Open the browser at the URL, you should see Adonis logo and the text that says "It works!"

## Task 2: Further reading
Those two you can do at your own leisure, but should be done before you do your large project
1. https://adonisjs.com/docs/4.1/configuration-and-env
2. https://adonisjs.com/docs/4.1/folder-structure

## Task 3: Routing
1. Read https://adonisjs.com/docs/4.1/routing
2. Answer this question: which file will we find the routes?
3. Create a new route for the url `about-us` that will just return the text "About Us"
4. Create a new route for the url `view-record` which has one **required** parameter `record-id`. 
   Return the value of the required parameter 
5. Created a **named** route by the name of `special`.

## Task 4: Controllers
Controllers are classes that orangised related routes together.
1. Read: https://adonisjs.com/docs/4.1/controllers
2. Create a new `http` controller named `SightingController` -- you will need to use the command line interface.
3. You can find the new controller in the `app/Controllers` folder.
4. Create a function named `index` inside the `SightingController`. There's a demonstration in the linked document above
5. Read: https://adonisjs.com/docs/4.1/response and use what you read there to send back a **json**  object, like below:
    ```
    {
      "sightings":[
        {
          "date": "22/01/2020",
          "coordinate":[
            "lat":1.07{
            "lng":2.02
          }
        }
      ]
    }
    ```
6. Read the first link again, on the section of **Using Controllers**. Create new route at the url `\sightings\` and
it should activate the `index` function at the `SightingController`.  (Note this is also abbreviated as `SightingController.index`)

## Task 5: Views
1. Read https://adonisjs.com/docs/4.1/views and refer to this link constantly
2. Create a new view named `sighting-index`, following the link above
3. Where can we find the newly created view? (Hint: you can right click on the `meteors` folder and use the `Find in Folder` feature.)
4. Take a look at `welcome.edge` and study it.
5. In `sighting-index.edge`, add in the template code from `Bootstrap Getting Started` and have it to say `<h1>Hello World</h1>`
6. Create a new route for the url `sightings/about` and it should render the `sighting-index.edge` view file. (remember to add to `route.js` as well)

## Task 6: Pass parameters to views
Refer to the following links for assistance:
* https://adonisjs.com/docs/4.1/routing
* https://adonisjs.com/docs/4.1/controllers
* https://adonisjs.com/docs/4.1/views

1. Create a route at the url `sightings/details/:detail_id/view` 
2. Create a new function in `SightingController` named `details`
3. Map the route in 6.1 to the `details` function in `SightingController`
4. The function `details` should render an edge file named `sightings-details`
5. Extract out the route parameter `detail_id` and send it to the edge file. (Hint: the syntax is the same as express and hbs)

## Task 7: Form handling
Refer to:
* https://adonisjs.com/docs/4.1/request

1. Create a `GET` route for the url `sightings/details/:detail_id/create`
2. Create a function named `create` in `SightingController`
3. Associate the route created in 7.1 to the function created in 7.2
4. Create a view with the name `sightings-create`
5. In the view, display a form that asks the user for date, latitude and longtitude.
6. Make sure you include the proper security measures (see CSRF at: https://adonisjs.com/docs/4.1/views)
7. Create a `POST` route for the url `sightings/details/:detail_id/create`
8. Add a function name `processCreate`
9. Send back the details entered in the form back as JSON.

## Task 8: Setup the database
1. Log into `mysql` and create a new database named `meteors`
    ```
    mysql -u root
    ```
    ```
    create database meteors;
    CREATE USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
    GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost';
    FLUSH PRIVILEGES;
    ```
2. Open up the .env file
3. Change the `DB_CONNECTION` in the .env file to `mysql`
4. Type in the terminal:
   ```
   yarn add mysql
   ```
5. Restart the server app and ensure that there is no error
6. At another terminal, type in:
   ```
   adonis migration:run
   ```

## Task 9: Create a model
* Read: https://adonisjs.com/docs/4.1/lucid
* Read: https://adonisjs.com/docs/4.1/migrations
* Read: https://adonisjs.com/docs/4.1/lucid#_inserts_updates

Make sure to read the whole documentation linked before starting

1. Create a model named `Sighting` with a migration file
2. Give it a string field for `lat`, string field for `lng`
   and a date field for `date`
3. Make a new migration:
   `adonis make:migration alter_sightings --action select sightings`
4. Add the following to `up`
  ```
    up () {
    this.table('sightings', (table) => {
      table.datetime('datetime');
      table.dropColumn('date');
    })
  }
  ```
5. Do a `adonis migration run`
6. Add the code to `SightingController.processCreate` such that
it will save the new sighting information to the database

## Task 10: Display listings
* Make sure to read this first: https://adonisjs.com/docs/4.1/lucid#_static_methods
* Make sure to read this first: https://edge.adonisjs.com/docs/iteration
* Make sure to read this first: https://forum.adonisjs.com/t/correctly-passing-collection-of-models-to-edge/131

1. Change `SightingController.index` to fetch all the sighting records
2. Pass all the recording sightings to the view `sightings-index`
3. Use iteration to display all the records in a table form

# Task 11: Update listing
* Make sure to read: https://adonisjs.com/docs/4.1/lucid#_static_methods

1. Add `SightingController.update` to the SightingController, and also a route 
associated with it. The url should be `/sightings/:sighting_id/update`, where the
parameter `sighting_id` refers to the id of the sightings that we want to edit
2. Display the form with the current details of the sighting. Make sure to detail_id
with the CSRF
3. Make it such that when the user submit the form, the sighting will be updated. Follow
the steps below:
   * Create a new function in the `SightingController` named `processUpdate`
   * Create a route to to the new function. Make sure to include the `sighting_id`
   * Update the sighting with the new information (https://adonisjs.com/docs/4.1/lucid#_inserts_updates)
   * Redirect the user back to the `/sightings/` url (see: https://adonisjs.com/docs/4.1/response#_redirects)
