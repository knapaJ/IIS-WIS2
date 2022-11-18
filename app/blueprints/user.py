from app import db
from app.models.User import User, UserType
from flask import Blueprint, abort, jsonify, request, session
from sqlalchemy.exc import IntegrityError
from app.blueprints.user_auth import user_auth

user_endpoint = Blueprint("user_endpoint", __name__)


@user_endpoint.errorhandler(400)
def bad_request(e):
    return jsonify(message=f"{e.description}"), 400


@user_endpoint.errorhandler(404)
def not_found(e):
    return jsonify(message=f"{e.description}"), 404


@user_endpoint.errorhandler(403)
def forbidden(e):
    return jsonify(message=f"{e.description}"), 403


@user_endpoint.route("/register", methods=["POST"])
@user_auth(UserType.ADMIN)
def register_user():
    """JSON data required:

    """
    data = request.get_json()
    try:
        new_user = User(data["login"], data["name"], data["surname"], data["e_mail"],
                        UserType.USER, data["password"])
        db.session.add(new_user)
        db.session.commit()
    except KeyError:
        abort(400, description="Missing keys in JSON data")
    except IntegrityError:
        return jsonify(message="User already exists"), 409

    return jsonify(status="OK"), 200


@user_endpoint.route("/login", methods=["POST"])
def login():
    """JSON data required:
        login - users login
        password - users password
    """
    data = request.get_json()
    try:
        user = User.query.filter_by(login=data["login"]).first_or_404(description="User not found")
        if user.check_password(data["password"]):
            session["user"] = user.uuid
            return jsonify(status="OK"), 200
        else:
            return jsonify(message="Bad password"), 403
    except KeyError:
        abort(400, description="Missing keys in JSON data")


@user_endpoint.route("/auth/<string:level>", methods=["GET"])
def check_auth(level: str):
    if "user" not in session:
        abort(403, description="No user logged in")
    user = User.query.filter_by(uuid=session["user"]).first_or_404(description="Logged in user not found (DAFUQ?)")
    try:
        req_level = UserType[level.upper()]
        if not user.user_type.value >= req_level.value:
            return jsonify(level=False), 200
        else:
            return jsonify(level=True), 200
    except KeyError:
        abort(400, description=f"Unknown user authorisation level {level}")


@user_endpoint.route("/logout", methods=["GET"])
def logout():
    if "user" in session:
        del session["user"]
    return jsonify(status="OK"), 200



