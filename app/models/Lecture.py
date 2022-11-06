from app import db


class Lecture(db.Model):
    __tablename__ = "lectures"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=True)
    _lecturer_ID = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    startDate = db.Column(db.DateTime, nullable=True)
    endDate = db.Column(db.DateTime, nullable=True)
    registrationStartDate = db.Column(db.DateTime, nullable=True)
    registrationEndDate = db.Column(db.DateTime, nullable=True)
    _classroom_ID = db.Column(db.Integer, db.ForeignKey('classrooms.id', ondelete='CASCADE'), nullable=False)
    studentLimit = db.Column(db.Integer, nullable=False)
    isRegistrationEnabled = db.Column(db.Boolean, nullable=False, default=False)
    isOptional = db.Column(db.Boolean, nullable=False, default=False)

    lecturer = db.relationship("User", backref=db.backref("taught_lectures", cascade='all,delete'), lazy='joined')
