

This is a reupload of a school project. Testing this source code will not work unless a database key is added to 
"ATZ_Healthcare-service/db/db.js".



#Steven Hansen, Chris Toth, Reed McGarvey, Aaron Brvenik, Kosta Kaganis
    _  _____ _____  _   _            _ _   _                        
   / \|_   _|__  / | | | | ___  __ _| | |_| |__   ___ __ _ _ __ ___ 
  / _ \ | |   / /  | |_| |/ _ \/ _` | | __| '_ \ / __/ _` | '__/ _ \
 / ___ \| |  / /_  |  _  |  __/ (_| | | |_| | | | (_| (_| | | |  __/
/_/   \_\_| /____| |_| |_|\___|\__,_|_|\__|_| |_|\___\__,_|_|  \___|

To run this project, first navigate to the ATZ_Healthcare-service directory in a powershell window.
From there, type in 'npm install' and hit enter.
Next, to run the server, type in 'npm run dev' and hit enter.
Wait for the prompt, "We are live on 8080."

Then in a separate terminal, navigate to atz_healthcare-ui and run 'npm install', and then 'npm start'.

A window should automatically open after a minute, starting at our site login.

NOTE: node must be installed on the local machine in order for this to work properly. 

CREDENTIALS:
username: admin
password: password


Design Patterns

## OO
- Builder design pattern: exists in PatientRecordController.js, where the patient is created using the PatientBuilder() function and its sub-functions.
- Adapter design pattern: the class db.js that handles all interactions with the MongoDB database.
- Singleton design pattern: there is only one instance of the PatientList pulled from the database at any one time.
- Chain of Responsibility: the list of patients is retrieved from the database by the backend class PatientRecordController.js, and passed to the frontend to be put into the table of patients.
- Structural Bridge: the fact that the backend is separate from the frontend, ensuring separation of the interface and the controller classes.

## UI
- Sort By Column: exists in the Dashboard.js file. Clicking the top row will sort the targeted column by ascending or descending order.
- Modal: Two modal components exist with the implemented use case, found in components/modals/AddNewPatient.js and components/modals/PatientInfoModal.js. They are both implemented in the Dashboard.js file. Clicking the "Add New Patient" button will spawn the AddNewPatient modal, and clicking a row within the table will spawn the PatientInfoModal.
- Dashboard: found in the Dashboard.js file. renders an assortment of data that would be useful to the user. In this implementation, patient records are displayed in one table. 
- Notifications: in the AddNewPatient.js class.  It brings up an alert when submitting a new patient that says the submission was successful. 
- Categorization Design Pattern: The dashboard is separated into categories of account managment and views in the class Dashboard.js.   