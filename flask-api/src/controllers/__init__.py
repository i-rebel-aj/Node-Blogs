print(f'Invoking __init__.py for {__name__}')
from flask import Blueprint 
blogbp = Blueprint('blog', __name__)
from . import blog