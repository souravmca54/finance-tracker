from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Finance Tracker API is running 🚀"}

def test_signup_missing_data():
    response = client.post("/auth/signup", json={"email": "test@test.com"})
    # Should fail because password is missing
    assert response.status_code == 422

def test_login_wrong_credentials():
    response = client.post("/auth/login", data={"username": "wrong@user.com", "password": "wrongpassword"})
    assert response.status_code == 401
    assert response.json() == {"detail": "Incorrect email or password"}
