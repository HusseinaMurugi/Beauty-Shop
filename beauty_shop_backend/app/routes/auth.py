from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, Token, UserProfile
# Ensure these are correctly defined in your auth_service.py
from app.services.auth_service import (
    hash_password, 
    verify_password, 
    create_access_token, 
    SECRET_KEY, 
    ALGORITHM
)

router = APIRouter()

# This tells FastAPI where to look for the token (the login endpoint)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Decodes the JWT token to identify the user for protected routes like Cart and Orders.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# --- Authentication Logic ---

@router.post("/register", response_model=Token)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(email=user_data.email, password=hash_password(user_data.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": new_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login(user_data: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserProfile)
def me(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/me", response_model=UserProfile)
def update_profile(updates: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if 'email' in updates:
        current_user.email = updates['email']
    if 'password' in updates and updates['password']:
        current_user.password = hash_password(updates['password'])
    if 'phone_number' in updates:
        current_user.phone_number = updates['phone_number']
    if 'firstName' in updates:
        current_user.first_name = updates['firstName']
    if 'lastName' in updates:
        current_user.last_name = updates['lastName']
    if 'address' in updates:
        current_user.address = updates['address']
    db.commit()
    db.refresh(current_user)
    return current_user

# --- Dependency Logic (The Missing Piece) ---
# (moved earlier in the file to avoid forward reference)