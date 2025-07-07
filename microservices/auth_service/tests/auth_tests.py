import pytest
import httpx

BASE_URL = "http://localhost:8000/api/v1/auth"


def test_register():
    response = httpx.post(
        f"{BASE_URL}/register",
        json={"email": "test@example.com", "password": "12345678"},
    )
    assert response.status_code == 200 or response.status_code == 201


def test_login_and_fast_login():
    login_resp = httpx.post(
        f"{BASE_URL}/login", json={"email": "test@example.com", "password": "12345678"}
    )
    assert login_resp.status_code == 200
    access_token = login_resp.json()["access_token"]

    fast_login = httpx.get(
        f"{BASE_URL}/fast-login", headers={"Authorization": f"Bearer {access_token}"}
    )
    assert fast_login.status_code == 200
