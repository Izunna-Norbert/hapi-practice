# hapi-practice
Hapi Framework Test Practice


## Form Template API
This is a simple API that provides form templates in JSON format. The template data and their related fields are stored in a PostgreSQL database, the structure of which is described in the provided SQL file. The application is written in Node.js and uses the Hapi framework with Hapi Pal best practices.

## Installation
1. Clone this repository to your local machine
2. Run npm install to install the necessary dependencies
3. Create a PostgreSQL database and update the `.env` file with your database connection details
4. Run the migration to set up the database schema by running `npm run migration`
5. Run the application by running `npm start`

## Endpoints
### GET /templates/{id}
Returns a template in JSON format using the template textual ID as a parameter. If the ID corresponds to one of the two templates in the database, the endpoint returns the corresponding JSON (provided as an example). If the ID does not match any existing templates, the endpoint returns a 404 error.

### GET /templates
### GET /fields
### GET /fields/id

## Testing
To run the unit tests, run `npm run test`.

