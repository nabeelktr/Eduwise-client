FROM node:21-alpine3.18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV NEXT_PUBLIC_SERVER_URI="http://localhost:8000/api/v1/"
CMD npm run dev