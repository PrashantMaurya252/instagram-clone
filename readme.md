## Instagram Clone (MERN + Vite + Socket.IO)

Full‑stack Instagram-like app with posts, follows, bookmarks, comments, real-time chat, and real-time notifications.

## Features

- **Auth**: Register/Login/Logout using JWT stored in an HTTP-only cookie
- **Profiles**: Edit bio, gender, and profile picture (Cloudinary upload)
- **Posts**: Create (image), like/dislike, comment, delete
- **Social**: Follow/unfollow, followers/following lists, suggested users
- **Bookmarks**: Save/unsave posts
- **Realtime**: Online users list, message delivery, like/dislike notifications (Socket.IO)

## Tech stack

- **Frontend**: React + Vite, Tailwind CSS, Redux Toolkit, React Router, Axios, Socket.IO client
- **Backend**: Node.js (ESM), Express, MongoDB/Mongoose, Socket.IO, Multer (memory), Sharp (image optimize), Cloudinary

## Project layout

- **Backend**: `backend/` (server entry: `backend/index.js`)
- **Frontend**: `frontend/` (Vite app)

## Environment variables (required)

Create a `.env` file at the **repo root** (because the backend is started from the repo root via `backend/index.js`).

```env
PORT=5000
URL=http://localhost:5173

MONGO_URI=mongodb://127.0.0.1:27017/instagram-clone
JWT_SECRET=replace-with-a-long-random-secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
# NOTE: this key is intentionally spelled like the code expects it:
CLOUDNIARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Running locally (Windows / PowerShell)

Install dependencies (run once):

```bash
npm install
npm install --prefix frontend
```

Start backend (API + Socket.IO):

```bash
npm run dev
```

Start frontend (Vite dev server) in a second terminal:

```bash
npm run dev --prefix frontend
```

- **Frontend**: typically `http://localhost:5173`
- **Backend**: `http://localhost:5000` (or whatever you set in `PORT`)

## Important: frontend API URL is hardcoded

The frontend currently calls a deployed URL (`https://instagram-clone-awa2.onrender.com`) directly in multiple files (Axios calls + Socket.IO connection). For local development you must update those URLs to your local backend, for example `http://localhost:5000`.

Files to update include:

- `frontend/src/App.jsx` (Socket.IO connection URL)
- `frontend/src/components/*.jsx` and `frontend/src/hooks/*.jsx` (Axios API calls)

## Backend API routes (summary)

All routes are mounted under:

- **User**: `/api/v1/user`
- **Post**: `/api/v1/post`
- **Message**: `/api/v1/message`

User routes:

- `POST /api/v1/user/register`
- `POST /api/v1/user/login`
- `GET /api/v1/user/logout`
- `GET /api/v1/user/:id/profile`
- `POST /api/v1/user/profile/edit` (multipart form-data: `profilePicture`)
- `GET /api/v1/user/suggested`
- `POST /api/v1/user/followorunfollow/:id`
- `GET /api/v1/user/allfollowers/:id`
- `GET /api/v1/user/allfollowing/:id`

Post routes:

- `POST /api/v1/post/addpost` (multipart form-data: `image`, `caption`)
- `GET /api/v1/post/all`
- `GET /api/v1/post/userpost/all`
- `GET /api/v1/post/:id/like`
- `GET /api/v1/post/:id/dislike`
- `POST /api/v1/post/:id/comment` (JSON body: `text`)
- `POST /api/v1/post/:id/comment/all`
- `DELETE /api/v1/post/delete/:id`
- `GET /api/v1/post/:id/bookmark`

Message routes:

- `POST /api/v1/message/send/:id` (JSON body: `message`)
- `GET /api/v1/message/all/:id`

## Realtime events (Socket.IO)

- Client connects with query `userId`
- Server emits:
  - `getOnlineUsers` (array of userIds)
  - `newMessage` (message payload)
  - `notification` (like/dislike notification payload)

## Production build

Build frontend and serve it from the backend:

```bash
npm run build
```

This produces `frontend/dist`, and the backend serves it via:

- `express.static(/frontend/dist)`
- a catch-all `GET *` that returns `frontend/dist/index.html`

Start server:

```bash
npm start
```

## Troubleshooting

- **CORS / cookies not working**: set `URL` to your frontend origin (example: `http://localhost:5173`). Requests use cookies (`withCredentials: true`) and the backend enables `credentials: true` in CORS.
- **Cloudinary auth errors**: confirm your `.env` uses `CLOUDNIARY_API_KEY` (misspelling matches `backend/utils/cloudinary.js`).
- **Server won’t start**: ensure `PORT` is set in `.env` (the code does not provide a default).

## Database diagram

[View Live Database Diagram on dbdiagram.io](https://dbdiagram.io/d/674b3b21e9daa85aca390f0e)
