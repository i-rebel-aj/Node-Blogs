# import json
# from flask import Flask, request, jsonify, Response
# from flask_restful import Api, Resource
# import uuid
# def create_flask_app():
#     app=Flask(__name__)
#     api=Api(app)
#     api.add_resource(Health, "/")
#     api.add_resource(Blogs, "/blog/<string:id>")
#     app.run(debug=True)

# blogs={}
# #Resources
# class Health(Resource):
#     def get(self):
#         return jsonify(
#         {
#             'status': 200,
#             'state': 'Running',
#             'error': False
#         })
# class Blogs(Resource):
#     #Get Blog By id
#     def get(self, id):
#         if id in blogs:
#             return {'message': 'Found Blog', 'blog': blogs[id]}, 200
#         else:
#             return {'message': 'Blog with id: '+ id + ' does not exist' }, 404
#     #Create a new Blog
#     def post(self):
#         try:
#             body=request.form
#             if body.name is not None and body.description is not None:
#                 raise Exception('Insufficient Fields')
#             blogId=uuid.uuid1()
#             blogs[blogId]={
#                 "name": body.name,
#                 "description": body.description
#             }
#             print("In Try Block")
#             resp=jsonify({'message': 'Blog Added Success','blog': blogs[blogId]})
#             return Response(resp, status=200)
#         except Exception as e:
#             print("Something Went Wrong")
#             resp=jsonify({"message": "some Error Occured"+str(e)})
#             return Response(resp, status=200)
#     #Get All Blogs
#     # def get(self):
#     #     resp=jsonify({'message': 'All Blogs are','blogs': blogs})
#     #     return Response(resp, status=200)

# if __name__=='__main__':
#     create_flask_app()
