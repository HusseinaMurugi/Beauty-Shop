from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# These imports are actually the APIRouter objects because of your __init__.py setup
from app.routes import auth, products, orders, cart

app = FastAPI(title="Project 8: Beauty Shop API")

# Requirement: Frontend connection (React/Redux)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# FIXED: Removed the ".router" suffix because 'auth', 'products', etc. ARE the routers.
app.include_router(auth, prefix="/api/auth", tags=["Authentication"])
app.include_router(products, prefix="/api/products", tags=["Products"])
app.include_router(orders, prefix="/api/orders", tags=["Orders"])
app.include_router(cart, prefix="/api/cart", tags=["Cart"])

@app.get("/")
async def root():
    return {"message": "Beauty Shop Backend is Active"}