# Parcel Delivery System

- Github: https://github.com/jbjzeehad/l2-assignment-6

- Frontend: https://pdsystemfrnt.vercel.app/

- Backend: https://parceldeliverysystem.vercel.app/

## Frontend

- React.js + React Router

- Redux Toolkit & RTK Query

- TypeScript

- Tailwind CSS

## Backend

- Node.js + Express.js (REST API)

- MongoDB + Mongoose

- JWT & bcrypt (authentication)

### 1. Public Landing Section

Home Page – Overview of parcel delivery service

About Page – Service description, mission, and team info

Contact Page – Inquiry form (simulated submission)

Tracking Page - track parcels

### 2. Authentication

JWT-based login and registration

Role selection: Sender or Receiver

Role-based redirection after login

Persisted authentication state

Logout functionality

### 3. Sender Dashboard

Create parcel delivery requests

Cancel parcels (if not dispatched)

View all created parcels with status logs

### 4. Receiver Dashboard

View parcels

Confirm parcel delivery

### 5. Admin Dashboard

View/manage all users (block/unblock)

View/manage all parcels (block/unblock, update delivery status)

### 6. Parcel Tracking

Search parcels via unique tracking ID

Public or authenticated users can track parcels

Display parcel status logs: status, timestamp, updatedBy, notes

### 7. General Features

Role-based navigation menus

Loading indicators & global error handling

Form validations and advanced filtering

Pagination for long lists

Toast notifications for feedback

### Environment variables:

Add .env file with: VITE_BACKEND_URL

### Credentials

- Admin: ADMIN@EMAIL.COM | password: ADMIN@12345

- Sender: sender@email.com | password: 123456789@S

- Receiver: receiver@email.com | password: 123456789@R

### Folder Structure

```

└─ src/
│  └─ assets/
│  └─ components/
|  |     └─layout/
|  |     └─module/
│  └─ config/
│  └─ constants/
│  └─ hooks/
│  └─ lib/
│  └─ pages/
│  └─ store/
│  └─ types/
│  └─ utils/
└─ public/
└─ package.json
└─ README.md

```
