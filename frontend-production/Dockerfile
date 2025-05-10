# Étape de build Angular
FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Étape de déploiement NGINX
FROM nginx:alpine

# Copier la build Angular dans NGINX
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Copier un fichier de configuration NGINX custom (optionnel)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
