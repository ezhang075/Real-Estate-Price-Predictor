from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get the database URL from .env
DATABASE_URL = os.getenv("DATABASE_URL") #if using .env file
DATABASE_URL = "postgresql://neondb_owner:npg_N3tGrPKSJ6kv@ep-lingering-sun-a6yrr5b9-pooler.us-west-2.aws.neon.tech/neondb?sslmode=require"
# Set up SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Define a base class for models
Base = declarative_base()

# Define a sample table/model
class HousingData(Base):
    __tablename__ = 'housing_data'  
    id = Column(Integer, primary_key=True, autoincrement=True)
    #here it will get variables from the APIs
    address = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    beds = Column(Integer)
    baths = Column(Integer)

# Create tables in the database
Base.metadata.create_all(engine)

# Add sample data

#code to get data from APIs

#new_house = HousingData(address="123 Main St", price=450000, beds=3, baths=2)
#session.add(new_house)
#house_to_delete = session.query(HousingData).filter_by(address="123 Main St").first()
#session.delete(house_to_delete)
session.commit()

# Query data
houses = session.query(HousingData).all()
for house in houses:
    print(house.address, house.price)
