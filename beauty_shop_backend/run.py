import uvicorn

if __name__ == "__main__":
    # This looks inside the 'app' folder for 'main.py' and the 'app' variable
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)