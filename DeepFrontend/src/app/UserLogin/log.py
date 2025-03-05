from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector

# Création du router pour les routes liées aux utilisateurs
router = APIRouter()

# Fonction pour se connecter à la base de données MySQL
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="AA0556563a",
        database="deepdb"
    )

class UserRegistration(BaseModel):
    nom: str
    prenom: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# Route pour l'inscription d'un nouvel utilisateur
@router.post("/register")
def register_user(user: UserRegistration):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Vérifier si l'email existe déjà dans la base de données
    cursor.execute("SELECT * FROM users WHERE email = %s", (user.email,))
    existing_user = cursor.fetchone()

    if existing_user:
        # Si l'email existe déjà, renvoyer une erreur
        raise HTTPException(status_code=400, detail="Email already registered")

    # Si l'email n'existe pas, procéder à l'insertion
    cursor.execute(
        "INSERT INTO users (nom, prenom, email, password) VALUES (%s, %s, %s, %s)",
        (user.nom, user.prenom, user.email, user.password)  # Assurez-vous de hasher le mot de passe en production
    )

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "User registered successfully!"}


# Route pour la connexion d'un utilisateur
@router.post("/login")
def login_user(user: UserLogin):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Requête pour vérifier les informations d'identification de l'utilisateur
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (user.email, user.password))
    result = cursor.fetchone()

    cursor.close()
    conn.close()

    if result:
        # Renvoyer l'URL pour Angular pour redirection
        if user.email == "ismail.barry@esprit.tn":
            return {"url": "/deepadminserial"}  # URL admin pour l'utilisateur spécifique
        else:
            return {"url": "/deeppublic"}  # URL public pour les autres utilisateurs
    else:
        raise HTTPException(status_code=403, detail="Invalid credentials")
 