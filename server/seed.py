from random import choice as rc, randint
from faker import Faker
from app import app
from models import db, User, Post, Like

with app.app_context():
    print("Deleting data...")
    User.query.delete()
    Post.query.delete()
    Like.query.delete()


    u1 = User(username='test', _password='1234', image='')
    u2 = User(username='test2', _password='1234', image='')
    u3 = User(username='test3', _password='1234', image='')

    p1 = Post(content='Hi, there! This is 1 post!')
    p2 = Post(content='Hi, there! This is 2 post!')
    p3 = Post(content='Hi, there! This is 3 post!')
    p4 = Post(content='Hi, there! This is 4 post!')
    p5 = Post(content='Hi, there! This is 5 post!')
    p6 = Post(content='Hi, there! This is 6 post!')
    p7 = Post(content='Hi, there! This is 7 post!')
    p8 = Post(content='Hi, there! This is 8 post!')
    p9 = Post(content='Hi, there! This is 9 post!')

    db.session.add_all([u1, u2, u3])
    db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9])
    db.session.commit()

    l1 = Like(user_id=u1.id, post_id=p1.id)
    l2 = Like(user_id=u1.id, post_id=p2.id)
    l3 = Like(user_id=u1.id, post_id=p3.id)
    l4 = Like(user_id=u2.id, post_id=p4.id)
    l5 = Like(user_id=u2.id, post_id=p5.id)
    l6 = Like(user_id=u2.id, post_id=p6.id)
    l7 = Like(user_id=u3.id, post_id=p7.id)
    l8 = Like(user_id=u3.id, post_id=p8.id)
    l9 = Like(user_id=u3.id, post_id=p9.id)

    db.session.add_all([l1, l2, l3, l4, l5, l6, l7, l8, l9])
    db.session.commit()

