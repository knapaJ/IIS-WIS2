import uuid
import werkzeug.security as wsec
from app import db
import enum


def str_uuid4():
    return str(uuid.uuid4())


class UserType(enum.Enum):
    ADMIN = enum.auto()
    USER = enum.auto()


class User(db.Model):
    """Class for Users
    User does have a UNIQUE LOGIN, Name, Surname, E-mail (optional) and User Type (admin/user)
    """
    # Don't touch this, it's managed
    __tablename__ = "users"
    _id = db.Column(db.Integer, primary_key=True, name='id')
    _user_uuid = db.Column(db.String(40), nullable=False, default=str_uuid4)
    # Attributes
    login = db.Column(db.String(30), unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    surname = db.Column(db.String(50), nullable=False)
    e_mail = db.Column(db.String(80))
    password_hash = db.Column(db.String(100), nullable=False)
    user_type = db.Column(db.Enum(UserType), nullable=False)

    def __init__(self, login, name, surname, e_mail, user_type: UserType, password=None, **kwargs):
        self.login = login
        self.name = name
        self.surname = surname
        self.e_mail = e_mail
        self.user_type = user_type
        if password is not None:
            self.password_hash = wsec.generate_password_hash(password, method="sha256")
        super(User, self).__init__(**kwargs)

    def set_password(self, password):
        """WARNING! Make sure that what you pass in here is safe, this fnc does not ask ANY questions!
        Sets password of the User
        """
        self.password_hash = wsec.generate_password_hash(password, method="sha256")

    def check_password(self, password) -> bool:
        """Checks password hash vs password, returns true if they match"""
        return wsec.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"{self.user_type.name}[{self._id}] {self.name} {self.surname}"
