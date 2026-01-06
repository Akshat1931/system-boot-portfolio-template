

# system-boot-portfolio

**OS-style React portfolio template featuring a boot sequence, terminal-driven navigation, and a non-scrollable system UI.**

This project is a reusable portfolio template inspired by operating system boot screens and system dashboards.  
It behaves like a software interface rather than a traditional website — no scrolling, keyboard-first interaction, and terminal-based control.

---

## ✨ Features

- Boot sequence on load
- Terminal-driven navigation and commands
- Non-scrollable, OS-style layout
- Modular system panels (Projects, Skills, Experience, etc.)
- Persistent system state
- Keyboard-first interaction
- Built with React + Vite + Tailwind
- Optional Docker support for production-like runs

---

## 🛠 Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Docker (optional)
- Nginx (Docker runtime)

---

## 🚀 Running the Project

You can run this project **in two ways**. Docker is **optional**.

---

## 1️⃣ Local Development (Recommended)

Best for development and customization.

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Steps
```bash
npm install
npm run dev
````

The app will start at:

```
http://localhost:5173
```

---

## 2️⃣ Docker (Optional – Production-like)

Useful for running the built project in a containerized environment.

### Prerequisites

* Docker Desktop

### Build the image

```bash
docker build -t system-boot-portfolio .
```

### Run the container

```bash
docker run -p 8080:80 system-boot-portfolio
```

Open in browser:

```
http://localhost:8080
```

> Docker is **not required** for normal development or Netlify deployment.

---

## 🌍 Deployment

This project is designed to deploy easily on platforms like **Netlify**.

Recommended settings:

* **Build command:** `npm run build`
* **Publish directory:** `dist`

Docker is ignored during Netlify deployment.

---

## 🧩 Customization

* Edit modules inside `src/components/modules`
* Adjust boot behavior in `BootScreen.jsx`
* Add or modify terminal commands in the terminal logic
* Change theme and system colors via Tailwind config

---

## 📄 License

MIT — free to use, modify, and distribute.

---

## 🧠 Author Note

This project is intended to feel like an interface, not a webpage.
Explore it like a system.


