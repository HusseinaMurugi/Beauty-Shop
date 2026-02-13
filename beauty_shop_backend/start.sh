#!/bin/bash
set -e

echo "Running database setup..."

cd beauty_shop_backend

# Run migrations
echo "Running migrations..."
alembic upgrade head

# Check if admin exists, if not seed data
echo "Checking if data needs to be seeded..."
python -c "
from app.database import SessionLocal
from app.models import User
db = SessionLocal()
admin = db.query(User).filter(User.email == 'admin@gmail.com').first()
if not admin:
    print('Seeding database...')
    import seed_products
    import create_admin
    seed_products.seed_products()
    print('Database seeded!')
else:
    print('Database already seeded, skipping...')
db.close()
" || {
    echo "Seeding database..."
    python seed_products.py
    python create_admin.py
}

echo "Starting server..."
uvicorn app.main:app --host 0.0.0.0 --port $PORT
