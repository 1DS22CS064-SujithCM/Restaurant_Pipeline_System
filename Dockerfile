# Use a lightweight Nginx image as a base
FROM nginx:alpine

# Copy your website files to the Nginx HTML directory
COPY . /usr/share/nginx/html/
# Expose port 80 (default HTTP port for Nginx)
EXPOSE 80

# Command to start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]