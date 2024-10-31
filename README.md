# Nginx Capabilities Testing

This repository is designed for testing and exploring the various capabilities of the **Nginx** web server. It includes configuration files, examples, and scripts to demonstrate how Nginx can be used to handle different tasks on a web server, including load balancing, reverse proxying, caching, and more.

## Project Overview

The purpose of this project is to provide a testing environment where different Nginx features can be explored and validated. Each feature or capability is documented with examples, configurations, and test cases that can be run to observe Nginx behavior in real scenarios.

## Features

This project demonstrates the following Nginx capabilities:

1. **Reverse Proxy**  
   Set up Nginx to act as a reverse proxy, forwarding client requests to upstream servers (e.g., a Node.js application) and handling responses.

2. **Load Balancing**  
   Configure Nginx to distribute client requests across multiple upstream servers to achieve load balancing.

3. **Static File Serving**  
   Serve static content (HTML, CSS, JavaScript) directly from Nginx for improved performance.

4. **SSL/TLS Configuration**  
   Set up SSL/TLS certificates to serve content over HTTPS, including examples with Let's Encrypt and self-signed certificates.

5. **Caching**  
   Enable caching to optimize performance by storing frequently requested resources and reducing load on upstream servers.

6. **Access Control**  
   Configure access restrictions based on IP, user-agent, or authentication, to control which clients can access certain resources.

7. **Rate Limiting and Throttling**  
   Set up rate limiting to control the number of requests allowed from a single IP to prevent abuse and overload.

8. **Error Handling and Custom Pages**  
   Customize error pages for specific HTTP status codes (e.g., 404, 500) to provide user-friendly error messages.

## Getting Started

To start testing these capabilities, ensure that you have Nginx installed on your server. Clone this repository and follow the setup instructions for each feature in its respective folder.

### Prerequisites

- **Nginx**: Ensure Nginx is installed (`sudo apt install nginx` on Ubuntu).
- **Root or sudo Access**: Some configurations require administrative privileges.
- **Domain or IP Address**: Some features (e.g., SSL) may require a registered domain or IP.
