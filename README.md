# 🏥 Hospital Management System

A modern, full-stack Hospital Management System built with React, Node.js, and MongoDB. Features a beautiful UI with dark mode, comprehensive patient/doctor management, appointment scheduling, and billing functionality.

## ✨ Features

### Frontend
- 🎨 **Modern UI Design** - Clean, aesthetic interface built with React and Tailwind CSS
- 🌓 **Dark Mode** - Toggle between light and dark themes with persistent storage
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🔐 **Authentication** - Secure login/signup with JWT tokens
- 👥 **Role-Based Access** - Different views for Admin, Doctor, and Receptionist
- 📊 **Interactive Dashboard** - Real-time statistics and charts using Recharts
- 🔍 **Search & Filter** - Easy data filtering across all modules
- 🔔 **Toast Notifications** - Real-time feedback for all actions
- ⚡ **Fast & Smooth** - Optimized performance with loading states

### Backend
- 🚀 **RESTful API** - Clean, organized Express.js backend
- 🔒 **JWT Authentication** - Secure token-based auth system
- 👮 **Role-Based Authorization** - Middleware for access control
- 💾 **MongoDB Database** - NoSQL database with Mongoose ODM
- ✅ **Input Validation** - Comprehensive request validation
- 🛡️ **Error Handling** - Centralized error management
- 📝 **Request Logging** - Track all API requests

### Modules
1. **Patient Management** - Add, edit, delete, and search patients
2. **Doctor Management** - Manage doctor profiles and schedules
3. **Appointment Scheduling** - Create and track appointments
4. **Billing & Reports** - Generate invoices and view revenue analytics
5. **Dashboard** - Overview of key metrics and recent activity
6. **Settings** - User profile and password management

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js 16.x or higher
- npm or yarn
- MongoDB 4.4 or higher

## 🚀 Installation & Setup

### 1. Clone or Extract the Project

```bash
cd HOSPITAL
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (already done)
npm install

# Create a .env file with your MongoDB connection string
echo "MONGODB_URI=mongodb://localhost:27017/hospitalDB" > .env
echo "JWT_SECRET=your-secret-key-change-this-in-production" >> .env
echo "PORT=3000" >> .env

# Make sure MongoDB is running
# On macOS/Linux, start MongoDB with:
# brew services start mongodb-community
# or
# sudo systemctl start mongod (on Linux)

# Start the server
npm start
```

The backend will run on `http://localhost:3000`

### 3. Frontend Setup

Open a **new terminal** window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to: `http://localhost:5173`

## 👤 Default Login Credentials

### Admin Account
- **Email:** admin@hospital.com
- **Password:** admin123

### Doctor Account
- **Email:** doctor@hospital.com
- **Password:** doctor123

### Receptionist Account
- **Email:** receptionist@hospital.com
- **Password:** recep123

## 📁 Project Structure

```
HOSPITAL/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Common.jsx
│   │   ├── context/         # React context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Patients.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── Appointments.jsx
│   │   │   ├── Billing.jsx
│   │   │   └── Settings.jsx
│   │   ├── services/        # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                  # Express backend
│   ├── config/
│   │   └── database.js      # MongoDB configuration
│   ├── controllers/         # Request handlers
│   │   ├── authController.js
│   │   ├── patientController.js
│   │   ├── doctorController.js
│   │   ├── appointmentController.js
│   │   ├── billingController.js
│   │   └── statsController.js
│   ├── middleware/          # Custom middleware
│   │   └── auth.js
│   ├── models/              # Mongoose models
│   │   ├── User.js
│   │   ├── Patient.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   ├── Bill.js
│   │   └── index.js
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── patients.js
│   │   ├── doctors.js
│   │   ├── appointments.js
│   │   ├── billing.js
│   │   └── stats.js
│   ├── scripts/             # Utility scripts
│   │   └── migrateData.js   # Data migration script
│   ├── server.js            # Entry point
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment
- `GET /api/appointments/date/:date` - Get appointments by date
- `GET /api/appointments/doctor/:doctorId` - Get appointments by doctor
- `GET /api/appointments/patient/:patientId` - Get appointments by patient

### Billing
- `GET /api/billing` - Get all bills
- `GET /api/billing/:id` - Get bill by ID
- `POST /api/billing` - Create new bill
- `GET /api/billing/patient/:patientId` - Get bills by patient

### Statistics
- `GET /api/stats/dashboard` - Get dashboard statistics

## 🎨 Features Showcase

### Dashboard
- Total patients, doctors, appointments count
- Revenue tracking
- Interactive charts (appointments by day, revenue trends)
- Recent activity feed

### Patient Management
- Complete patient records with diagnosis
- Search and filter capabilities
- Add/Edit/Delete operations
- Clean table view with modal forms

### Doctor Management
- Doctor profiles with specialties
- Schedule management
- Card-based grid layout
- Available days tracking

### Appointment Scheduling
- Book appointments with specific doctors
- Filter by date, patient, or doctor
- Status tracking (scheduled, completed, cancelled)
- Color-coded status badges

### Billing System
- Create itemized bills
- Revenue overview with charts
- Download invoices
- Patient-wise billing history

## 🌐 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project to Vercel
3. Set build settings:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `npm install`
4. Add environment variable:
   - `VITE_API_URL`: Your backend URL

### Backend (Render/Railway/Heroku)

1. Push code to GitHub
2. Create new Web Service
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables:
   - `PORT`: 3000
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: production

## 🔧 Configuration

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hospitalDB
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

## 🧪 Testing

1. **Start MongoDB service**
2. **Start both servers** (backend on :3000, frontend on :5173)
3. **Login** with default credentials
4. **Test each module:**
   - Create a new patient
   - Add a doctor
   - Schedule an appointment
   - Generate a bill
   - View dashboard statistics
5. **Test dark mode** toggle
6. **Test responsive design** (resize browser or use mobile)

## 📝 Development Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm start        # Start server
npm run dev      # Start with auto-reload (requires --watch flag)
npm run migrate  # Run data migration script
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### MongoDB Connection Issues
- Ensure MongoDB is running locally or provide a valid MongoDB Atlas URI
- Check MONGODB_URI in backend/.env
- Verify MongoDB installation and service status

### CORS Issues
- Ensure backend is running on port 3000
- Check VITE_API_URL in frontend/.env
- Verify CORS is enabled in backend/server.js

## 🚀 Future Enhancements

- [ ] Email notifications
- [ ] PDF invoice generation
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] File upload for patient records
- [ ] Video consultation integration
- [ ] SMS reminders for appointments
- [ ] Inventory management
- [ ] Lab test management
- [ ] Staff attendance tracking

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built with ❤️ using React, Node.js, and modern web technologies.

---

**Note:** This is a demo application. For production use, implement additional security measures, use a proper database (MongoDB with authentication), add comprehensive testing, and follow security best practices.
