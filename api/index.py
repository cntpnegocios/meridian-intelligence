import sys, os
# Add services/api to path so imports work on Vercel
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'services', 'api'))

from app.main import app
from mangum import Mangum

# Vercel serverless handler
handler = Mangum(app, lifespan="off")
