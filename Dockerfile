FROM node:gallium
WORKDIR /app
COPY package.json .
RUN npm install -f
RUN npm i -g serve
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "build"]