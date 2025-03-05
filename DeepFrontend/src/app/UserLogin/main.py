from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from log import router  # Importer le router des utilisateurs

# Création de l'application FastAPI
app = FastAPI()

# Ajouter le middleware CORS pour permettre les requêtes depuis Angular
origins = [
    "http://localhost:4200",  # Autoriser les requêtes depuis http://localhost:4200 (pour Angular)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Liste des origines autorisées
    allow_credentials=True,
    allow_methods=["*"],  # Autoriser toutes les méthodes HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Autoriser tous les en-têtes
)

# Ajouter le router des utilisateurs
app.include_router(router)

# Route principale pour tester le serveur
@app.get("/hello")
def root():
    return {"message": "Hello, world!"}