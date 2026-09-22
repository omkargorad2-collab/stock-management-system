# Stock Management System

## Project Overview

The AI-BFSI Stock Management System is a stock and inventory management application developed for an academic AI-BFSI project. The system helps manage stock records, monitor inventory levels, and perform stock-related operations through a structured backend application.

The project is based on an existing open-source project and has been customized and adapted for academic project requirements.

## Objectives

- To manage stock and inventory records efficiently.
- To add, update, view, and manage stock information.
- To monitor available stock levels.
- To provide organized APIs for stock management.
- To reduce manual inventory management work.
- To create a foundation for adding AI-based stock analysis in the future.

## Key Features

- Stock management
- Inventory record management
- Add and update stock information
- View stock details
- REST API based backend
- CSV-related stock data processing
- Input validation
- Database connectivity
- API testing using Postman
- Automated testing support

## Technologies Used

- Node.js
- Express.js
- JavaScript
- REST API
- Database
- CSV
- Postman
- GitHub

## Project Structure

```text
stock-management-system/
│
├── controllers/
│   └── stockController.js
│
├── middleware/
│   └── csvValidator.js
│
├── models/
│   └── stockModel.js
│
├── postman/
│   └── Postman Collection
│
├── routes/
│   └── stockRoutes.js
│
├── services/
│   ├── csvService.js
│   └── stockService.js
│
├── test/
│   └── stock.test.js
│
├── utils/
│   └── db.js
│
├── package.json
├── package-lock.json
├── server.js
└── README.md
