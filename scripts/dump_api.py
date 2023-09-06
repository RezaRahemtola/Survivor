#!/usr/bin/env python3.10
import json
from base64 import b64encode, b64decode, a85decode
from typing import Dict, Any

import requests
from pandas import DataFrame

EMPLOYEE = {
    "email": "oliver.lewis@masurao.jp",
    "password": "password"
}
HEADERS = {
    "X-Group-Authorization": "",
}
BASE_URL = "https://masurao.fr/api/employees"


def get_access_token() -> str or None:
    res = requests.post(
        f"{BASE_URL}/login",
        json=EMPLOYEE,
        headers={**HEADERS, "Content-Type": "application/json", "Accept": "application/json"}
    )
    if res.status_code != 200:
        return None
    return res.json().get("access_token")


def get_user_by_id(user_id: int, token: str) -> Dict[str, Any] or None:
    res = requests.get(
        f"{BASE_URL}/{user_id}",
        headers={**HEADERS, "Authorization": f"Bearer {token}", "Accept": "application/json"}
    )

    if res.status_code != 200:
        return None
    res = res.json()

    return None if "detail" in res else res


def get_user_picture_by_id(user_id: int, token: str) -> str or None:
    res = requests.get(
        f"{BASE_URL}/{user_id}/image",
        headers={**HEADERS, "Authorization": f"Bearer {token}", "Accept": "application/image"}
    )
    if res.status_code != 200:
        print(res.content.decode("utf-8"))
        return None
    return b64encode(res.content).decode("utf-8")


if __name__ == "__main__":
    access_token = get_access_token()
    users = []
    i = 1
    while True:
        user = get_user_by_id(i, access_token)
        picture: bytes = get_user_picture_by_id(i, access_token)
        if user is None:
            break
        print(f"Got {user.get('name')} {user.get('surname')}")
        if picture is None:
            print(f"User {user.get('name')} {user.get('surname')} has no picture!")
        users.append({**user, "picture": picture if picture is not None else "No Picture"})
        i += 1
    df = DataFrame(users)
    print(f"Got {len(users)} users! Saving dataframe...")
    df.to_html("users.html")
    df.to_csv("users.csv")
    with open("users.json", "w") as f:
        f.write(json.dumps(users, indent=4))
