import requests
from sqlalchemy.exc import IntegrityError
from connection import *

API_URL = "https://rapidapi.com/search?sortBy=ByRelevance" #use actual url
API_KEY = "" #use actual key

def fetch(api_url, api_key):

    response = requests.get(api_url, headers={"Authorization": f"Bearer {api_key}"})

    if response.status_code == 200:
        api_data = response.json();

    else:
        print(f"Failed to fetch data: {response.status_code}")
        api_data = []


    #look up those same properties to get risk

    parsed_data = []

    for property in api_data.get("properties", []):
        parsed_data.append({
            "address": property.get("address"),
            "price": property.get("price"),
            #other variables
        })

    #print(parsed_data)
    return parsed_data

def store(parsed_data):
    for data in parsed_data:
        new_house = HousingData(
            address=data["address"],
            price=data["price"],
            #other variables
        )
        session.add(new_house)

    try:
        session.commit()
        print(f"Inserted {len(parsed_data)} properties into the database.")
    except IntegrityError as e:
        session.rollback()
        print("Error inserting data:", e)