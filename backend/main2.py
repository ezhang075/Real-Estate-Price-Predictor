import requests
import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LinearRegression

if __name__ == "__main__":
    
    # ---------- FetchAPI.py ---------------
    address = input("📍 Enter the house address: ")
    city = input("🏙️ Enter the city: ")
    state = input("Enter your state: ")

    # 19362 Aguiro Street 
    # California
    # Rowland Heights
    url = "https://zillow-working-api.p.rapidapi.com/search/byaddress"

    querystring = {
        "location": f"{address}; {state}; {city}",
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
    print(f"🔍 API Requesting: {url} with {querystring}")

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

    # -------------- calculate_prices.py ----------------

    with open("zillow_results.json", "r") as file:
        data = json.load(file)

    # Extract the current Zestimate price
    current_zestimate = data.get("searchResults", {}).get("zestimate", "N/A")

    # Extract last sold price if available
    last_sold_price = data.get("searchResults", {}).get("resoFacts", {}).get("taxAssessedValue", "N/A")

    price_history = data.get("searchResults", {}).get("priceHistory", [])

    if price_history:
        last_sold_date = price_history[0].get("date", "N/A")  # Most recent sale date
    else:
        last_sold_date = "N/A"

    # Print the last sold date

    # Print extracted data
    print(f"Current Zestimate: ${current_zestimate}")
    print(f"Last Sold Price: ${last_sold_price}")
    print(f"Last Sold Date: {last_sold_date}")

    # Load the Zillow JSON file
    with open("zillow_results.json", "r") as file:
        data = json.load(file)

    # Extract historical sale prices and their corresponding years
    price_history = data.get("searchResults", {}).get("priceHistory", [])

    # Lists to store historical price data
    years = []
    prices = []

    # Extract year and price from JSON price history
    for entry in price_history:
        date_str = entry.get("date")
        price = entry.get("price")
        if date_str and price:
            try:
                sold_year = int(date_str.split("-")[0])
                years.append(sold_year)
                prices.append(price)
            except ValueError:
                continue

    # Extract the Zestimate for 2025
    zestimate_2025 = data.get("searchResults", {}).get("zestimate", None)
    years.append(2025)
    prices.append(zestimate_2025)

    # Load the Zillow Home Value Index (ZHVI) dataset
    zhvi_df = pd.read_csv("/Users/weifengzhang/Desktop/IrvineHacks/backend/app/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv")

    # Find San Jose, CA in the dataset
    san_jose_data = zhvi_df[zhvi_df["RegionName"] == city]

    # Extract years and home values from ZHVI
    if not san_jose_data.empty:
        san_jose_data = san_jose_data.iloc[:, 5:].T  # Transpose to get years as rows
        san_jose_data.columns = ["ZHVI"]
        san_jose_data["Year"] = san_jose_data.index.astype(str).str[:4].astype(int)  # Extract years
        san_jose_data = san_jose_data.reset_index(drop=True)

        # Add the ZHVI data points to our historical dataset
        for _, row in san_jose_data.iterrows():
            year = row["Year"]
            price = row["ZHVI"]
            if year not in years:  # Avoid duplicate years
                years.append(year)
                prices.append(price)

    # Convert to NumPy arrays for regression
    X = np.array(years).reshape(-1, 1)
    y = np.array(prices)

    # Split data into training and testing sets (80% training, 20% testing)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Define polynomial regression model
    degree = 2  # You can experiment with different degrees
    poly_model = make_pipeline(PolynomialFeatures(degree), LinearRegression())

    # Train the polynomial model
    poly_model.fit(X_train, y_train)

    # Predict on test set
    y_pred = poly_model.predict(X_test)

    # Compute Mean Squared Error (MSE)
    mse = mean_squared_error(y_test, y_pred)
    print(f"📉 Mean Squared Error: {mse:.2f}")
    print("mean squared")

    # Predict home price in 2035 using Polynomial Regression
    future_year = np.array([[2035]])
    predicted_price_2035_poly = poly_model.predict(future_year)[0]

    # Calculate percentage increase from Zestimate 2025 to predicted price in 2035
    percentage_increase_poly = ((predicted_price_2035_poly - zestimate_2025) / zestimate_2025) * 100 if zestimate_2025 else None

    # Generate predictions for plotting
    X_plot = np.linspace(min(years), 2035, 100).reshape(-1, 1)
    y_plot = poly_model.predict(X_plot)

    # Plot the trend with polynomial regression
    plt.figure(figsize=(10, 6))
    plt.scatter(years, prices, color='blue', label="Historical Prices (Including ZHVI)")
    plt.plot(X_plot, y_plot, color='red', linestyle="--", label=f"Polynomial Trend (Degree {degree})")
    plt.scatter(future_year, predicted_price_2035_poly, color='green', marker="X", s=100,
                label=f"Predicted Price (2035): ${predicted_price_2035_poly:,.2f}\n📈 Increase: {percentage_increase_poly:.2f}%")

    plt.xlabel("Year")
    plt.ylabel("Home Price ($)")
    plt.title("Housing Price Prediction (San Jose, CA) - Polynomial Regression")
    plt.legend()
    plt.grid(True)

    # Show plot
    plt.show()

    # Print prediction and percentage increase
    print(f"🏡 Predicted Home Price in 2035: ${predicted_price_2035_poly:,.2f}")
    if percentage_increase_poly is not None:
        print(f"📈 Percentage Increase from 2025 to 2035: {percentage_increase_poly:.2f}%")

