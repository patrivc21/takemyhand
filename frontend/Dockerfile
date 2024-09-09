FROM node:20

WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json primero
COPY package*.json ./

# Instala las dependencias dentro del contenedor
RUN npm install 

# Copia el resto del código de la aplicación
COPY . .

# Copia el archivo .env al directorio dist
# RUN cp .env dist/.env

# Construye el proyecto
RUN npm run build

EXPOSE 3000

# Usa wait-for-it.sh para esperar a la base de datos
CMD ["npm", "start"]
