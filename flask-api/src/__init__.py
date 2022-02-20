# This is Called First
from flask import Flask 
# Register application Blueprints
def register_blueprints(app):
    try:
        from .controllers import blogbp
        app.register_blueprint(blogbp,url_prefix="/api/v1")
    except Exception as e:
        print('Something went wrong'+ str(e))

def create_app():
    app = Flask(__name__)
    register_blueprints(app)
    @app.route('/')
    def health():
        return {'message': 'Service Running'}, 200
    # app.run(debug=True)
    return app

# if __name__=='__main__':
#     create_app()