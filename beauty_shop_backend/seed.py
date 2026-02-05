from app.database import SessionLocal, engine
from app.models import Category, Product, Base

Base.metadata.create_all(bind=engine)
db = SessionLocal()

def seed_data():
    # 1. Add Categories safely
    categories_to_add = ["Skincare", "Haircare"]
    cat_objs = {}

    for name in categories_to_add:
        existing_cat = db.query(Category).filter(Category.name == name).first()
        if not existing_cat:
            new_cat = Category(name=name)
            db.add(new_cat)
            db.flush() # Gets the ID without committing yet
            cat_objs[name] = new_cat
        else:
            cat_objs[name] = existing_cat

    db.commit()

    # 2. Add Products safely
    products = [
        {"name": "Face Serum", "price": 25.0, "cat": "Skincare", "desc": "Glow boost"},
        {"name": "Moisturizer", "price": 15.0, "cat": "Skincare", "desc": "Hydrating"},
        {"name": "Shampoo", "price": 12.0, "cat": "Haircare", "desc": "Sulfate free"},
    ]

    for p in products:
        existing_prod = db.query(Product).filter(Product.name == p["name"]).first()
        if not existing_prod:
            new_prod = Product(
                name=p["name"], 
                price=p["price"], 
                description=p["desc"], 
                category_id=cat_objs[p["cat"]].id
            )
            db.add(new_prod)

    db.commit()
    print("Database seeded or verified successfully!")

if __name__ == "__main__":
    seed_data()
    db.close()