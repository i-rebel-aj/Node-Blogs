from flask import Blueprint 

api = Blueprint('api', __name__, url_prefix='/api/v1')

@api.route('/getdata')
def getdata():
    return {'key' : 'value'}