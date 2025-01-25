import requests

API_URL = "https://rapidapi.com/search?sortBy=ByRelevance" #use actual url
API_KEY = "" #use actual key

response = requests.get(API_URL, headers={"Authorization": f"Bearer {API_KEY}"})

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

print(parsed_data)