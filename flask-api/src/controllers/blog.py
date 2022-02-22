from crypt import methods
from flask import Flask, jsonify, request
from . import blogbp
import uuid
import traceback
from ..db import db
api_routes={
    'get_all_blogs': '/blog',
    'get_blog_by_id': '/blog/<string:id>',
    'add_blog': '/blog',
    'delete_blog_by_id': '/blog/<string:id>'
}
#Get All Blogs
@blogbp.route(api_routes['get_all_blogs'], methods=['GET'])
def getAllBlogs():
    resp=db.blog.find({})
    print('Resp is', resp)
    return jsonify({'blogs': ''}), 200

@blogbp.route(api_routes['add_blog'], methods=['POST'])
def createBlog():
    try:
        data=request.get_json()
        if data['name'] is None or data['description'] is None:
            raise Exception("Insufficient Fields Provided while creating the blog")
        blog_doc = { "name": data['name'],"description": data['description']}
        resp=db.blog.insert_one(blog_doc)
        print('Resp of insertOne is', resp.inserted_id)
        return jsonify({'message': 'Blog Added Success','blog':''}), 200
    except Exception as e:
        print(traceback.format_exc())
        resp=jsonify({"message": "Some error Occured"+str(e)})
        return resp, 500      