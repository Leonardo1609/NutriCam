import pyodbc as db
from dotenv import load_dotenv
import os
load_dotenv()

conn = db.connect(
    os.getenv('CONNECTION_DB') or 'Driver={ODBC Driver 17 for SQL Server};Server=tcp:nutriserver.database.windows.net;UID=nutricam_tp;Database=tp_project;PWD=memo#pry2020217;' 
)

cursor = conn.cursor()
