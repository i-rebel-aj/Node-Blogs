# This is Called First
from flask import Flask
import os
from dotenv import load_dotenv
load_dotenv()
 
# Register application Blueprints
def register_blueprints(app):
    try:
        from .controllers import blogbp
        app.register_blueprint(blogbp,url_prefix="/api/v1")
    except Exception as e:
        print('Something went wrong'+ str(e))


print(os.getenv("MY_SECRET"))
def create_app():
    app = Flask(__name__)
    register_blueprints(app)
    app.config['MONGO_URI'] = os.getenv("DB_URL")
    @app.route('/')
    def health():
        return {'message': 'Service Running'}, 200
    # app.run(debug=True)
    return app

if __name__=='__main__':
    create_app()