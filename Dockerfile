# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy your static files into the Nginx web root directory
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/

# Expose port 80 to access the web server
EXPOSE 80
