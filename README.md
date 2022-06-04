# hospital-api

We’re going to design an API for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients

## FOLDER STRUCTURE

```
.
├── config # Mongoose file (initializing Mongoose, passport-jwt-strategy)
├── controllers # Controller files (For Writing business logic)
├── models # Models files (for initilizing schema)
├── routes # Routes(route related files)
├── index.js
└── README.md
```

### PROJECT STARTING GIUDE

##### Install all dependencies

```
npm install
```

##### Start The Project

```
npm start
```

### ROUTES FOR TESTING

##### Doctor

-> it ask username and password

```http
POST /api/doctor/register
```

-> it ask username and password and responds with token

```http
POST /api/doctor/login
```

##### Patient

-> it ask patients phone number

```http
POST /api/patient/register
```

-> it ask patient_id in url params and status in request body.

```http
POST /api/patient/:id/create_report
```

-> it ask patient_id in url params, it responds all the reports of patient from old to new.

```http
GET /api/patient/:id/all_reports
```

##### Report

-> it ask status in url params, it responds all the reports of multiple patients.

```http
GET /api/reports/:status
```
