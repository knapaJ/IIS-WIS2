from app import db


term_pupil_rel = db.Table("term_pupil_rel",
                          db.Column('_user_id', db.Integer, db.ForeignKey('users.id')),
                          db.Column('_term_id', db.Integer, db.ForeignKey('terms.id'))
                          )


class Term(db.Model):
    # Don't touch this, it's managed
    __tablename__ = "terms"
    _id = db.Column(db.Integer, primary_key=True, name='id')
    _course_ID = db.Column(db.Integer, db.ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    # Attributes
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    start_date = db.Column(db.DateTime, nullable=True)
    end_date = db.Column(db.DateTime, nullable=True)
    registrationStartDate = db.Column(db.DateTime, nullable=True)
    registrationEndDate = db.Column(db.DateTime, nullable=True)
    maxMark = db.Column(db.Integer, nullable=False, default=0)
    studentLimit = db.Column(db.Integer, nullable=False)
    isRegistrationEnabled = db.Column(db.Boolean, nullable=False, default=False)
    isOptional = db.Column(db.Boolean, nullable=False, default=False)
    # Relationship abstractions
    course = db.relationship("Course", backref=db.backref("terms", cascade='all,delete'), lazy='joined')
    registered_students = db.relationship("User", backref="registered_terms", secondary=term_pupil_rel)

    def __init__(self, title, maxMark, studentLimit, course, *args, **kwargs):
        self.title = title
        self.maxMark = maxMark
        self.studentLimit = studentLimit
        self.course = course
        super(Term, self).__init__(*args, **kwargs)

    def __repr__(self):
        return f"Term[{self._id}] {self.title}"
