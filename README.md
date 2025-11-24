Course Explorer — Web App

This is small web application that fetches courses from an external API (Coursera) and lets users search, filter, and sort them.

Features

Search courses by name/description

Filter by type (Academic / Professional)

Sort by name or date

Paginated results

Error handling for failed API requests

Project Structure
frontend/
  ├─ index.html
  ├─ styles.css
  └─ app.js
backend/
  ├─ server.js
  ├─ fetchcompetitions.js
  └─ package.json
.env.example

Deployment

Web01 & Web02: Nginx hosts frontend files.

Lb01: Load balancer distributes traffic between Web01 & Web02.

Steps

Copy frontend files to /var/www/html/ on Web01 & Web02

Install Nginx and restart it

Configure load balancer (Lb01) Nginx with:

upstream course_app {
    server WEB01_PRIVATE_IP;
    server WEB02_PRIVATE_IP;
}
server {
    listen 80;
    location / {
        proxy_pass http://course_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}


Reload Nginx: sudo systemctl reload nginx

Test: Visit LB01 IP → traffic alternates between servers

API

Data from Coursera public API — api.coursera.org

API calls go through backend proxy for security

Credits

Coursera API for course data
