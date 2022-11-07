from app import db
from datetime import datetime


class TermMark(db.Model):
    # Don't touch this, it's managed
    _id = db.Column(db.Integer, primary_key=True, name='id')
    _term_ID = db.Column(db.Integer, db.ForeignKey("terms.id", ondelete='CASCADE'), nullable=False)
    _student_ID = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    _modified_by_ID = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='SET NULL'), nullable=True)
    # Attributes
    mark = db.Column(db.Integer, nullable=False, default=0)
    lastModified = db.Column(db.DateTime, nullable=True)
    # Relationship abstractions
    student = db.relationship("User", backref=db.backref("term_marks", cascade='all,delete'),
                              foreign_keys=[_student_ID])
    lastModifiedBy = db.relationship("User", foreign_keys=[_modified_by_ID])
    term = db.relationship("Term", backref=db.backref("marks", cascade='all,delete'))

    def __init__(self, student, term, *args, **kwargs):
        self.student = student
        self.term = term
        super(TermMark, self).__init__(*args, **kwargs)

    def modify(self, mark, by_user):
        self.mark = mark
        self.lastModifiedBy = by_user
        self.lastModified = datetime.utcnow()

    def __repr__(self):
        return f"TermMark[{self._id}] last modified {self.lastModified}"
