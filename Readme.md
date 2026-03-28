Overview:
Smart Support Desk is a ticket management system that allows users to raise support tickets and enables admins to manage, prioritize, and resolve them efficiently using SLA-based tracking and priority logic.

Features:

1) User Features: 
   1.1) Raise support tickets
   1.2) view all personal tickets
   1.3) view ticket details
   1.4) Add comments
   1.5) Track ticket status and SLA time

2) Admin Features:
   2.1) View All tickets
   2.2) Admin dashboard with statistics:
        2.2.1) Total tickets
        2.2.2) High Priority tickets
        2.2.3) Reopened tickets
        2.2.4) Open tickets
   2.3) Update ticket status with proper ordering.
   2.4) Add Comments
   2.5) Identify critical and overdue tickets.

3) Tech Stack:
   3.1) Frontend: HTML, CSS, JS
   3.2) Backend: Node.js, Express.js
   3.3) Database: MySql

4) Priority Engine Logic: 
    Priority is calculated based on: 
        1) Impact
        2) Urgency
        3) Category
    Using a priority matrix table

5) SLA Tracking
   Each ticket has: 
       1) SLA due time
       2) Remaining time calculation

6) Status Workflows:
   Ticket follows a strict lifecycle: 
   open -> in progress -> resolved -> closed

7) Role-based Access: 
   Users: Can only view and manage their own tickets.
   Admin: Can manage all tickets and update status

8) Admin Dashboard:
   Displays: 
   1) Total tickets
   2) High priority tickets
   3) Reopened tickets
   4) Open tickets

9) How To Run: 
   1) Install dependencies:
      npm install
   2) Setup MySql database: 
      create database: smart_support_desk
      Run all SQL schemas
   3) Start Server:
      npm start
   4) Open in Browser:
      http://localhost:3000

10) Demo Credentials:
   Admin: 
   email: admin@test.com
   pass: 123

   User: 
   email: user@test.com
   pass: 123

11) Future improvements:
    1) JWT Authentication
    2) File attachments
    3) Email notification
    4) Real time chat
    5) Internal messasing
    6) Ticket Assignment system
