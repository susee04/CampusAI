
CampusAI 🎓🤖

> An AI-powered campus assistant that helps students get instant answers about college information through a simple web interface.

## Overview

CampusAI is a full-stack AI chatbot designed to make campus information easily accessible for students. Instead of searching through notices or asking multiple people, students can simply chat with CampusAI and receive quick responses.

The project consists of a React frontend and a Node.js/Express backend, deployed separately for better scalability.

✨ Features

- AI-powered chatbot for campus queries
- Instant responses
- Clean and responsive UI
- Fast backend API integration
- Easy deployment with Vercel and Render
- User-friendly interface

🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Deployment:** Vercel (Frontend), Render (Backend)
- **AI:** OpenAI API

📁 Project Structure

```text
CampusAI/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

🚀 Installation

### Clone the repository

```bash
git clone https://github.com/your-username/campusai.git
cd campusai
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

### Backend

```bash
cd backend
npm install
npm start
```

Runs on:

```
http://localhost:5000
```

 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
OPENAI_API_KEY=your_api_key
PORT=5000
```

🌐 Deployment

 Frontend (Vercel)

1. Connect your GitHub repository.
2. Select the `frontend` folder.
3. Deploy.

 Backend (Render)

1. Create a new Web Service.
2. Select the `backend` folder.
3. Add environment variables.
4. Deploy.

 ⚙️ How It Works

1. Student enters a campus-related question.
2. React frontend sends the request to the backend.
3. Express backend processes the request.
4. OpenAI generates a response.
5. The answer is displayed instantly.

 🔮 Future Enhancements

- Student login
- Attendance tracking
- Timetable integration
- Exam reminders
- Notice board integration
- Voice interaction
- Multi-language support (English & Tamil)


 👨‍💻 Author

Susee S

B.Tech Computer Science and Business Systems


 📄 License

This project was developed for educational and hackathon purposes.
