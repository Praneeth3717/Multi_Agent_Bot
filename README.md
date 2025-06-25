# Multi-Agent Bot

A comprehensive management system featuring AI-powered support and dashboard agents. The system provides role-based access with dedicated interfaces for support staff and administrators.

## 🏗️ Architecture Overview

### Frontend (React + Vite)
- **Authentication**: Role-based login/signup system
- **Dashboard**: Interactive interface with chat functionality
- **Real-time Chat**: AI-powered support chat with message persistence

### Backend (Node.js + Express)
- **Multi-Agent System**: Powered by LangChain and OpenAI GPT-4
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based authentication with bcrypt

### AI Agents
- **Support Agent**: Handles client queries, orders, and service information
- **Dashboard Agent**: Provides analytics, reports, and business insights

## 🚀 Features

### For Support Staff
- **Client Management**: Search and manage client information
- **Order Processing**: Create and track client orders
- **Service Discovery**: Access class schedules and course details
- **Payment Tracking**: Monitor payment status and history

### For Administrators
- **Revenue Analytics**: Total revenue and outstanding payments
- **Client Insights**: Active/inactive clients, birthday reminders, new client metrics
- **Enrollment Stats**: Course completion rates and enrollment trends
- **Attendance Reports**: Class attendance percentages and dropout analysis

### General Features
- **Persistent Chat**: Messages saved in session storage
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live data synchronization
- **Secure Authentication**: Role-based access control

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- OpenAI API key
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd multi-agent-bot
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### 4. Database Setup
Ensure MongoDB is running and accessible via the connection string in your `.env` file.

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server**:
```bash
cd server
npm start
```
Server will run on `http://localhost:3000`

2. **Start the Frontend Development Server**:
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Build

1. **Build the Frontend**:
```bash
cd client
npm run build
```

2. **Serve the Application**:
Configure your server to serve the built files and handle API routes.

## 📊 Database Schema

### Core Models

- **User**: Authentication and role management
- **Client**: Customer information and course enrollments
- **Course**: Yoga course details and schedules
- **Class**: Individual class sessions
- **Order**: Client orders and payment tracking
- **Payment**: Payment history and methods
- **Attendance**: Class attendance records

## 🤖 AI Agent Capabilities

### Support Agent Tools
- `findClientByIdentifier`: Search clients by name, email, or phone
- `getOrdersByClientOrId`: Retrieve order information
- `getPaymentInfo`: Access payment details and history
- `discoverServices`: Find class schedules and course information
- `createClientEnquiry`: Register new client inquiries
- `createOrder`: Process new orders

### Dashboard Agent Tools
- `getRevenueStats`: Calculate total revenue and outstanding payments
- `getClientStats`: Analyze client demographics and activity
- `getEnrollmentStats`: Track course enrollment trends
- `getAttendanceStats`: Monitor class attendance and dropout rates

## 🔐 Authentication & Authorization

### User Roles
- **Support**: Access to client management and order processing
- **Admin**: Full access including analytics and reporting

### Authentication Flow
1. User registration with role selection
2. Login with email and password
3. JWT token generation and storage
4. Role-based route protection

## 🎨 UI/UX Features

- **Modern Design**: Clean, responsive interface with Tailwind CSS
- **Interactive Chat**: Real-time messaging with the AI agents
- **Data Visualization**: Organized display of courses, clients, and orders
- **Status Indicators**: Visual feedback for loading states and errors

## 📱 API Endpoints

### Authentication Routes (`/auth`)
- `POST /signup` - User registration
- `POST /login` - User authentication

### Agent Routes (`/agent`)
- `POST /support` - Support agent interaction
- `POST /dashboard` - Dashboard agent interaction

## 🔧 Configuration

### Environment Variables
```env
# Server Configuration
PORT=3000
MONGO_URI=mongodb://localhost:27017/yoga-studio

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# AI Configuration
OPENAI_API_KEY=your-openai-api-key
```

### Frontend Configuration
The frontend is configured to connect to the backend API. Update the API endpoints in the components if deploying to different environments.

## 📈 Usage Examples

### Support Agent Queries
- "Find client details for john@example.com"
- "Show me all pending orders for Priya Sharma"
- "What are the payment details for order ORD-YB-001?"
- "Create a new client enquiry for Jane Doe"

### Dashboard Agent Queries
- "Show me the total revenue and outstanding payments"
- "How many active clients do we have?"
- "What's the attendance rate for yesterday's classes?"
- "Show enrollment trends for this month"

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Input validation and sanitization
- Role-based access control
- CORS configuration for cross-origin requests

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Deploy the Node.js application

### Frontend Deployment
1. Build the React application
2. Deploy to a static hosting service (Vercel, Netlify, etc.)
3. Update API endpoints for production
