# Menggunakan image Node.js sebagai base image
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Expose port dimana aplikasi akan berjalan
EXPOSE 3001

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
