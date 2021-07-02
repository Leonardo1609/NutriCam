import pyodbc as db
from dotenv import load_dotenv
import os
load_dotenv()

# conn = db.connect(
#     os.getenv('CONNECTION_DB') or 'Driver={ODBC Driver 17 for SQL Server};Server=LAPTOP-ABRG7UHS\MSSQLSERVER01;UID=nutricam_tp;Database=tp_project;PWD=memo#pry2020217;' 
# )

conn = db.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=LAPTOP-ABRG7UHS\MSSQLSERVER01;"
    "Database=tp_project;"
    "Trusted_Connection=yes;"
)

cursor = conn.cursor()
