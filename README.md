# 📦 Système de Gestion de Production

## 📌 Description du Projet

Ce projet est une application web complète de **gestion de la production industrielle**. Elle permet de gérer efficacement :

- Les **produits** : création, mise à jour, consultation, suppression
- Les **machines** : ajout, affectation, état de fonctionnement
- Les **ordres de fabrication** : planification, suivi, affectation machine/technicien
- Les **opérations de maintenance** : préventive et corrective, avec historique

L'application offre une interface moderne et intuitive pour les opérateurs et les responsables de production, afin d'améliorer la planification, le suivi et la productivité.

---

## 🛠️ Technologies Utilisées

### Backend – Spring Boot

- Java 17
- Spring Boot
- Spring Data JPA
- H2 (pour tests) / MySQL (pour production)
- Lombok
- RESTful API

### Frontend – Angular

- Angular 17+
- Angular Material (Design UI)
- RxJS
- Typescript

### Autres Outils

- Docker / Docker Compose
- Postman (test des API REST)
- Git / GitHub (gestion de versions)
- IntelliJ IDEA (développement backend)
- Visual Studio Code (développement frontend)

---

## 🚀 Instructions d’Installation

### ✅ Prérequis

- Java 17 ou supérieur
- Node.js et npm
- Angular CLI (`npm install -g @angular/cli`)
- Docker (et Docker Compose, optionnel)
- Git

---

### 🧩 Étapes d’installation

#### 1. Cloner le projet


`git clone https://github.com/hadilxattia/gestion-production.git`
`cd gestion-production `

#### 2. Lancer le backend (Spring Boot)
Ouvrir le dossier backend dans IntelliJ IDEA

Lancer la classe ProductionApplication.java

ou bien avec docker
`cd backend`
`docker build -t production-backend .`
`docker run -p 8080:8080 production-backend`
#### 3. Lancer le frontend (Angular)
`cd frontend`
`npm install`
`ng serve`
ou bien avec docker
`cd frontend`
`docker build -t production-frontend .`
`docker run -p 4200:80 production-frontend`
#### 4. Accéder à l'application
`Interface utilisateur : http://localhost:4200`

`API REST : http://localhost:8080/api`