from crypt import methods
from flask import Flask, jsonify, request
from . import blogbp
import uuid
import traceback
api_routes={
    'get_all_blogs': '/blog',
    'get_blog_by_id': '/blog/<string:id>',
    'add_blog': '/blog',
    'delete_blog_by_id': '/blog/<string:id>'
}
blogs=[
    {
            'id': 'ad1',
            'name': 'Test-1',
            'description': 'Lorem Ipsum'
    }
]
#Get All Blogs
@blogbp.route(api_routes['get_all_blogs'], methods=['GET'])
def getAllBlogs():
    return jsonify({'blogs': blogs}), 200

@blogbp.route(api_routes['add_blog'], methods=['POST'])
def createBlog():
    try:
        data=request.get_json()
        if data['name'] is None or data['description'] is None:
            raise Exception("Insufficient Fields Provided while creating the blog")
        blogId=uuid.uuid1()
        newBlog={
            "id": blogId,
            "name": data['name'],
            "description": data['description']
        }
        blogs.append(newBlog)
        return jsonify({'message': 'Blog Added Success','blog': newBlog}), 200
    except Exception as e:
        print(traceback.format_exc())
        resp=jsonify({"message": "Some error Occured"+str(e)})
        return resp, 500      