import pyodbc as db
from dotenv import load_dotenv
import os
load_dotenv()

conn = db.connect(
        os.getenv('CONNECTION_DB') or '' 
)
    # "Trusted_Connection=yes;"
cursor = conn.cursor()
