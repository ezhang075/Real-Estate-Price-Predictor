import pandas as pd

# Load the CSV file
file_path = "/Users/weifengzhang/Desktop/IrvineHacks/Real-Estate-Price-Predictor/backend/NRI_Table_Counties.csv"
df = pd.read_csv(file_path)

df = df.sort_values(by ='RISK_SCORE', ascending = 0) 


def get_county_risk(county, state):
    result = next(df[['RISK_SCORE', 'RISK_RATNG']].loc[(df['COUNTY'] == f'{county}') &
                    (df['STATE'] == f'{state}')].itertuples(index=False, name=None), None)

    return result

