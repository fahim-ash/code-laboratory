# Base image
FROM python:3.12.3

# Install distutils and other dependencies
RUN apt-get update && apt-get install -y python3-distutils

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose port
EXPOSE 8000

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "gateway.wsgi:application"]
