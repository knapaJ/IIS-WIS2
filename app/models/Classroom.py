from app import db


class Classroom(db.Model):
    # Don't touch this, it's managed
    __tablename__ = "classrooms"
    _id = db.Column(db.Integer, primary_key=True, name='id')
    # Attributes
    name = db.Column(db.String(20), nullable=False)
    building = db.Column(db.String(50), nullable=True)

    def __init__(self, name, **kwargs):
        self.name = name
        super(Classroom, self).__init__(**kwargs)

    def __repr__(self):
        return f"Classroom {self.name}"
