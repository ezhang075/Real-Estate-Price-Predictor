import pandas as pd
import pickle

df = pd.read_csv('datasets/cleaned/master_data.csv')

cols = ['ZHVI', 'WFIR_AFREQ', 'WFIR_EXPT', 'WFIR_RISKS']

for col in cols:
    df[col+'_GROWTH'] = (df[col+'_2023'] - df[col+'_2020']) / df[col+'_2020']

df = df.drop(columns=df.filter(regex=r'.*_202[0-1]'))

df = df.rename(columns={
    'ZHVI_2023': 'ZHVI',
    'WFIR_AFREQ_2023': 'WFIR_AFREQ',
    'WFIR_EXPT_2023': 'WFIR_EXPT',
    'WFIR_RISKS_2023': 'WFIR_RISKS',
})


print(df.head())

with open('../futurenest/lookup.pkl', 'wb') as file:
    pickle.dump(df, file)