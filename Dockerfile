# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy your static files into the Nginx web root directory
COPY * /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY img/ /usr/share/nginx/html/img/

# Expose port 80 to access the web server
EXPOSE 80
