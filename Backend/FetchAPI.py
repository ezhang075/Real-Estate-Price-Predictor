import requests
import json

if __name__ == "__main__":
    url = "https://zillow-working-api.p.rapidapi.com/search/byaddress"

    querystring = {
        "location": "New York, NY",
        "page": "1",
        "sortOrder": "Homes_for_you",
        "listingStatus": "For_Sale",
        "bed_min": "No_Min",
        "bed_max": "No_Max",
        "bathrooms": "Any",
        "homeType": "Houses, Townhomes, Multi-family, Condos/Co-ops, Lots-Land, Apartments, Manufactured",
        "maxHOA": "Any",
        "listingType": "By_Agent",
        "listingTypeOptions": "Agent listed,New Construction,Fore-closures,Auctions",
        "parkingSpots": "Any",
        "mustHaveBasement": "No",
        "daysOnZillow": "Any",
        "soldInLast": "Any"
    }

    headers = {
        "x-rapidapi-key": "4d01f63b61mshac220c0f123ddd4p13e686jsn3ef914546309",
        "x-rapidapi-host": "zillow-working-api.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    if response.status_code == 200:
        data = response.json()  # Convert API response to JSON
        
        # Save JSON response to a file
        with open("zillow_results.json", "w") as json_file:
            json.dump(data, json_file, indent=4)  # Pretty-print JSON
        
        print("✅ Zillow API response saved as 'zillow_results.json'")
    
    else:
        print(f"❌ Failed to fetch data. Status Code: {response.status_code}")
        print("Response:", response.text)  # Print error message for debugging