from app.models.User import User, UserType
from functools import wraps
from flask import abort, session


def user_auth(level: UserType):
    def decorator(func):
        @wraps(func)
        def wrapped(*args, **kwargs):
            if "user" not in session:
                abort(403, description="No user logged in")
            if (user := User.query.filter_by(uuid=session["user"]).first()) is None:
                abort(403, description="User not found")
            if not user.user_type.value >= level.value:
                abort(403, "User unauthorised")
            return func(*args, **kwargs)
        return wrapped
    return decorator
