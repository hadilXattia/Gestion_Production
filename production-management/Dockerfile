# Utiliser une image officielle Java JDK pour builder l'application
FROM maven:3.9.4-eclipse-temurin-17 AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers du backend dans le conteneur
COPY . .

# Compiler le projet Spring Boot
RUN mvn clean package -DskipTests

# Étape finale : image d'exécution
FROM eclipse-temurin:17-jdk-alpine

# Répertoire de travail pour l'application
WORKDIR /app

# Copier le JAR compilé depuis l'étape précédente
COPY --from=builder /app/target/*.jar app.jar

# Exposer le port du backend
EXPOSE 8080

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
