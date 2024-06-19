# International Cargo Shipment - Vite React Application

## Case Study: International Cargo Shipment

### Overview
A cargo ship or freighter is a merchant ship that carries cargo, goods, and materials from one port to another. Thousands of cargo carriers ply the world's seas and oceans each year, handling the bulk of international trade. Cargo ships are usually specially designed for the task, often being equipped with cranes and other mechanisms to load and unload, and come in all sizes. Today, they are almost always built of welded steel, and with some exceptions generally have a life expectancy of 25 to 30 years before being scrapped.

International Cargo Shipment delivers Products, Electronics & Consumer Products directly to customers and distributors. The company currently has a single office in Singapore and has been delivering these Products all over Europe to the Client’s destination Location from the Starting location. Local distribution centres do the fulfilment of delivery.

### Business Requirements
International Cargo Shipment aims to transition this system to better serve their customers and will be looking for global availability of its application and data sales and ordering purposes, particularly during the months of August to December when demand for the business grows ahead of the holiday period. Reading data from across regions from a performance point of view is very critical.

The authority is willing to understand the following:
1. The number of Customers (Product category-wise) that generated maximum business (steel, Electronics and Consumer Products) in the 2nd quarter every year and across branches.
2. The quarterly transactions (in count and volume) from offices.
3. The comparative volume in national vs international across branches.
4. The number of customers, category-wise, who did maximum transactions in a month between August and December.

### Guidelines
1. Must have a clear understanding of the requirement.
2. Must have sufficient data to yield visually effective output. Should consider:
   - Adequate items, offices, across cities.
   - Each branch to have 4 customers per category.
   - Each customer must have 10 transactions every month, with a mix of options – steel, Electronic and Consumer products, etc.

## Project Setup

This project is built using React with the Vite framework. Follow the instructions below to set up and run the project locally.

### Prerequisites
- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.22.x)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Cyberfreak08/International-cargo-shipment-React.git
   
   cd International-cargo-shipment-React

2. Install the dependencies
    
    npm install

3. Running the JSON Server
    This project uses json-server to simulate a backend API. To start the JSON server, run:
    
    npm run db

## Project Structure

├── src
│   ├── auth
│   │   └── ProtectedRoute.jsx
│   ├── components
│   │   └── ... (your components)
│   ├── pages
│   │   ├── Dashboard
│   │   │   └── index.jsx
│   │   ├── Landing
│   │   │   └── index.jsx
│   │   ├── NationalVsInternational
│   │   │   └── index.jsx
│   │   └── ... (other pages)
│   ├── Redux
│   │   ├── reducers
│   │   │   └── volumeSlice.js
│   │   └── store.js
│   ├── utils
│   │   └── constants.js
│   ├── App.jsx
│   └── main.jsx
├── public
│   └── ... (static files)
├── package.json
└── vite.config.js

## Dependencies
1. Main Dependencies
    react: ^18.2.0
    react-dom: ^18.2.0
    react-router-dom: ^6.23.1
    @reduxjs/toolkit: ^2.2.5
    react-redux: ^9.1.2
    axios: ^1.7.2
    json-server: ^1.0.0-beta.1
    antd: ^5.18.1
    @ant-design/icons: ^5.3.7
    @canvasjs/react-charts: ^1.0.2

2. Dev Dependencies
    vite: ^5.2.0
    @vitejs/plugin-react: ^4.2.1
    eslint: ^8.57.0
    eslint-plugin-react: ^7.34.1
    eslint-plugin-react-hooks: ^4.6.0
    eslint-plugin-react-refresh: ^0.4.6

## License

    This project is under MIT license

## ScreenShots

