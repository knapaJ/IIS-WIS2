from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db


class User(db.Model):
    """Class for Users"""
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __init__(self, uid, name):
        self.id = uid
        self.name = name
