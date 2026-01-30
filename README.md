
# Django-React Full-Stack Notes App

A full-stack web application for creating and managing notes, built with Django REST Framework on the backend and React with Vite on the frontend. Features JWT authentication, CRUD operations, and a modern, responsive UI.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Notes Management**: Create, read, and delete personal notes
- **Protected Routes**: Authentication-required pages with automatic token refresh
- **Responsive Design**: Clean, modern UI that works on all devices
- **PostgreSQL Database**: Robust data storage with PostgreSQL
- **RESTful API**: Well-structured API endpoints with Django REST Framework

## Tech Stack

### Backend
- **Django 5.0.6**: Python web framework
- **Django REST Framework**: API development
- **Simple JWT**: JSON Web Token authentication
- **PostgreSQL**: Database
- **Django CORS Headers**: Cross-Origin Resource Sharing support

### Frontend
- **React 18.3**: JavaScript library for building user interfaces
- **Vite 5.3**: Next-generation frontend tooling
- **React Router DOM 6.24**: Client-side routing
- **Axios**: HTTP client for API requests
- **JWT Decode**: Decoding JWT tokens on the client

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Node.js 16 or higher
- PostgreSQL (with a database and user created)
- npm or yarn

### PostgreSQL Setup
You'll need to create a PostgreSQL database and user before running the application:

```sql
CREATE DATABASE your_database_name;
CREATE USER your_database_user WITH PASSWORD 'your_database_password';
ALTER ROLE your_database_user SET client_encoding TO 'utf8';
ALTER ROLE your_database_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE your_database_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_database_user;
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Django-React-Full-Stack-App
```

### 2. Backend Setup

#### Navigate to Backend Directory
```bash
cd backend
```

#### Create Virtual Environment
```bash
python -m venv venv

# On Unix/Linux/macOS:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

#### Install Dependencies
```bash
pip install -r req.txt
```

#### Configure Environment Variables
Create a `.env` file in the `backend` directory:

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PWD=your_database_password
DB_HOST=localhost
DB_PORT=5432
```

** Important**: Never commit the `.env` file to version control. It's already in `.gitignore`.

#### Run Migrations
```bash
python manage.py migrate
```

#### Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

#### Start Backend Server
```bash
python manage.py runserver
```

The backend will run on `http://localhost:8000`

### 3. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd frontend
```

#### Install Dependencies
```bash
npm install
```

#### Configure Environment Variables (Optional)
Create a `.env` file in the `frontend` directory if you want to override the default API URL:

```env
VITE_API_URL=http://localhost:8000
```

**Note**: If not provided, the app defaults to `/choreo-apis/djangoreactapp/backend/v1` for Choreo deployment.

#### Start Development Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Project Structure

```
Django-React-Full-Stack-App/
├── backend/
│   ├── api/                    # Main API app
│   │   ├── migrations/        # Database migrations
│   │   ├── models.py          # Note model
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API views
│   │   ├── urls.py            # API routes
│   │   ├── admin.py           # Django admin config
│   │   └── tests.py           # Unit tests
│   ├── backend/               # Django project settings
│   │   ├── settings.py        # Main configuration
│   │   ├── urls.py            # Root URL routing
│   │   ├── wsgi.py            # WSGI config
│   │   └── asgi.py            # ASGI config
│   ├── manage.py              # Django management script
│   ├── req.txt                # Python dependencies
│   ├── Procfile               # Deployment configuration
│   └── .env                   # Environment variables (create this)
│
└── frontend/
    ├── src/
    │   ├── components/        # Reusable React components
    │   │   ├── Form.jsx       # Login/Register form
    │   │   ├── Note.jsx       # Note display component
    │   │   ├── ProtectedRoute.jsx  # Auth guard
    │   │   └── LoadingIndicator.jsx # Loading spinner
    │   ├── pages/             # Page components
    │   │   ├── home.jsx       # Main notes page
    │   │   ├── login.jsx      # Login page
    │   │   ├── register.jsx   # Registration page
    │   │   └── notFound.jsx   # 404 page
    │   ├── styles/            # CSS stylesheets
    │   │   ├── Form.css
    │   │   ├── Home.css
    │   │   ├── Note.css
    │   │   └── LoadingIndicator.css
    │   ├── api.js             # Axios configuration & interceptors
    │   ├── constants.js       # App constants (token keys)
    │   ├── App.jsx            # Main app component & routing
    │   └── main.jsx           # React entry point
    ├── public/                # Static assets
    ├── index.html             # HTML template
    ├── package.json           # npm dependencies
    ├── vite.config.js         # Vite configuration
    └── .env                   # Environment variables (optional)
```

## API Endpoints

### Authentication

#### Register User
- **Endpoint**: `POST /api/user/register`
- **Description**: Register a new user account
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "id": 1,
    "username": "john_doe"
  }
  ```

#### Login
- **Endpoint**: `POST /api/token/`
- **Description**: Login and obtain JWT access and refresh tokens
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### Refresh Token
- **Endpoint**: `POST /api/token/refresh/`
- **Description**: Refresh access token using refresh token
- **Request Body**:
  ```json
  {
    "refresh": "string"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Notes

#### Get All Notes
- **Endpoint**: `GET /api/notes/`
- **Description**: Retrieve all notes for the authenticated user
- **Headers**: `Authorization: Bearer <access_token>`
- **Response** (200 OK):
  ```json
  [
    {
      "id": 1,
      "title": "My First Note",
      "content": "This is the content of my note",
      "created_at": "2024-06-27T10:30:00Z",
      "author": 1
    }
  ]
  ```

#### Create Note
- **Endpoint**: `POST /api/notes/`
- **Description**: Create a new note
- **Headers**: `Authorization: Bearer <access_token>`
- **Request Body**:
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "id": 2,
    "title": "New Note",
    "content": "Note content here",
    "created_at": "2024-06-27T11:00:00Z",
    "author": 1
  }
  ```

#### Delete Note
- **Endpoint**: `DELETE /api/notes/delete/<id>/`
- **Description**: Delete a specific note by ID
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: `204 No Content`

## Usage

1. **Register**: Create a new account on the registration page
2. **Login**: Sign in with your credentials
3. **Create Notes**: Add new notes with title and content
4. **View Notes**: See all your notes on the home page
5. **Delete Notes**: Remove notes you no longer need
6. **Logout**: Sign out securely

## Security Features

- JWT-based authentication with access and refresh tokens
- Password hashing with Django's built-in security
- Protected API endpoints requiring authentication
- Automatic token refresh on expiration
- CORS configuration for secure cross-origin requests

## Deployment

### Backend (Django)

#### Traditional Deployment
The project includes a `Procfile` for easy deployment to platforms like Heroku or Choreo:

```
web: python manage.py runserver 0.0.0.0:8000
```

**Important**: Before deploying to production:
- Set `DEBUG = False` in `settings.py`
- Update `SECRET_KEY` with a secure random key (use `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`)
- Configure `ALLOWED_HOSTS` with your domain
- Use a production WSGI server like Gunicorn: `gunicorn backend.wsgi:application`
- Set up a managed PostgreSQL database (AWS RDS, Supabase, DigitalOcean, etc.)
- Use environment variables for all sensitive data
- Collect static files: `python manage.py collectstatic`

#### Docker Deployment (Recommended)
Create a `Dockerfile` in the backend directory:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY req.txt .
RUN pip install --no-cache-dir -r req.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
```

Create a `docker-compose.yml` in the root directory:

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: notesdb
      POSTGRES_USER: notesuser
      POSTGRES_PASSWORD: securepassword
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    command: gunicorn backend.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      DB_NAME: notesdb
      DB_USER: notesuser
      DB_PWD: securepassword
      DB_HOST: db
      DB_PORT: 5432

volumes:
  postgres_data:
```

Run with: `docker-compose up`

### Frontend (React)

Build the frontend for production:

```bash
cd frontend
npm run build
```

The optimized files will be in the `dist` directory, ready for deployment to:
- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **AWS S3 + CloudFront**: Static hosting with CDN
- **GitHub Pages**: Free hosting for static sites

**Configuration**: Update `VITE_API_URL` in your deployment platform's environment variables to point to your production backend URL.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Author

**Haider Khan**

## Known Issues & Suggestions

### Current Limitations
- **Token Refresh**: The frontend automatically handles token refresh using the `ProtectedRoute` component. The access token expires after 30 minutes and refresh token after 1 day (configurable in `backend/settings.py` under `SIMPLE_JWT`). Ensure these settings match your security requirements.
- **Loading States**: Loading indicators are currently basic. Consider using libraries like `react-query` or `swr` for better loading states, caching, and error handling.

### Potential Improvements
- Add note editing functionality (currently only supports create, read, delete)
- Implement search and filtering for notes
- Add pagination for large note collections
- Implement rich text editor for note content
- Add user profile management
- Implement note categories/tags
- Add unit and integration tests
- Set up CI/CD pipeline

## Development Tips

### Backend
- Use Django's built-in admin panel at `/admin` to manage data
- Add `gunicorn` to `req.txt` for production deployment: `gunicorn==21.2.0`
- Consider adding `django-environ` for better environment variable management
- Use Django's `makemigrations` only when you modify models

### Frontend
- The app runs on `http://localhost:5173` by default (or next available port)
- Hot Module Replacement (HMR) is enabled for instant updates during development
- Use React DevTools browser extension for debugging
- Consider adding ESLint and Prettier for code quality

### Common Issues
- **CORS errors**: Ensure `CORS_ALLOW_ALL_ORIGINS = True` is set in development
- **Database connection errors**: Verify PostgreSQL is running and credentials are correct
- **Token expiration**: Check browser console for 401 errors and verify token refresh logic
- **Port conflicts**: Change port with `python manage.py runserver 8001` or `vite --port 5174`

## Support

For support, please open an issue in the GitHub repository.

---

**Note**: This is a development setup. For production deployment, additional security measures and optimizations should be implemented.
