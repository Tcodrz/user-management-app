Start the app - Run the script "dev"
    - this script drops the relevant db from the mongoDB if there is one.
    - then it calls the api and re-populates the db with all relevant data - users, post's & todo's.
    - after populating the db the server starts on port 3000, and the angular compiler starts compiling the project.
    - the browser should start automatically, if not - go to http://loaclhost:4200/

using the app - 
    - on start the list of users is loaded with 10 users from the api.
    - the user can update the user details, just edit the input in the text box and press update to save the changes.
    - user can delete any user from the list.
    - hover on the "other data" button will reveal the address propertys of the user.
    - click anywhere in the address area to hide the address area.
    - you can add a new user - press the add button at the top-right corner of the user's list.
    - you can search the users list in the search box at the top left corner, while typing the users list will update automatically.
    - the users card borders are colored red or green - 
                                        # Red - the user has uncompleted Tasks.
                                        # Green - the user has no uncompleted tasks.

** Deleting a user will also delete it's Post's and Todo's ** 

    // Display and using Todo's & Post's

        - Click on any user id (number on the top left corner of each user card) will show the right side of the screen - Todo's & Post's.
        - you can add a new todo - click on the "add" button on the top-right corner.
        - uncompleted Todo's will have a  "mark completed" button, click on the button will change the todo status to completed.
        - you can add a post by click on the "add" button on the top-right corner of the Posts area.




 